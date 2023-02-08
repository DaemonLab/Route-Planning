import numpy as np
import random
import requests
from requests.structures import CaseInsensitiveDict
import json
import googlemaps

from database import location_details_db
import serializers
import utils


GOOGLE_API_KEY = 'Your Google API KEY'
GEOAPIFY_ROUTING_API_KEY = "fe5e6ebb8b044f6c9a70b8fa79976f6e"
GEOAPIFY_DELIVERY_MATRIX_API_KEY = "43b7a76300ae4001ae5d55cebb7b3a45"
GEOAPIFY_PICKUP_MATRIX_API_KEY = "9ab45a8832bd402fbfcb98db52433ef0"


# def geocode(awb_id, address):
#     gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
#     geocode_result = gmaps.geocode(address)
#     lat , lng = geocode_result[0]['geometry']['location']['lat'],geocode_result[0]['geometry']['location']['lng']
#     return lat , lng

def geocode(awb_id,address):
       
    f = open('./utils/awb_to_coordinate.json')
    awb_to_coordinate = json.load(f)

    return awb_to_coordinate[awb_id]["lat"] , awb_to_coordinate[awb_id]["lng"]

def preprocess_response(response, coordinate_source, coordinate_destination):

    time_taken, distance, current_route, route_details, route_polyline = -1, 0, [], [], []

    try:

        time_taken = response['features'][0]['properties']['time']
        distance = response['features'][0]['properties']['distance']
        steps = list(response['features'][0]['properties']['legs'][0]['steps'])
        coordinates = list(response['features'][0]
                           ['geometry']['coordinates'][0])

        num_steps = len(steps)

        current_route = []
        route_details = []
        route_polyline = []

        for i in range(num_steps):

            coordinate = {
                'lat': coordinates[steps[i]['from_index']][1],
                'lng': coordinates[steps[i]['from_index']][0]
            }

            try:
                instruction = str(steps[i]['instruction']['text'])
            except:
                instruction = "None"

            try:
                speed_limit = str(steps[i]['speed_limit'])
            except:
                speed_limit = "-"

            information = {
                'time_taken': steps[i]['time'],
                'distance': steps[i]['distance'],
                'speed_limit': speed_limit,
                'instruction': instruction,
                'from_index': steps[i]['from_index'],
                'to_index': steps[i]['to_index'],
                'polyline_index': steps[i]['from_index']
            }

            current_route.append(coordinate)

            if i <= (num_steps-2):
                route_details.append(information)

        for coordinate in coordinates:
            route_polyline.append({
                'lat': coordinate[1],
                'lng': coordinate[0]
            })

        return {
            'from': current_route[0],
            'to': current_route[-1],
            'distance': distance,
            'time_taken': time_taken,
            'current_route': current_route,
            'route_details': route_details,
            'route_polyline': route_polyline
        }

    except:

        if time_taken == -1:
            print("Colud not find time")
            return 0

        current_route = (current_route if len(current_route) > 0 else [
                         coordinate_source, coordinate_destination])
        route_details = (route_details if len(route_details) > 0 else [{
            'time_taken': time_taken,
            'distance': (distance if distance else 0),
            'speed_limit': (speed_limit if speed_limit else 0),
            'instruction': (instruction if instruction else "")
        }])

        route_polyline = (route_polyline if len(route_polyline) > 0 else [coordinate_source, coordinate_destination])

        return {
            'from': coordinate_source,
            'to': coordinate_destination,
            'distance': distance,
            'time_taken': time_taken,
            'current_route': current_route,
            'route_details': route_details,
            'route_polyline': route_polyline
        }
    

def find_route(coordinate_source, coordinate_destination):


    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"

    lat1, lng1 = str(coordinate_source['lat']), str(coordinate_source['lng'])
    lat2, lng2 = str(coordinate_destination['lat']), str(coordinate_destination['lng'])

    routing_url = f"https://api.geoapify.com/v1/routing?waypoints={lat1},{lng1}|{lat2},{lng2}&mode=motorcycle&details=instruction_details,route_details&apiKey=" + GEOAPIFY_ROUTING_API_KEY
    response = requests.get(routing_url, headers=headers)
    response = response.json()
    return preprocess_response(response, coordinate_source, coordinate_destination)


def get_route(tasks, i1, i2):

    if i2 >= len(tasks):
        return [], [], []

    try:
        awb_source = (utils.WAREHOUSE_LOCATION_DETAIL["awb_id"] if i1 == -1 else tasks[i1]["awb_id"])
        awb_destination = tasks[i2]["awb_id"]


        location_detail_source      = (serializers.location_detail_serializer(location_details_db.find_one({"awb_id": awb_source})))
        location_detail_destination = (serializers.location_detail_serializer(location_details_db.find_one({"awb_id": awb_destination})))

        coordinate_source      = {"lat": location_detail_source["lat"], "lng": location_detail_source["lng"]}
        coordinate_destination = {"lat": location_detail_destination["lat"], "lng": location_detail_destination["lng"]}

        route = find_route(coordinate_source, coordinate_destination)
        return route["current_route"], route["route_details"], route["route_polyline"] , route["time_taken"]

    except Exception as E:
        print(E)
        print("Could not find route", awb_source, awb_destination)
        return [], [], []

