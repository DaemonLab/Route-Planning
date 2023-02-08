import googlemaps
import numpy as np
import random
import json
from datetime import datetime as dt
import math

import warehouse

f = open('./data/awb_to_coordinate.json')
awb_to_coordinate = json.load(f)

GOOGLE_API_KEY = "YOUR GOOGLE API KEY"
gmaps = googlemaps.Client(key=GOOGLE_API_KEY)


def get_coordinate(address : str):
    try:
        geocode_result = gmaps.geocode(address + ', Bangalore' + ', Karnataka' +  ', India')
        lat , lng = geocode_result[0]['geometry']['location']['lat'],geocode_result[0]['geometry']['location']['lng']
        return {
        'lat' : lat,
        'lng' : lng
        }
    except Exception as E:
        print(geocode_result,E)
        print("Could not find for ",address)

def find_dist(awb_source, awb_dest):
    coordinate_source, coordinate_dest = awb_to_coordinate[awb_source] , awb_to_coordinate[awb_dest]
    delta_lat = (coordinate_dest['lat'] - coordinate_source['lat'])
    delta_lng = (coordinate_dest['lng'] - coordinate_source['lng'])
    return int((math.sqrt(delta_lat**2 + delta_lng**2))*1000)

def get_delivery_time_matrix(awbs, num_items):

    dist = np.zeros((num_items+1,num_items+1))

    for i in range(num_items+1):
        for j in range(num_items+1):
            if i==j:
                dist[i][j] = 0
                continue
            
            awb_souce = (warehouse.WAREHOUSE_LOCATION_DETAIL["awb_id"] if i==0 else str(awbs[i-1]))
            awb_dest  = (warehouse.WAREHOUSE_LOCATION_DETAIL["awb_id"] if j==0 else str(awbs[j-1]))

            dist[i][j] = find_dist(str(awb_souce),str(awb_dest))


    dist = dist.astype(int)
    return dist

def get_pickup_time_matrix(riders,item):
    
    times_from_pickup = dict(dict())

    for rider_ind in range(len(riders)):

        rider = riders[rider_ind]

        times_from_pickup.setdefault(rider["rider_id"],{})

        num_tasks = len(rider["tasks"]) - riders[rider_ind]["task_index"]

        for task_index in range( riders[rider_ind]["task_index"], riders[rider_ind]["task_index"] + num_tasks):
            awb_task , awb_pickup = rider["tasks"][task_index]["awb_id"] , item["awb_id"]
            times_from_pickup[rider["rider_id"]][task_index] = find_dist(str(awb_task), str(awb_pickup))

    return times_from_pickup

def decode_polyline(polyline):

    coordinates = []
    index = lat = lng = 0

    while index < len(polyline):
        result = 1
        shift = 0
        while True:
            b = ord(polyline[index]) - 63 - 1
            index += 1
            result += b << shift
            shift += 5
            if b < 0x1f:
                break
        lat += (~result >> 1) if (result & 1) != 0 else (result >> 1)

        result = 1
        shift = 0
        while True:
            b = ord(polyline[index]) - 63 - 1
            index += 1
            result += b << shift
            shift += 5
            if b < 0x1f:
                break
        lng += ~(result >> 1) if (result & 1) != 0 else (result >> 1)

        coordinates.append({"lat": lat * 1e-5, "lng": lng * 1e-5})

    return coordinates


def find_route(coordinate_source, coordinate_destination):

    query1 = str(coordinate_source['lat']) + ',' +  str(coordinate_source['lng'])
    query2 = str(coordinate_destination['lat']) + ',' +  str(coordinate_destination['lng'])

    now = dt.now()
    response = gmaps.directions(query1,query2,
                                        mode="driving",
                                        departure_time=now)

    route_steps , route_polyline , time_taken = [] , [] , 0

    steps = list(response[0]["legs"][0]["steps"])

    for step in steps:
        route_steps.append({
            "distance": step["distance"]["value"],
            "time_taken": step["duration"]["value"],
            "instruction": step["html_instructions"],
            "polyline": list(decode_polyline(step["polyline"]["points"])),
        })

    route_polyline = list(decode_polyline(response[0]["overview_polyline"]["points"]))

    time_taken = response[0]["legs"][0]["duration"]["value"]

    return route_steps , route_polyline , time_taken


def get_route(tasks, i1, i2):

    if i2 >= len(tasks):
        return [], [], []

    try:
        awb_source = (warehouse.WAREHOUSE_LOCATION_DETAIL["awb_id"] if i1 == -1 else tasks[i1]["awb_id"])
        awb_destination = tasks[i2]["awb_id"]

        coordinate_source      = {"lat": awb_to_coordinate[awb_source]["lat"], "lng": awb_to_coordinate[awb_source]["lng"]}
        coordinate_destination = {"lat": awb_to_coordinate[awb_destination]["lat"], "lng": awb_to_coordinate[awb_destination]["lng"]}

        return find_route(coordinate_source, coordinate_destination)

    except Exception as E:
        print(E)
        print("Could not find route", awb_source, awb_destination)
        return [], [], 0