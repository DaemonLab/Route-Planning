from fastapi.testclient import TestClient

from main import app
import tests

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200

def test_dispatch():
    tests.test_dispatch()
    return True

test_dispatch()