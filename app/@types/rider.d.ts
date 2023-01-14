import { Location } from "./location";

export interface RouteInformation {
  time_taken : number;
  distance : number;
  speed_limit : number;
  instruction : string;
};

export interface Task {
  item_id: string;
  task_type: string;
  task_location: Location;
};


export interface Rider {
  rider_id: string;
  name: string;
  age: number;
  bag_volume: number;
  current_location: Location;
  current_route: Location[];
  current_index : number; //index of rider in current_route_array
  route_information : RouteInformation[]; //array of size (current_route.size() - 1)
  tasks: Task[];
};

export type RidersContextWrapper = {
  riders: Rider[];
  getRiders: () => void;
  addRider: (rider: Rider) => void;
  updateRider: (rider: Rider) => void;
  deleteRider: (id: string) => void;
};
