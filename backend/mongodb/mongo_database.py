from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import DESCENDING
from typing import List
from datetime import datetime
from dotenv import load_dotenv
from .models import ChatMessage, ChatSession
import os

load_dotenv()

uri = os.getenv("MONGODB_URI")

client = MongoClient(uri, server_api=ServerApi("1"))

try:
    client.admin.command("ping")
    print("Successfully connected to MongoDB!")
except Exception as e:
    print("MongoDB connection failed:", e)

# Database and collections
db = client["yapyap"]
chats_collection = db["chats"]
messages_collection = db["messages"]

def create_chat_session_if_not_exists(chat_id: str, participants: List[str]):
    existing = chats_collection.find_one({"chat_id": chat_id})
    if not existing:
        chat = ChatSession(chat_id=chat_id, participants=participants)
        chats_collection.insert_one(chat.dict())

def insert_chat_message(message_data: dict):
    message = ChatMessage(**message_data)
    messages_collection.insert_one(message.dict())

def get_messages_by_chat_id(chat_id: str, limit: int = 50):
    cursor = messages_collection.find({"chat_id": chat_id}).sort("timestamp", DESCENDING).limit(limit)
    return list(cursor)
