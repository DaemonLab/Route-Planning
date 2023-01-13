import bcrypt
import schemas
from bson import ObjectId
from database import users
from fastapi import HTTPException
from schemas.user import users_serializer


def get_user(user_id: str):
    user = users_serializer(users.find({"_id": ObjectId(user_id)}))
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")


def get_user_by_email(email: str):
    user = users_serializer(users.find({"email": email}))
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")


def get_users(limit: int = 100):
    user = users_serializer(users.find().limit(limit))
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="Users not found")


def create_user(user: schemas.UserCreate):
    bytes = user.hashed_password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    user.hashed_password = hash
    _id = users.insert_one(dict(user))
    user = users_serializer(users.find({"_id": _id.inserted_id}))
    return {"status": "OK", "data_inserted": user}
