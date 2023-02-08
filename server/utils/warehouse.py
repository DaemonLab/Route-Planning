from datetime import datetime as dt

day_start = "07-02-2023"
day_start = dt.strptime(day_start, "%d-%m-%Y")

day_time_start = "14-01-2023 09:00:00"
day_time_start = dt.strptime(day_time_start, "%d-%m-%Y %H:%M:%S")


day_time_end = "14-01-2023 22:00:00"
day_time_end = dt.strptime(day_time_end, "%d-%m-%Y %H:%M:%S")

WAREHOUSE_LOCATION_DETAIL = {
    "address": "1088, 12th Main, HAL 2nd Stage, Off 100 Feet Road, Indiranagar, Bangalore",
    "area": "Indiranagar",
    "awb_id": "38434272738",
    "lat": 12.9699142, 
    "lng": 77.6379417,
    "item_id": ""
}

