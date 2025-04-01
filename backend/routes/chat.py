from jose import JWTError, jwt
from typing import Dict
import os
import aio_pika
import json
from dotenv import load_dotenv
from datetime import datetime
from socketio import AsyncServer
from mongodb.mongo_database import insert_chat_message, create_chat_session_if_not_exists

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
RABBITMQ_URL = os.getenv("RABBITMQ_URL")

connected_users: Dict[str, str] = {}

def verify_token(token: str) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None

async def publish_to_rabbitmq(message: dict):
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    async with connection:
        channel = await connection.channel()
        await channel.declare_queue("chat_messages", durable=True)
        await channel.default_exchange.publish(
            aio_pika.Message(body=json.dumps(message).encode()),
            routing_key="chat_messages"
        )

def register_socketio_handlers(sio: AsyncServer):
    @sio.event
    async def connect(sid, environ, auth):
        token = auth.get("token") if auth else None
        username = verify_token(token)
        if username:
            connected_users[username] = sid
            await sio.emit("user_status", {"user": username, "online": True})
        else:
            await sio.disconnect(sid)

    @sio.event
    async def disconnect(sid):
        user_to_remove = None
        for user, socket_id in connected_users.items():
            if socket_id == sid:
                user_to_remove = user
                break
        if user_to_remove:
            del connected_users[user_to_remove]
            await sio.emit("user_status", {"user": user_to_remove, "online": False})

    @sio.event
    async def send_message(sid, data):
        sender = next((user for user, s in connected_users.items() if s == sid), None)
        if not sender:
            return

        recipient = data.get("to")
        message = data.get("message")
        chat_id = data.get("chat_id")
        participants = [sender, recipient]

        create_chat_session_if_not_exists(chat_id, participants)

        message_payload = {
            "chat_id": chat_id,
            "sender": sender,
            "recipient": recipient,
            "message": message,
            "timestamp": datetime.now(),
            "delivered": recipient in connected_users
        }

        insert_chat_message(message_payload)

        if recipient in connected_users:
            await sio.emit("receive_message", {
                "from": sender,
                "message": message,
                "chat_id": chat_id
            }, to=connected_users[recipient])

        await publish_to_rabbitmq({
            **message_payload,
            "timestamp": message_payload["timestamp"].isoformat()  # Convert datetime for JSON
        })
