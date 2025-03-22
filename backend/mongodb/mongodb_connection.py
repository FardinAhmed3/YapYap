from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Atlus Cluster Connection
MONGODB_USER=os.getenv("MONGODB_USER")
MONGODB_PASSWORD=os.getenv("MONGODB_PASSWORD")

uri = f"mongodb+srv://{MONGODB_USER}:{MONGODB_PASSWORD}@yapyap.p1fee.mongodb.net/?appName=yapyap"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)