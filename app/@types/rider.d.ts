import { Location } from "./location";

export interface Task {
  item_id: string;
  task_type: string;
  task_location: Location;
  time_req: number;
}

export interface Rider {
  rider_id: string;
  name: string;
  age: number;
  bag_volume: number;
  current_location: Location;
  current_route: Location[];
  tasks: Task[];
}

export type RidersContextWrapper = {
  riders: Rider[];
  getRiders: () => void;
  addRider: (rider: Rider) => void;
  updateRider: (rider: Rider) => void;
  deleteRider: (id: string) => void;
};
