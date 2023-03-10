import * as React from "react";
import { Item, Tool, ItemContextWrapper } from "../@types/item";
import * as api from "../api";

export const ItemContext = React.createContext<ItemContextWrapper | null>(null);

interface Props {
  children: React.ReactNode;
}

const ItemProvider: React.FC<Props> = ({ children }: Props) => {
  const [item, setItem] = React.useState<Item>({
    item_id: "",
    name: "",
    description: "",
    task_type: "Delivery",
    is_completed: false,
    completion_time: new Date("2023-01-14 16:30:00"),

    volume: 0,
    weight: 0,

    awb_id: "1234",
    task_location: { address: "", lat: 0.0, lng: 0.0 },
    scan_time: new Date("2023-01-14 16:30:00"),
    edd: 0
  } as Item);

  const [tool, setTool] = React.useState<Tool>({'volume':0,'weight':0})
  const [items, setItems] = React.useState<Item[]>([]);

  const getItem = async (item_id: string) => {
    const { data } = await api.getItem(item_id);
    setItem({ ...data.item });
  };

  const getTool = async () => {
    const { data } = await api.getTool()
    setTool(data.tool)
  }

  const getItems = async () => {
    const { data } = await api.getItems();
    setItems([...data.items]);
  };

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const addDispatchDetails = async (items: Item[]) => {
    await api.addDispatchDetails(items)
  }

  const addItems = async () => {
    console.log("Adding items",items)
    await api.addItems(items);
  };

  const deleteItem = () => {
    //delete Item using API call
  };

  return (
    <ItemContext.Provider
      value={{
        item,
        items,
        tool,
        getTool,
        setItem,
        getItem,
        getItems,
        addItem,
        addDispatchDetails,
        addItems,
        deleteItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
