import pandas as pd
import json
from subprocess import Popen, PIPE
import random
import time

import maputils
import warehouse

random.seed(time.time())

def get_updated_riders(riders, NUM_HOURS):

    return riders

    for rider in riders:

        time_delta = NUM_HOURS*60*60

        while rider["task_index"] < len(rider["tasks"]):
            
            if rider["tasks"][rider["task_index"]]["time_taken"] > time_delta:
                rider["tasks"][rider["task_index"]]["time_taken"]-=time_delta
                break

            else:
                time_delta-=rider["tasks"][rider["task_index"]]["time_taken"]
                rider["tasks"][rider["task_index"]]["time_taken"] = 0
                rider["bag_volume"] = rider["bag_volume"] + (rider["tasks"][rider["task_index"]]["volume"])*(1 if rider["tasks"][rider["task_index"]]["task_type"] == "Delivery" else -1)
                rider["task_index"]+=1

    return riders

### To indicate number of hours after which we are adding riders ###
NUM_HOURS = 1

### Read Items ###
items_pickup = pd.read_csv("./data/items_pickup.csv")
total_items = len(list(items_pickup["AWB"]))
num_items = 3
item_ids = list(items_pickup["sku"])[:num_items]
awbs = list(items_pickup["AWB"])[:num_items]
addresses = list(items_pickup["address"])[:num_items]
##############################################

### Read Riders ###
f = open(f'./data/riders_{NUM_HOURS - 1}.json')
riders = json.load(f)
riders = get_updated_riders(riders,NUM_HOURS)
valid_riders = [rider for rider in riders if ( (rider["task_index"] <= (len(rider["tasks"]) - 2)) or len(rider["tasks"])==0 )]
##############################################

##############################################

### Random Values ###
item_volumes = [int(random.randint(10,31)) for i in range(num_items)]
item_edds = [48600 for i in range(num_items)]
##############################################

### Read Geocoded Coordinates###
f = open('./data/awb_to_coordinate.json')
awb_to_coordinate = json.load(f)
##############################################

def add_pickup(item):

    if len(valid_riders)==0:
        print("Pickup Item cannot be added")
        return

    program_path = "./pickup_algo/pickup_eval.exe"
    p = Popen(program_path, stdout=PIPE, stdin=PIPE,  encoding='utf8')

    f = open("./pickup_algo/input.in","w")

    current_time = NUM_HOURS*3600
    p.stdin.write(str(int(current_time))+'\n')
    f.write(str(int(current_time)) + '\n')

    item_volume = str(int(random.randint(10,31)))
    p.stdin.write(item_volume+'\n')
    f.write(item_volume+'\n')

    item_entry_time = current_time
    p.stdin.write(str(int(item_entry_time))+'\n')
    f.write(str(int(item_entry_time))+'\n\n')

    num_riders = len(valid_riders)
    p.stdin.write(str(num_riders)+'\n')
    f.write(str((num_riders))+'\n')

    for rider in valid_riders:
        p.stdin.write(str(int(rider["bag_volume"]))+'\n')
        f.write(str(int(rider["bag_volume"]))+' ')
    f.write('\n\n')

    times_from_pickup = maputils.get_pickup_time_matrix(valid_riders, item)

    for rider_ind in range(len(valid_riders)):

        rider = valid_riders[rider_ind]

        if len(rider["tasks"]) == 0:
            p.stdin.write(str(0)+'\n')
            f.write(str(0) + '\n\n')
            continue

        num_tasks = len(rider["tasks"]) -  valid_riders[rider_ind]["task_index"]
        p.stdin.write(str(num_tasks)+'\n')
        f.write(str(num_tasks) + '\n')

        try:
            first_task_time = rider["tasks"][valid_riders[rider_ind]["task_index"]]["time_taken"]
        except:
            first_task_time = int(random.randint(10,5000))

        p.stdin.write(str(first_task_time)+'\n')
        f.write(str(first_task_time) + '\n')

        for task_index in range(valid_riders[rider_ind]["task_index"], valid_riders[rider_ind]["task_index"] + num_tasks):

            item_volume = rider["tasks"][task_index]["volume"]
            task_type = (0 if rider["tasks"][task_index]["task_type"] == "Delivery" else 1)
            edd_time_simult = rider["tasks"][task_index]["edd"]
            time_next = rider["tasks"][task_index]["time_next"]
            time_from_pickup = times_from_pickup[rider["rider_id"]][task_index]


            p.stdin.write(str(int(item_volume))+'\n')
            p.stdin.write(str(task_type)+'\n')
            p.stdin.write(str(int(edd_time_simult))+'\n')
            p.stdin.write(str(time_next)+'\n')
            p.stdin.write(str(time_from_pickup)+'\n')

            f.write(str(int(item_volume)) + ' ' + str(task_type) + ' ' + str(int(edd_time_simult)) + ' ' + str(time_next) + ' ' + str(time_from_pickup))
            f.write('\n')

        f.write('\n')

    p.stdin.flush()

    rider_ind = int(p.stdout.readline().strip())
    after_task_index = int(p.stdout.readline().strip()) + valid_riders[rider_ind]["task_index"]

    return rider_ind , after_task_index , times_from_pickup

