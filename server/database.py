from pymongo import MongoClient
from settings import settings

conn = MongoClient(settings.MONGO_URL)
db = conn.inter_iit
users = db["users"]
