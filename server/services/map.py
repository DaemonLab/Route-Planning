import numpy as np

def get_time_matrix(items,num_items):
    dist = np.random.randint(10, 30, size=(num_items+1, num_items+1))
    return dist

def get_route(tasks,i1,i2):
    return [] , []

def get_time(loc1,loc2):
    return 0

def insert_pickup(tasks,after_task_ind,item):
    return 0
