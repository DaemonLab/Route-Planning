from pymongo import MongoClient
from settings import settings

client = MongoClient(settings.MONGO_URL)
db = client[settings.MONGO_NAME]

item_db = db["items"]
rider_db = db["riders"]


# from deta import Deta
# deta = Deta("project key")
# db = deta.Base("database")