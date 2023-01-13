from settings import settings
from pymongo import MongoClient
conn = MongoClient(settings.MONGO_URL)
db = conn.inter_iit
users = db["users"]