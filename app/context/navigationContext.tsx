import * as React from "react";
import { Item } from "../@types/item";
import { Rider } from "../@types/rider";
import { NavigationContextWrapper } from "../@types/navigation";
import * as api from "../api";
import { LocationDetail } from "../@types/route";
import { PickupItems } from "../@types/item";

export const NavigationContext =
  React.createContext<NavigationContextWrapper | null>(null);

interface Props {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<Props> = ({ children }: Props) => {

  const [items, setItems] = React.useState<Item[]>([]);
  const [riders, setRiders] = React.useState<Rider[]>([]);

  const dispatch = async () => {
    console.log("Dispatching items")
    await api.dispatch();
  }

  const startInterval = () => {
    setInterval(()=>{
      console.log("Hello Interval from Context")
    },2000)
  }

  const getItems = async () => {
    const { data } = await api.getItems();
    setItems([...data.items]);
  };

  const getRiders = async () => {
    const { data } = await api.getRiders();
    setRiders([...data.riders]);
  };

  const addPickupItems = async (pickupItems: PickupItems) => {
    console.log("Adding pickup items",pickupItems)
    await api.addPickupItems(pickupItems)
  };

  return (
    <NavigationContext.Provider
      value={{
        items,
        riders,
        dispatch,
        startInterval,
        getItems,
        getRiders,
        addPickupItems,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
