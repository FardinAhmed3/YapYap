from fastapi import APIRouter, HTTPException, Depends, Header
from mongodb.mongo_database import messages_collection
from datetime import datetime
from typing import List, Optional
from jose import JWTError, jwt
from pydantic import BaseModel, Field
import os

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

# Authentication dependency
def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")
    
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication token")

# Matches the stored schema in MongoDB
class ChatMessage(BaseModel):
    chat_id: str
    sender: str
    recipient: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    delivered: bool = False

@router.get("/messages/{chat_id}", response_model=List[ChatMessage])
async def get_chat_messages(
    chat_id: str,
    limit: int = 50,
    current_user: str = Depends(get_current_user)
):
    """
    Retrieve chat messages by chat_id, ordered by timestamp descending.
    Default limit is 50. Requires a valid JWT token in the Authorization header.
    """
    try:
        cursor = messages_collection.find(
            {"chat_id": chat_id}
        ).sort("timestamp", -1).limit(limit)

        result = []
        for doc in cursor:
            doc.pop("_id", None)
            result.append(ChatMessage(**doc))
        
        return list(reversed(result)) 
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch messages")
