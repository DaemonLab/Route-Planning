import * as React from "react";
import { Item } from "../@types/item";
import { Rider } from "../@types/rider";
import { NavigationContextWrapper } from "../@types/navigation";

export const ItemsContext =
  React.createContext<NavigationContextWrapper | null>(null);

interface Props {
  children: React.ReactNode;
}

const ItemsProvider: React.FC<Props> = ({ children }: Props) => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [riders, setRiders] = React.useState<Rider[]>([]);
  const [pickupItems, setPickupItems] = React.useState<Item[]>([]);

  const getItems = () => {
    //get items using API call
  };

  const getRiders = () => {
    //get riders using API call
  };

  const updateRiderLocations = (time_delta: number) => {
    riders.map((rider) => {
      let current_index = rider.current_index;
      let time_taken = rider.time_taken;

      while (current_index < time_taken.length) {
        if (time_delta >= time_taken[current_index]) {
          time_delta -= time_taken[current_index];
          time_taken[current_index] = 0;
          current_index++;
        } else {
          time_taken[current_index] -= time_delta;
          break;
        }
      }

      if (current_index == time_taken.length) {
        //rider has reached task_point
      }

      return {
        ...rider,
        current_location: rider.current_route[current_index],
        current_index: current_index,
        time_taken: time_taken,
      };
    });
  };

  const addPickupItem = (pickupItem: Item) => {
    setPickupItems([...pickupItems, pickupItem]);
    //add pickup item using API call
  };

  return (
    <ItemsContext.Provider
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
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
