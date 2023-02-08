
import pandas as pd
import json

from maputils import get_coordinate


items_dispatch = pd.read_csv("./data/items_dispatch.csv")
items_pickup   = pd.read_csv("./data/items_pickup.csv")

addresses_dispatch , awb_dispatch = list(items_dispatch["address"]) , list(items_dispatch["AWB"])
addresses_pickup , awb_pickup = list(items_pickup["address"]) , list(items_pickup["AWB"])

awb_to_coordinate = dict()


for i in range(len(addresses_dispatch)):
    awb_to_coordinate[awb_dispatch[i]] = get_coordinate(addresses_dispatch[i])

for i in range(len(addresses_pickup)):
    awb_to_coordinate[awb_pickup[i]] = get_coordinate(addresses_pickup[i])

with open("./data/awb_to_coordinate.json", "w") as outfile:
    json.dump(awb_to_coordinate, outfile)