import pandas as pd
import json
from subprocess import Popen, PIPE
import random
import time
from datetime import datetime as dt

import maputils
import warehouse

random.seed(time.time())

### Read Items ###
items_dispatch = pd.read_csv("./data/items_dispatch.csv")
total_items = len(list(items_dispatch["AWB"]))
num_items = total_items
item_ids = list(items_dispatch["product_id"])[:num_items]
awbs = list(items_dispatch["AWB"])[:num_items]
addresses = list(items_dispatch['address'])[:num_items]
edd_dates = list(items_dispatch["EDD"])[:num_items]

time_adj = maputils.get_delivery_time_matrix(awbs, num_items)
##############################################

### Random Values ###
item_volumes = [int(random.randint(10,31)) for i in range(num_items)]
num_riders = max(5, random.randint(int(num_items/30),int(num_items/20)))
rider_bag_volumes = [int(random.randint(500,1500)) for i in range(num_riders)]
item_edds = []
for edd_date in edd_dates:
    edd_simult = dt.strptime(edd_date, "%d-%m-%Y")
    edd_time_algthm = (edd_simult - warehouse.day).total_seconds()
    edd_time_algthm = edd_time_algthm + (random.randint(3600,48600) if edd_time_algthm>0 else random.randint(3600,30000))
    edd_time_algthm = min(edd_time_algthm,46800)
    item_edds.append(int(edd_time_algthm))
##############################################

### Read Geocoded Coordinates ###
f = open('./data/awb_to_coordinate.json')
awb_to_coordinate = json.load(f)
##############################################


assign_deliveries = False

def get_delivery_assignment():

    program_path = "./dispatch_algo/dispatch_eval.exe"
    p = Popen(program_path, stdout=PIPE, stdin=PIPE,  encoding='utf8')

    f = open("./dispatch_algo/input.in","w")

    p.stdin.write(str(num_items)+'\n')
    f.write(str(num_items)+'\n\n')

    for i in range(num_items+1):
        for j in range(num_items+1):

            if i == j:
                p.stdin.write(str(0)+'\n')
                f.write(str(0)+' ')
                continue

            p.stdin.write(str(int(time_adj[i][j]))+'\n')
            f.write(str(int(time_adj[i][j]))+' ')
        f.write('\n')
    f.write('\n')

    for i in range(num_items):
        item_volume = str(int(item_volumes[i]))
        p.stdin.write(item_volume+'\n')
        f.write(item_volume+' ')
    f.write('\n\n')

    for i in range(num_items):
        item_edd = item_edds[i]
        p.stdin.write(str(int(item_edd))+'\n')
        f.write(str(int(item_edd))+' ')

    f.write('\n\n')

    location_detail = warehouse.WAREHOUSE_LOCATION_DETAIL
    p.stdin.write(str(location_detail["lat"])+'\n')
    p.stdin.write(str(location_detail["lng"])+'\n')
    f.write(str(location_detail["lat"])+' ')
    f.write(str(location_detail["lng"])+' ')
    f.write('\n')

    for awb_id in awbs:
        awb_id = str(awb_id)
        p.stdin.write(str(awb_to_coordinate[awb_id]["lat"])+'\n')
        p.stdin.write(str(awb_to_coordinate[awb_id]["lng"])+'\n')
        f.write(str(awb_to_coordinate[awb_id]["lat"])+' ')
        f.write(str(awb_to_coordinate[awb_id]["lng"])+' ')
        f.write('\n')
    f.write('\n')

    p.stdin.write(str(1)+'\n')
    f.write(str(1)+' ')

    for i in range(num_items):
        p.stdin.write(str(1)+'\n')
        f.write(str(1)+' ')

    f.write('\n\n')
        
    p.stdin.write(str(int(num_riders))+'\n')
    f.write(str(int(num_riders)) + '\n')

    for i in range(num_riders):
        bag_volume = str(int(rider_bag_volumes[i]))
        p.stdin.write(bag_volume+'\n')
        f.write(bag_volume + ' ')
    f.write('\n')

    p.stdin.flush()

    deliveries = dict()

    for i in range(num_riders):

        order = []

        while True:

            result = int(p.stdout.readline().strip())

            if result == -1:
                break

            order.append(result-1)

        deliveries[i] = order

    return item_volumes , rider_bag_volumes , item_edds , time_adj , deliveries

