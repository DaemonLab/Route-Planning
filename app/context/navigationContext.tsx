import * as React from "react";
import { Item } from "../@types/item";
import { Rider } from "../@types/rider";
import { NavigationContextWrapper } from "../@types/navigation";
import * as api from "../api";

export const NavigationContext =
  React.createContext<NavigationContextWrapper | null>(null);

interface Props {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<Props> = ({ children }: Props) => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [riders, setRiders] = React.useState<Rider[]>([]);

  const getItems = async () => {
    const { data } = await api.getItems();
    setItems([...data.items]);
  };

  const getRiders = async () => {
    const { data } = await api.getRiders();
    setRiders([...data.riders]);
  };

  const addPickupItem = async (pickupItem: Item) => {
    await api.addItems([{...pickupItem,task_type:"Pickup",is_completed:false}])
  };

  return (
    <NavigationContext.Provider
      value={{
        items,
        riders,
        getItems,
        getRiders,
        addPickupItem,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
