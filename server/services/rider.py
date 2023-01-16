from database import riders
from schemas.rider import riders_serializer


def get_rider(rider_id: str):
    rider = riders_serializer(riders.find({"rider_id": rider_id}))
    return rider
