from fastapi.testclient import TestClient
import json

from main import app

client = TestClient(app)

f1 , f2 , f3 = open('./tests/items_dispatch.json') , open('./tests/location_details.json') ,open('./tests/riders.json')
items_dispatch, location_details, riders = json.load(f1) , json.load(f2) , json.load(f3)



def test_dispatch():
    
    client.get("/clock/start_day")
    client.post("/navigation/add_locations", json=location_details)
    client.post("/item", json=items_dispatch)
    client.post("/rider", json=riders)
    response = client.get("/navigation/dispatch")

    assert response.json()['success'] == True

    test_riders = client.get("/rider").json()['riders']

    for rider in test_riders:
        current_route = rider['current_route']
        route_details = rider['route_details']

        if len(current_route) == 0:
            continue

        assert len(current_route) == len(route_details) + 1

