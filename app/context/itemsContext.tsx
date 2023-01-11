import * as React from "react";
import { Item, ItemsContextWrapper } from "../@types/item";

export const ItemsContext = React.createContext<ItemsContextWrapper | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const ItemsProvider: React.FC<Props> = ({ children }: Props) => {
  const [items, setItems] = React.useState<Item[]>([]);

  const getItems = () => {
    //get items using API call
  };

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const deleteItem = (id: string) => {
    setItems((items: Item[]) => {
      return items.filter((item) => item.item_id !== id);
    });
  };

  const approveItemList = () => {
    console.log("List Approved!");
    //save items using API call
  };

  return (
    <ItemsContext.Provider
      value={{ items, getItems, addItem, deleteItem, approveItemList }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
