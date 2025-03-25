import asyncio
import aio_pika
import json
from dotenv import load_dotenv
import os
from mongodb.mongo_database import insert_chat_message, create_chat_session_if_not_exists

load_dotenv()

RABBITMQ_URL = os.getenv("RABBITMQ_URL")

async def process_message(message: aio_pika.IncomingMessage):
    async with message.process():
        payload = json.loads(message.body.decode())
        chat_id = payload["chat_id"]
        sender = payload["sender"]
        recipient = payload["recipient"]

        create_chat_session_if_not_exists(chat_id, [sender, recipient])
        insert_chat_message(payload)

async def main():
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    channel = await connection.channel()
    await channel.set_qos(prefetch_count=10)
    queue = await channel.declare_queue("chat_messages", durable=True)
    await queue.consume(process_message)
    print("RabbitMQ consumer started. Waiting for messages...")
    return connection

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    connection = loop.run_until_complete(main())
    try:
        loop.run_forever()
    finally:
        loop.run_until_complete(connection.close())
