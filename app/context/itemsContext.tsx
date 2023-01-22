import * as React from "react";
import { Item, ItemsContextWrapper } from "../@types/item";
import * as api from "../api";

export const ItemsContext = React.createContext<ItemsContextWrapper | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const ItemsProvider: React.FC<Props> = ({ children }: Props) => {
  const [items, setItems] = React.useState<Item[]>([]);

  const getItems = async () => {
    const { data } = await api.getItems();
    setItems([...data.items]);
  };

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const deleteItem = (item_id: string) => {
    setItems((items: Item[]) => {
      return items.filter((item) => item.item_id !== item_id);
    });
  };

  const approveItemList = async () => {

    let addItems = [...items]

    addItems = addItems.map((item)=>{
      const id = `insertID${(Math.floor(Math.random() * 100)).toString()}`
      return {...item,item_id:id}
    })

    await api.addItems(addItems)
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
