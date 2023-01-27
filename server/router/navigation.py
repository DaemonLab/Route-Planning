import services
from fastapi import APIRouter 
from setInterval import setInterval
import threading

router = APIRouter(prefix="/navigation",tags=["Navigation"])

inter = 'setInterval Object'

@router.get("/")
def nav():
    return {"route_working":"true"}

@router.get("/dispatch")
def dispatch():
    return services.dispatch()

@router.get("/start")
def start_navigation():
    try:
        global inter
        inter = setInterval(1.0,services.rider_update)
        return {'navigtation_started':True}
    except Exception as E:
        return {'navigation_started:':False,'error':E}

@router.get("/stop")
def stop_navigation():
    try:
        global inter
        threading.Timer(0.1,inter.cancel).start()
        return {'navigation_stopped:':True}
    except Exception as E:
        return {'navigation_stopped:':False,'error':E}

