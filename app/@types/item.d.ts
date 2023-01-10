import { Location } from "./location";

export interface Item {
    item_id : string;
    name : string;
    description : string;
    volume : number; 
    weight : number;
    task_type : string;
    task_location : Location;
    task_completed : boolean;
    edd: Date | null
};

export type ItemsContextWrapper = {
    items: Item[];
    getItems : () => void;
    addItem : (item: Item) => void;
    deleteItem : (id: string) => void;
    approveItemList : () => void;
};