import { Location } from "./route";

export interface Item {
  item_id: string;
  name: string;
  description: string;
  task_type: "Delivery" | "Pickup"
  is_completed: boolean;
  completion_time: Date | null;

  volume: number;
  weight: number;

  awb_id: string;
  task_location: Location;
  scan_time: Date | null;
  edd: number;
};

export interface PickupItems {
  num_hours: int,
  items: Item[]
}

export type ItemContextWrapper = {
  item: Item;
  items: Item[];
  setItem: Dispatch<SetStateAction<Item>>;
  getItem: (item_id: string) => void;
  getItems: () => void;
  addItem: (item: Item) => void;
  addDispatchDetails: (items: Item[]) => void
  addItems: () => void;
  deleteItem: (item_id: string) => void;
};
