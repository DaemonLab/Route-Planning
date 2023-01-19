from pymongo import MongoClient
from settings import settings

client = MongoClient(settings.MONGO_URL)
db = client[settings.MONGO_NAME]

riders_db = db["riders"]
items_db = db["items"]

# from deta import Deta
# deta = Deta("project key")
# db = deta.Base("database")