from .user import *
from .rider import *
from .item import *
from .route import *
from .task import *
from .clock import *


def serialize_object(obj):
    try:
        return vars(obj)
    except:
        return obj