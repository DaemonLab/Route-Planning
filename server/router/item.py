from fastapi import APIRouter
from typing import List
from typing import Dict, Any


from models import Item
from database import tool_db
import services
import serializers



router = APIRouter(prefix="/item", tags=["Items"])


@router.get("/{item_id}")
def get_item(item_id: str):
    return services.get_item(item_id=item_id)


@router.get("/")
def get_items():
    return services.get_items()

@router.post("/add_dispatch_details")
def add_dispatch_details(items: List[Item]):
    return services.add_dispatch_details(items)

@router.post("/")
def add_items(items: List[Item]):
    return services.add_items(items)


@router.delete("/{item_id}")
def delete_item(item_id: str):
    return services.delete_item(item_id=item_id)

@router.get("/tool/getTool")
def get_tool():
    tool = tool_db.find_one({})
    if tool is None:
        tool = {'volume':0,'weight':0}
    return {'tool':serializers.tool_serializer(tool)}

@router.post("/tool/volume")
def show_volume(data: Dict):
    volume = int(data['volume'])

    print(volume)
    
    tool = tool_db.find_one({})

    if tool is None:
        tool_db.insert_one({'volume':volume,'weight': 0})
    else:
        tool_db.update_one({}, {
                "$set": {
                    "volume": volume
                }
            })
    
    return {'success':True}

@router.post("/tool/weight")
def show_weight(data: Dict):
    
    weight = int(data['weight'])

    print(weight)

    tool = tool_db.find_one({})

    if tool is None:
        tool_db.insert_one({'volume':0,'weight': weight})
    else:
        tool_db.update_one({}, {
                "$set": {
                    "weight": weight
                }
            })



