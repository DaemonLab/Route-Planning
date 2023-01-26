import serializers
import services
from database import db
from fastapi import APIRouter, HTTPException
from models import UserBase, UserCreate

router = APIRouter(prefix="/user", tags=["Users"])
users_db = db["users"]


@router.post("/")
def create_user(user: UserCreate):
    db_user = serializers.users_serializer(users_db.find({"email": user.email}))
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return services.create_user(user=user)


@router.get("/{user_id}")
def read_user(user_id: str):
    return services.get_user(user_id=user_id)


@router.get("/")
def read_users(limit: int = 100):
    return services.get_users(limit=limit)


@router.put("/{user_id}")
def update_user(user_id: str, user: UserBase):
    return services.update_user(user_id=user_id, user=user)


@router.delete("/{user_id}")
def remove_user(user_id: str):
    return services.remove_user(user_id=user_id)
