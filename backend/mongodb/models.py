from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class ChatMessage(BaseModel):
    chat_id: str
    sender: str
    recipient: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.now)
    delivered: bool = False

class ChatSession(BaseModel):
    chat_id: str
    participants: List[str]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)