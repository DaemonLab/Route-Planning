import serializers
from database import rider_db
import json
import time


def get_riders():
    
    riders_time_series = []

    for i in range(50):
        
        riders = serializers.riders_serializer(rider_db.find())

        riders_time_series.append(riders[0])

        time.sleep(1)

    res = dict()

    res["rider_ts"] = riders_time_series

    with open("./updateTest/riders.json", "w") as outfile:
        json.dump(res, outfile)



get_riders()