def get_delivery_time_matrix(items, num_items): 

    dist = np.zeros((num_items+1,num_items+1))

    origins , destinations = [] , []

    lat , lng = utils.WAREHOUSE_LOCATION_DETAIL['lat'] , utils.WAREHOUSE_LOCATION_DETAIL['lng']
    origins.append( {"location": [lng, lat] } )
    destinations.append( {"location": [lng, lat] } )

    for item in items:
        lat , lng = item['task_location']['lat'] , item['task_location']['lng']
        origins.append( {"location": [lng, lat] } )
        destinations.append( {"location": [lng, lat] } )

    url = f"https://api.geoapify.com/v1/routematrix?apiKey={GEOAPIFY_DELIVERY_MATRIX_API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {
        "sources": origins,
        "targets": destinations,
        "mode": "drive"
    }

    resp = requests.post(url, headers=headers, json=data).json()

    for row in resp["sources_to_targets"]:
        for dist_pair in row:
            dist[dist_pair["source_index"]][dist_pair["target_index"]] = int(dist_pair["time"])

    dist = dist.astype(int)
    return dist

def get_pickup_time_matrix(riders, item):

    origins , destinations = [] , []

    lat , lng = item['task_location']['lat'] , item['task_location']['lng']
    origins.append( {"location": [lng, lat] } )

    for rider in riders:

        if len(rider["tasks"] == 0):
            continue

        num_tasks = len(rider["tasks"]) - rider["task_index"]
        
        for task_index in range(rider["task_index"], rider["task_index"] + num_tasks):

            task_location = riders["tasks"][task_index]["task_location"]
            lat, lng = task_location["lat"], task_location["lng"]
            destinations.append({"location": [lng, lat]})

    url = f"https://api.geoapify.com/v1/routematrix?apiKey={GEOAPIFY_PICKUP_MATRIX_API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {
        "sources": origins,
        "targets": destinations,
        "mode": "drive"
    }

    resp = requests.post(url, headers=headers, json=data).json()


    j = 0

    times_from_pickup = dict(dict())

    for rider in riders:
        times_from_pickup.setdefault(rider["rider_id"], {})

        num_tasks = len(rider["tasks"]) - rider["task_index"]

        for task_index in range(rider["task_index"], rider["task_index"] + num_tasks):
            times_from_pickup[rider["rider_id"]][task_index] = resp["sources_to_targets"][0][j]
            j+=1

    return times_from_pickup


'''

RANDOM

def geocode(awb_id,address):
       
    f = open('./utils/awb_to_coordinate.json')
    awb_to_coordinate = json.load(f)

    return awb_to_coordinate[awb_id]["lat"] , awb_to_coordinate[awb_id]["lng"]

def get_delivery_time_matrix(items, num_items):
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
        #return init route
        return [{"lat": 2.34,"lng": 10.21}] , [{"time_taken": 10,"distance": 24,"speed_limit": 13,"instruction": "inst1"}] , [{"lat": 2.34,"lng": 10.21}]

    if i2>=len(tasks):
        return [] , [] , []
    
    f = open('./services/pair_route_1.json')
    awb_pair_to_route = json.load(f)

    awb1 , awb2 = tasks[i1]["awb_id"] , tasks[i2]["awb_id"]

    route = awb_pair_to_route[f"{awb1}-{awb2}"]
    return route["current_route"] , route["route_details"] , route["route_polyline"]
'''


