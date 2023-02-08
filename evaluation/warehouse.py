from datetime import datetime as dt

day = dt.strptime("07-02-2023", "%d-%m-%Y")

day_end = "07-02-2023 22:00:00"
day_time_end = dt.strptime(day_end, "%d-%m-%Y %H:%M:%S")

day_time_start = "07-02-2023 09:00:00"
day_time_start = dt.strptime(day_time_start, "%d-%m-%Y %H:%M:%S")

WAREHOUSE_LOCATION_DETAIL = {
    "address": "1088, 12th Main, HAL 2nd Stage, Off 100 Feet Road, Indiranagar, Bangalore",
    "area": "Indiranagar",
    "awb_id": "38434272738",
    "lat": 12.9699142, 
    "lng": 77.6379417,
    "item_id": ""
}

WAREHOUSE_TASK = {
    "item_id": "warehose_task",
    "awb_id": WAREHOUSE_LOCATION_DETAIL["awb_id"],
    "task_type": "Delivery",
    "volume": 0,
    "edd": 48600,
    "route_steps": [],
    "route_polyline": [],
    "task_location": {
        "address": WAREHOUSE_LOCATION_DETAIL["address"],
        "lat": WAREHOUSE_LOCATION_DETAIL["lat"],
        "lng": WAREHOUSE_LOCATION_DETAIL["lng"]
    },
    "time_next": 0
}
