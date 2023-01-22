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

export type ItemsContextWrapper = {
  items: Item[];
  getItems: () => void;
  addItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  approveItemList: () => void;
};
