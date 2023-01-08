export interface ItemType {
    id: number;
    name: string;
    description: string;
    volume: number;
    weight: number;
    deliveryLocation: string;
    edd: Date;
};

export type ItemsContextType = {
    items: ItemType[];
    addItem: (item: ItemType) => void;
    deleteItem: (id: number) => void;
    approveItemList: () => void;
};