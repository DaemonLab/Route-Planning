from pymongo import MongoClient
from settings import settings

client = MongoClient(settings.MONGO_URL)
db = client["server"]

# from deta import Deta
# deta = Deta("project key")
# db = deta.Base("database")