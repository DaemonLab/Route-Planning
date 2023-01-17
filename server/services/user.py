import bcrypt
import bson
import serializers
from database import db
from fastapi import HTTPException
from models import UserBase, UserCreate

users_db = db["users"]


def encrypt(password: str) -> str:
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(bytes, salt)


def match(stored_password: str, password: str) -> bool:
    bytes = password.encode("utf-8")
    return bcrypt.checkpw(bytes, stored_password)


def get_user(user_id: str):
    try:
        if users_db.find_one({"_id": bson.ObjectId(user_id)}) is None:
            raise HTTPException(status_code=404, detail="User not found")
        return serializers.user_serializer(
            users_db.find_one({"_id": bson.ObjectId(user_id)})
        )
    except bson.errors.InvalidId:
        raise HTTPException(status_code=404, detail="Invalid ID")


def get_user_by_email(email: str):
    if users_db.find_one({"email": email}) is None:
        raise HTTPException(status_code=404, detail="User not found")
    return serializers.users_serializer(users_db.find({"email": email}))


def get_users(limit: int = 100):
    user = serializers.users_serializer(users_db.find().limit(limit))
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")


def create_user(user: UserCreate) -> dict:
    user.hashed_password = encrypt(user.hashed_password)
    id = users_db.insert_one(dict(user))
    user = serializers.user_serializer(users_db.find_one({"_id": id.inserted_id}))
    return {"status": "OK", "data_inserted": user}


def update_user(user_id: str, user: UserBase) -> dict:
    db_user = get_user(user_id)
    if (
        user.email == db_user["email"]
        or users_db.find_one({"email": user.email}) is None
    ):
        users_db.update_one(
            {"_id": bson.ObjectId(user_id)}, {"$set": dict(user)}, upsert=True
        )

    else:
        raise HTTPException(status_code=400, detail="Email ID already exists")
    user = serializers.user_serializer(
        users_db.find_one({"_id": bson.ObjectId(user_id)})
    )
    return {"status": "OK", "data_updated": user}


def remove_user(user_id: str) -> dict:
    get_user(user_id)
    users_db.delete_one({"_id": bson.ObjectId(user_id)})
    return {"status": "OK", "data_deleted": True}
