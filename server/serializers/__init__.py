from .rider import *
from .item import *
from .route import *
from .task import *


def serialize_object(obj):
    try:
        return vars(obj)
    except:
        return obj