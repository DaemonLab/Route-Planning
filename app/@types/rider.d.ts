import { Location } from "./location";

export interface Task {
  item_id: string;
  task_type: string;
  task_location: Location;
}

export interface Rider {
  rider_id: string;
  name: string;
  age: number;
  bag_volume: number;
  current_location: Location;
  current_route: Location[];
  current_index : number; //index of rider in current_route_array
  time_taken : number[]; // time_taken[i] = time taken to go from current_route[i] to current_route[i+1]
  tasks: Task[];
}

export type RidersContextWrapper = {
  riders: Rider[];
  getRiders: () => void;
  addRider: (rider: Rider) => void;
  updateRider: (rider: Rider) => void;
  deleteRider: (id: string) => void;
};
