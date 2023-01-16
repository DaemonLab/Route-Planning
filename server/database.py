from pymongo import MongoClient
from settings import settings

client = MongoClient(settings.MONGO_URL)
db = client.inter_iit
users = db["users"]
items = db["items"]
riders = db["riders"]