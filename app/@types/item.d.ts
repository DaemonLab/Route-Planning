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
  num_hours: number;
  items: Item[]
}

export interface Tool {
  volume: number;
  weight: number;
}

export type ItemContextWrapper = {
  item: Item;
  tool: Tool;
  items: Item[];
  setItem: Dispatch<SetStateAction<Item>>;
  getItem: (item_id: string) => void;
  getTool: () => void;
  getItems: () => void;
  addItem: (item: Item) => void;
  addDispatchDetails: (items: Item[]) => void
  addItems: () => void;
  deleteItem: (item_id: string) => void;
};
