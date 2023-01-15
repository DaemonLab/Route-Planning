import * as React from "react";
import { Item } from "../@types/item";
import { Rider } from "../@types/rider";
import { NavigationContextWrapper } from "../@types/navigation";

export const NavigationContext =
  React.createContext<NavigationContextWrapper | null>(null);

interface Props {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<Props> = ({ children }: Props) => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [riders, setRiders] = React.useState<Rider[]>([]);
  const [pickupItems, setPickupItems] = React.useState<Item[]>([]);
  const [availableRiders,setAvailableRiders] = React.useState<Rider[]>([]);

  // const options = {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ rider_id: rider.rider_id }),
  // };

  // fetch("/api/rider", options)
  //   .then((response) => response.json())
  //   .then((data: Rider) => {
  //     setUpdatedRider({ ...updatedRider, ...data });
  //   });

  const getItems = () => {
    //get items using API call
  };

  const getRiders = () => {
    //get riders using API call
  };

  const updateRiderLocations = (time_delta: number) => {
    
    riders.map((rider): Rider => {

      const [updatedRider, setUpdatedRider] = React.useState<Rider>(rider);

      let current_index = rider.current_index;
      let route_information = rider.route_information;

      while (current_index < route_information.length) {

        if (time_delta >= route_information[current_index]["time_taken"]) {
          time_delta -= route_information[current_index]["time_taken"];
          route_information[current_index]["time_taken"] = 0;
          current_index++;
        } 
        else {
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

  return (
    <NavigationContext.Provider
      value={{
        items,
        riders,
        getItems,
        getRiders,
        updateRiderLocations,
        addPickupItem,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
