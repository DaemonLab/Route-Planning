from fastapi import APIRouter
from database import items_db, riders_db
import serializers
import json
import random

router = APIRouter(prefix="/test", tags=["Test"])


@router.get("/reset")
def reset():
    items_db.delete_many({})
    riders_db.delete_many({})
    return {'success': True}

@router.get("/download/{count_num}")
def download(count_num: int):
    try:
        riders = serializers.riders_serializer(riders_db.find({}))
        with open(f"./utils/riders_{count_num}.json", "w") as outfile:
            json.dump(riders, outfile)
        return {'success': True}
    except Exception as E:
        print(E)
        return {'success': False}