'''
ACTUAL
GOOGLE_API_KEY = 'Your Google API KEY'
GEOAPIFY_ROUTING_API_KEY = "fe5e6ebb8b044f6c9a70b8fa79976f6e"
GEOAPIFY_DELIVERY_MATRIX_API_KEY = "43b7a76300ae4001ae5d55cebb7b3a45"
GEOAPIFY_PICKUP_MATRIX_API_KEY = "9ab45a8832bd402fbfcb98db52433ef0"


def geocode(awb_id, address):
    gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
    geocode_result = gmaps.geocode(address)
    lat , lng = geocode_result[0]['geometry']['location']['lat'],geocode_result[0]['geometry']['location']['lng']
    return lat , lng


def preprocess_response(response, coordinate_source, coordinate_destination):

    time_taken, distance, current_route, route_details, route_polyline = -1, 0, [], [], []

    try:

        time_taken = response['features'][0]['properties']['time']
        distance = response['features'][0]['properties']['distance']
        steps = list(response['features'][0]['properties']['legs'][0]['steps'])
        coordinates = list(response['features'][0]
                           ['geometry']['coordinates'][0])

        num_steps = len(steps)

        current_route = []
        route_details = []
        route_polyline = []

        for i in range(num_steps):

            coordinate = {
                'lat': coordinates[steps[i]['from_index']][1],
                'lng': coordinates[steps[i]['from_index']][0]
            }

            try:
                instruction = str(steps[i]['instruction']['text'])
            except:
                instruction = "None"

            try:
                speed_limit = str(steps[i]['speed_limit'])
            except:
                speed_limit = "-"

            information = {
                'time_taken': steps[i]['time'],
                'distance': steps[i]['distance'],
                'speed_limit': speed_limit,
                'instruction': instruction,
                'from_index': steps[i]['from_index'],
                'to_index': steps[i]['to_index'],
                'polyline_index': steps[i]['from_index']
            }

            current_route.append(coordinate)

            if i <= (num_steps-2):
                route_details.append(information)

        for coordinate in coordinates:
            route_polyline.append({
                'lat': coordinate[1],
                'lng': coordinate[0]
            })

        return {
            'from': current_route[0],
            'to': current_route[-1],
            'distance': distance,
            'time_taken': time_taken,
            'current_route': current_route,
            'route_details': route_details,
            'route_polyline': route_polyline
        }

    except:

        if time_taken == -1:
            print("Colud not find time")
            return 0

        current_route = (current_route if len(current_route) > 0 else [
                         coordinate_source, coordinate_destination])
        route_details = (route_details if len(route_details) > 0 else [{
            'time_taken': time_taken,
            'distance': (distance if distance else 0),
            'speed_limit': (speed_limit if speed_limit else 0),
            'instruction': (instruction if instruction else "")
        }])

        route_polyline = (route_polyline if len(route_polyline) > 0 else [coordinate_source, coordinate_destination])

        return {
            'from': coordinate_source,
            'to': coordinate_destination,
            'distance': distance,
            'time_taken': time_taken,
            'current_route': current_route,
            'route_details': route_details,
            'route_polyline': route_polyline
        }
    

def find_route(coordinate_source, coordinate_destination):


    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"

    lat1, lng1 = str(coordinate_source['lat']), str(coordinate_source['lng'])
    lat2, lng2 = str(coordinate_destination['lat']), str(coordinate_destination['lng'])

    routing_url = f"https://api.geoapify.com/v1/routing?waypoints={lat1},{lng1}|{lat2},{lng2}&mode=motorcycle&details=instruction_details,route_details&apiKey=" + GEOAPIFY_ROUTING_API_KEY
    response = requests.get(routing_url, headers=headers)
    response = response.json()
    return preprocess_response(response, coordinate_source, coordinate_destination)


def get_route(tasks, i1, i2):

    if i2 >= len(tasks):
        return [], [], []

    try:
        awb_source = (utils.WAREHOUSE_LOCATION_DETAIL["awb_id"] if i1 == -1 else tasks[i1]["awb_id"])
        awb_destination = tasks[i2]["awb_id"]


        location_detail_source      = (serializers.location_detail_serializer(location_details_db.find_one({"awb_id": awb_source})))
        location_detail_destination = (serializers.location_detail_serializer(location_details_db.find_one({"awb_id": awb_destination})))

        coordinate_source      = {"lat": location_detail_source["lat"], "lng": location_detail_source["lng"]}
        coordinate_destination = {"lat": location_detail_destination["lat"], "lng": location_detail_destination["lng"]}

        route = find_route(coordinate_source, coordinate_destination)
        return route["current_route"], route["route_details"], route["route_polyline"]

    except Exception as E:
        print(E)
        print("Could not find route", awb_source, awb_destination)
        return [], [], []

def get_delivery_time_matrix(items, num_items): 

    dist = np.zeros((num_items+1,num_items+1))

    origins , destinations = [] , []

    lat , lng = utils.WAREHOUSE_LOCATION_DETAIL['lat'] , utils.WAREHOUSE_LOCATION_DETAIL['lng']
    origins.append( {"location": [lng, lat] } )
    destinations.append( {"location": [lng, lat] } )

    for item in items:
        lat , lng = item['task_location']['lat'] , item['task_location']['lng']
        origins.append( {"location": [lng, lat] } )
        destinations.append( {"location": [lng, lat] } )

    url = f"https://api.geoapify.com/v1/routematrix?apiKey={GEOAPIFY_MATRIX_API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {
        "sources": origins,
        "targets": destinations,
        "mode": "drive"
    }

    resp = requests.post(url, headers=headers, json=data).json()

    for row in resp["sources_to_targets"]:
        for dist_pair in row:
            dist[dist_pair["source_index"]][dist_pair["target_index"]] = int(dist_pair["distance"])

    dist = dist.astype(int)
    return dist

'''