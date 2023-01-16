from database import items
from schemas.item import items_serializer
from schemas.item import Item


def approve_items_list(items_list: list):
    for item in items_list:
        _id = items.insert_one(dict(item))
        added_item = items_serializer(items.find({"_id": _id.inserted_id}))
        print({"status": "OK", "data_inserted": added_item})


def delete_item(item: Item):
    items.find_one_and_delete({"given_id": item.given_id})
    return ({"status": "DELETED"})


def add_item(item: Item):
    _id = items.insert_one(dict(item))
    added_item = items_serializer(items.find({"_id": _id.inserted_id}))
    print({"status": "OK", "data_inserted": added_item})
