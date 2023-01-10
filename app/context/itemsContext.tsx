import * as React from "react";
import { ItemsContextType , ItemType } from "../@types/item";

export const ItemsContext = React.createContext<ItemsContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const ItemsProvider: React.FC<Props> = ({ children }: Props) => {

      const [items, setItems] = React.useState<ItemType[]>([
          
          {
            id: "a12sdq",
            name: "Dettol Soap",
            description: "This is a soap",
            volume: 53,
            weight: 21,
            deliveryLocation: "IIT Indore, Khandwa Road, Simrol",
            edd: new Date('1995-12-17T03:24:00')
          },

          {
            id: "asd213",
            name: "Bucket",
            description: "This is a bucket",
            volume: 90,
            weight: 10,
            deliveryLocation: "Shiru Cafe, IIT Indore",
            edd: new Date('1995-09-23T04:51:00')
          }
    ]);

    const getItems = () => {
      //get items using API call
    }

    const addItem = (item : ItemType) => {
      setItems([...items, item])
    }

    const deleteItem = (id : string) => {

        setItems((items : ItemType[])=>{
          return items.filter((item)=>item.id!==id)
        })
    }

    const approveItemList = () => {
      console.log("List Approved!")
      //save items using API call
    }

    return (
      <ItemsContext.Provider value={{ items, getItems, addItem, deleteItem , approveItemList}}>
        {children}
      </ItemsContext.Provider>
    );
};

export default ItemsProvider;
