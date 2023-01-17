from fastapi.testclient import TestClient
from ..main import app
from models import UserBase, UserCreate

client = TestClient(app)

user:UserCreate = {"email": "johndoe@example.com", "role": "Scan", "hashed_password": "john_doe"}
updated_user: UserBase = {"email": "john.doe@example.com", "role": "Deliver"}


def test_create_user():
    response = client.post("/users/", json=user)
    assert response.status_code == 200
    user["id"] = response.json()["data_inserted"]["id"]
    response = client.post("/users/", json=user)
    assert response.status_code == 400


def test_read_user():
    response = client.get("/users/{user_id}".format(user_id = user["id"]))
    assert response.status_code == 200


def test_read_users():
    response = client.get("/users/?limit=10")
    assert response.status_code == 200

def test_update_user():
    response = client.put("/users/{user_id}".format(user_id = user["id"]), json=updated_user)
    assert response.status_code == 200

def test_delete_user():
    response = client.delete("/users/{user_id}".format(user_id = user["id"]))
    assert response.status_code == 200