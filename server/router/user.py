from services import user as user_func
from fastapi import APIRouter, HTTPException
from database import users
from schemas.user import users_serializer
from schemas.user import UserCreate

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/")
def create_user(user: UserCreate):
    new_user = users_serializer(users.find({"email": user.email}))
    if new_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user_func.create_user(user=user)


@router.get("/")
def read_users(limit: int = 100):
    return user_func.get_users(limit=limit)


@router.get("/{user_id}")
def read_user(user_id: str):
    return user_func.get_user(user_id=user_id)
