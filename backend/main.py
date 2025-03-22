from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from socketio import AsyncServer
from socketio.asgi import ASGIApp
from routes.auth import router as auth_router
from routes.chat import register_socketio_handlers
from routes.messages import router as messages_router
from dotenv import load_dotenv
import os

load_dotenv()

sio = AsyncServer(async_mode="asgi", cors_allowed_origins="*")
register_socketio_handlers(sio)

fastapi_app = FastAPI()

origins = [
    "https://yapyap.fardinahmed.com/",
]

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fastapi_app.include_router(auth_router)
fastapi_app.include_router(messages_router)
# Socket.IO ASGI
app = ASGIApp(sio, other_asgi_app=fastapi_app)