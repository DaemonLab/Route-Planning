import datetime
from database import items
from database import riders
from schemas.item import items_serializer
from schemas.rider import riders_serializer


def get_items(edd: datetime.datetime):
    items_list = items_serializer(items.find({"edd": edd}))
    return items_list

def get_riders():
    riders_list = riders_serializer(riders.find())
    return riders_list