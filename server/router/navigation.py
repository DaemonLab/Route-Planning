import services
from fastapi import APIRouter
from setInterval import setInterval
import threading
from models import Item

router = APIRouter(prefix="/navigation", tags=["Navigation"])

inter = 'setInterval Object'


@router.get("/dispatch")
def dispatch():
    return services.dispatch()


@router.post("/add_pickup")
def add_pickup(item: Item):
    return services.add_pickup_item(item)


@router.get("/start")
def start_navigation():
    try:
        global inter
        inter = setInterval(2.0, services.update_rider_location)
        return {'success': True, 'message': 'Navigation Started Successfully'}
    except Exception as E:
        return {'success:': False, 'message': E}


@router.get("/stop")
def stop_navigation():
    try:
        global inter
        threading.Timer(0.1, inter.cancel).start()
        return {'success': True, 'message': 'Navigation Stopped Successfully'}
    except Exception as E:
        return {'success:': False, 'message': E}
