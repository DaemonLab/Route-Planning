export interface ItemType {
    id: number;
    name: string;
    description: string;
    volume: number; //in m^3
    weight: number; //in g
    deliveryLocation: string;
    edd: Date;
};

export type ItemsContextType = {
    items: ItemType[];
    getItemsList : () => void;
    addItem: (item: ItemType) => void;
    deleteItem: (id: number) => void;
    approveItemList: () => void;
};