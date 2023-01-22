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

  
  const getItems = () => {
    //get items using API call
  };

  const getRiders = () => {
    //get riders using API call
  };

  const addPickupItem = (pickupItem: Item) => {
    //add pickup item using API call
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
