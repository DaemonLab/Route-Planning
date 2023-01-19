from typing import List

from models import User


def user_serializer(user: User) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "role": user["role"],
        "hashed_password": user["hashed_password"],
    }


def users_serializer(users: List[User]) -> list:
    return [user_serializer(user) for user in users]