def dispatch_new_rider(rider,item):

    rider["tasks"].append({
        "item_id": item["item_id"],
        "awb_id": item["awb_id"],
        "task_type": "Pickup",
        "volume": item["volume"],
        "task_location": item["task_location"],
        "edd": item["edd"],
        "route_steps": [],
        "route_polyline": [],
        "time_taken": 0,
        "time_next": -1
    })

    rider["tasks"].append(warehouse.WAREHOUSE_TASK)

    tasks = rider["tasks"]

    for task_ind in range(len(tasks)):
        tasks[task_ind]["route_steps"], tasks[task_ind]["route_polyline"] , tasks[task_ind]["time_taken"]  = maputils.get_route(tasks, task_ind-1, task_ind)
        if task_ind > 0:
            tasks[task_ind-1]["time_next"] = tasks[task_ind]["time_taken"]

    rider["tasks"] = tasks

    return rider
    

def insert_pickup( tasks, after_task_index, item):

    pickup_task = dict({
        "item_id": item["item_id"],
        "awb_id": item["awb_id"],
        "task_type": "Pickup",
        "volume": item["volume"],
        "task_location": item["task_location"],
        "edd": item["edd"],
        "route_steps": [],
        "route_polyline": [],
        "time_taken": 0,
        "time_next": -1
    })

    tasks.insert(after_task_index+1, pickup_task)

    for task_ind in range(after_task_index+1,after_task_index+3):
        tasks[task_ind]["route_steps"], tasks[task_ind]["route_polyline"] , tasks[task_ind]["time_taken"]  = maputils.get_route(tasks, task_ind-1, task_ind)
        if task_ind > 0:
            tasks[task_ind-1]["time_next"] = tasks[task_ind]["time_taken"]

    return tasks

for i in range(num_items):

    item = {
        'item_id': item_ids[i],
        'awb_id': str(awbs[i]),
        'volume': item_volumes[i],
        'edd': item_edds[i],
        'task_location': {
            'address': addresses[i],
            'lat': awb_to_coordinate[str(awbs[i])]['lat'],
            'lng': awb_to_coordinate[str(awbs[i])]['lng'],
        }
    }

    rider_ind , after_task_index , times_from_pickup = add_pickup(item)

    print(rider_ind,after_task_index)

    if len(valid_riders[rider_ind]["tasks"]) == 0:
        valid_riders[rider_ind] = dispatch_new_rider(valid_riders[rider_ind], item)

    else:
        tasks = valid_riders[rider_ind]["tasks"]
        valid_riders[rider_ind]["tasks"] = insert_pickup(tasks, after_task_index, item)

    ind = [rind for rind in range(len(riders)) if riders[rind]["rider_id"]==valid_riders[rider_ind]["rider_id"]][0]

with open("./data/riders_1.json", "w") as outfile:
    json.dump(riders, outfile)
