import { Location , RouteDetail } from "./route";

export interface Rider {
  rider_id: string;
  name: string;
  age: number;
  bag_volume: number;
  current_location: Location;
  current_route: Location[];
  current_index: number; 
  route_details: RouteDetail[]; 
  tasks: Task[];
};

export type RiderContextWrapper = {
  rider: Rider;
  riders: Rider[];
  getRider: (rider_id: string) => void
  getRiders: () => void;
  addRider: (rider: Rider) => void;
  addRiders: (riders: Rider[]) => void;
  deleteRider: (rider_id: string) => void;
};
