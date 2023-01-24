import { Location } from "./route";

export interface Item {
  item_id: string;
  name: string;
  description: string;
  task_type: "Delivery" | "Pickup"
  is_completed: boolean;

  volume: number;
  weight: number;

  awb_id: string;
  task_location: Location;
  scan_time: Date | null;
  edd: Date | null;
}

export type ItemContextWrapper = {
  item: Item;
  items: Item[];
  getItem: (item_id: string) => void;
  getItems: () => void;
  addItem: (item: Item) => void;
  addItems: (items: Item[]) => void;
  deleteItem: (item_id: string) => void;
};
