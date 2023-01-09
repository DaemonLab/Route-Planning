export interface ItemType {
    id: string;
    name: string;
    description: string;
    volume: float; //in m^3
    weight: float; //in g
    deliveryLocation: string;
    edd: Date;
};

export type ItemsContextType = {
    items: ItemType[];
    getItemsList : () => void;
    addItem: (item: ItemType) => void;
    deleteItem: (id: string) => void;
    approveItemList: () => void;
};