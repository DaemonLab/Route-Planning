import numpy as np
import random
import json

def get_delivery_time_matrix(items,num_items):
    dist = np.random.randint(10, 30, size=(num_items+1, num_items+1))
    return dist

def get_pickup_time_matrix(riders,item):
    
    times_from_pickup = dict(dict())

    for rider in riders:
        times_from_pickup.setdefault(rider["rider_id"],{})

        num_tasks = len(rider["tasks"]) - rider["task_index"]

        for task_index in range(rider["task_index"],rider["task_index"] + num_tasks):
            times_from_pickup[rider["rider_id"]][task_index] = random.randint(10,30)

    return times_from_pickup

def get_route(tasks,i1,i2):

    if i1==-1:
        return ["init_route"] , ["init_route_details"] , ["init_route_polyline"]

    if i2>=len(tasks):
        return [] , [] , []
    
    f = open('./services/pair_route_1.json')
    awb_pair_to_route = json.load(f)

    awb1 , awb2 = tasks[i1]["awb_id"] , tasks[i2]["awb_id"]

    route = awb_pair_to_route[f"{awb1}-{awb2}"]
    return route["route_array"] , route["route_information"] , route["route_polyline"]
