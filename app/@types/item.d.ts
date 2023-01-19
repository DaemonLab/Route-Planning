import { Location } from "./location";

export interface Item {
  item_id: string;
  name: string;
  description: string;
  volume: number;
  weight: number;
  task_type: string; // Delvery or pickup
  task_location: Location;
  task_completed: boolean;
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