if assign_deliveries:
    item_volumes , rider_bag_volumes , item_edds , time_adj, deliveries = get_delivery_assignment()
    def save_variables():
        f = open('./data/dispatch_variables/item_volumes.in','w')
        for volume in item_volumes:
            f.write(str(volume) + '\n')

        f = open('./data/dispatch_variables/rider_bag_volumes.in','w')
        for volume in rider_bag_volumes:
            f.write(str(volume) + '\n')

        f = open('./data/dispatch_variables/item_edds.in','w')
        for edd in item_edds:
            f.write(str(edd) + '\n')

        f = open('./data/dispatch_variables/time_adj.in','w')
        for row in time_adj:
            for val in row:
                f.write(str(int(val)) + '\n')

        with open("./data/dispatch_variables/deliveries.json", "w") as outfile:
            json.dump(deliveries, outfile)
    save_variables()

#############################################

find_routes = True

if not find_routes:
    print(5/0)

def load_variables(num_items,num_riders):

    item_volumes = []
    f = open('./data/dispatch_variables/item_volumes.in','r')
    for i in range(num_items):
        item_volumes.append(int(f.readline()))
    
    rider_bag_volumes = []
    f = open('./data/dispatch_variables/rider_bag_volumes.in','r')
    for i in range(num_riders):
        rider_bag_volumes.append(int(f.readline()))

    item_edds = []
    f = open('./data/dispatch_variables/item_edds.in','r')
    for i in range(num_items):
        item_edds.append(int(f.readline()))

    f = open('./data/dispatch_variables/time_adj.in','r')
    for i in range(1,num_items+1):
        for j in range(1,num_items+1):
            time_adj[i][j] = int(f.readline())

    f = open("./data/dispatch_variables/deliveries.json")
    deliveries = json.load(f)

    return item_volumes , rider_bag_volumes , item_edds , time_adj, deliveries

num_riders = 10
item_volumes , rider_bag_volumes , item_edds , time_adj, deliveries = load_variables(num_items,num_riders)

print(deliveries)


riders_0 = []

for rider_ind in range(num_riders):

    rider = dict()
    rider["rider_id"] = str(rider_ind)

    bag_volume = int(rider_bag_volumes[rider_ind])

    tasks = []

    for delivery_ind in range(len(deliveries[str(rider_ind)])):

        item_ind = deliveries[str(rider_ind)][delivery_ind]

        item_num_1 = (deliveries[str(rider_ind)][delivery_ind] + 1)
        item_num_2 = (deliveries[str(rider_ind)][delivery_ind+1] + 1) if (delivery_ind+1) < len(deliveries[str(rider_ind)]) else 0

        tasks.append({
            "item_id": item_ids[item_ind],
            "awb_id": str(awbs[item_ind]),
            "task_type": "Delivery",
            "volume": int(item_volumes[item_ind]),
            "task_location": {
                "address": addresses[item_ind],
                "lat": awb_to_coordinate[str(awbs[item_ind])]["lat"],
                "lng": awb_to_coordinate[str(awbs[item_ind])]["lng"],
            },
            "edd": int(item_edds[item_ind]),
            "route_steps": [],
            "route_polyline": [],
            "time_taken": 0,
            "time_next": -1
        })

        bag_volume-=int(item_volumes[item_ind])

    tasks.append({
        "item_id": "warehose_task",
        "awb_id": "38434272738",
        "task_type": "Delivery",
        "volume": 0,
        "edd": 48600,
        "route_steps": [],
        "route_polyline": [],
        "task_location": {
            "address": "1088, 12th Main, HAL 2nd Stage, Off 100 Feet Road, Indiranagar, Bangalore",
            "lat": 12.9699142,
            "lng": 77.6379417
        },
        "time_taken": 0,
        "time_next": 0
    })

    if len(tasks) > 1:
        for task_ind in range(len(tasks)):
            tasks[task_ind]["route_steps"], tasks[task_ind]["route_polyline"] , tasks[task_ind]["time_taken"]  = maputils.get_route(tasks, task_ind-1, task_ind)
            if task_ind > 0:
                tasks[task_ind-1]["time_next"] = tasks[task_ind]["time_taken"]

    rider["bag_volume"] = int(bag_volume)
    rider["tasks"] = tasks
    rider["task_index"] = 0
    riders_0.append(rider)




with open("./data/riders_0.json", "w") as outfile:
    json.dump(riders_0, outfile)