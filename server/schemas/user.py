from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    hashed_password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


def user_serializer(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "hashed_password": user["hashed_password"],
    }


def users_serializer(users) -> list:
    return [user_serializer(user) for user in users]
