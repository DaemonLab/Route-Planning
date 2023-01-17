from typing import Literal

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    email: str = Field(..., title="Email ID")
    role: Literal["Scan", "Dispatch", "Deliver"]

    class Config:
        schema_extra = {
            "example": {
                "email": "john.doe@user.com",
                "role": "Deliver",
            }
        }


class UserCreate(UserBase):
    hashed_password: str = Field(..., title="Password")

    class Config:
        anystr_strip_whitespace = True
        title = "User Create"
        schema_extra = {
            "example": {
                "email": "john.doe@user.com",
                "role": "Deliver",
                "hashed_password": "john_doe",
            }
        }


class User(UserCreate):
    id: str = Field(..., title="User ID")

    class Config:
        anystr_strip_whitespace = True
        title = "User"
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "63c5276e593746d02d88e13a",
                "email": "john.doe@user.com",
                "role": "Deliver",
                "hashed_password": "$2b$12$2.ISiqTByfwrD2ySRajBgOBvNnqhyjuPAdITJ39ZeDKD7aE7aKAkK",
            }
        }
