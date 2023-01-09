export interface ItemType {
    id : string;
    name : string;
    description: string;
    volume : number; //in m^3
    weight : number; //in g
    task_location: string;
    task_type : string;
    edd: Date | null
};

export type ItemsContextType = {
    items: ItemType[];
    getItems : () => void;
    addItem : (item: ItemType) => void;
    deleteItem : (id: string) => void;
    approveItemList : () => void;
};