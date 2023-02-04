from models import Clock
import serializers


def clock_serializer(clock: Clock) -> dict :

    if clock is None:
        return clock
    
    clock = serializers.serialize_object(clock)

    return {
        "day_start": clock["day_start"],
        "clock_start": clock["clock_start"],
        "is_scanned": clock["is_scanned"],
        "is_dispatched": clock["is_dispatched"]
    }
