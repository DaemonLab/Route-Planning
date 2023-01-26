import numpy as np

def get_distance_matrix(items,num_items):
    dist = np.random.randint(10, 30, size=(num_items+1, num_items+1))
    return dist