import * as React from "react";
import { Item , ItemContextWrapper } from "../@types/item";
import * as api from "../api";

export const ItemContext =
  React.createContext<ItemContextWrapper | null>(null);

interface Props {
  children: React.ReactNode;
}

const ItemProvider: React.FC<Props> = ({ children }: Props) => {

  const [item, setItem]   = React.useState<Item>({} as Item);
  const [items, setItems] = React.useState<Item[]>([]);

  
  const getItem = async (item_id: string) => {
    const { data } = await api.getItem(item_id);
    setItem({...data.item});
  };

  const getItems = async () => {
    const { data } = await api.getItems();
    setItems([...data.items]);
  };

  const addItem = (item: Item) => {
    setItems([...items,item])
  }

  const addItems = async (items: Item[]) => {

    let addItems = [...items]

    addItems = addItems.map((item)=>{
      const id = `insertID${(Math.floor(Math.random() * 100)).toString()}`
      return {...item,item_id:id}
    })

    await api.addItems(addItems)
  };

  const deleteItem = () => {
    //delete Item using API call
  };

  return (
    <ItemContext.Provider
      value={{
        item,
        items,
        getItem,
        getItems,
        addItem,
        addItems,
        deleteItem
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
