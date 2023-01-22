import serializers
from database import items_db, riders_db
from fastapi import HTTPException
from models import Item, Rider
from typing import List


def dispatch():
    try:
        
        items = items_db.find()
        riders = riders_db.find()

        #Run Routing algorithm and assign deliveries to riders
    except:
        return 0


def update_rider_location():
    print("Updating Rider Location")


def rider_update():

    return 0


'''
riders.map((rider): Rider => {
      const [updatedRider, setUpdatedRider] = React.useState<Rider>(rider);

      let current_index = rider.current_index;
      let route_information = rider.route_information;

      while (current_index < route_information.length) {
        if (time_delta >= route_information[current_index]["time_taken"]) {
          time_delta -= route_information[current_index]["time_taken"];
          route_information[current_index]["time_taken"] = 0;
          current_index++;
        } else {
          route_information[current_index]["time_taken"] -= time_delta;
          break;
        }
      }

      setUpdatedRider({
        ...rider,
        current_location: rider.current_route[current_index],
        current_index: current_index,
        route_information: route_information,
      });

      return updatedRider;
    });
  };

  const addPickupItem = (pickupItem: Item) => {
    //add pickup item using API call
    setPickupItems([...pickupItems, pickupItem]);
  };
'''
