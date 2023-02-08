import { Location , RouteLocation ,RouteDetail } from "./route";

export interface Rider {
  
  rider_id: string;
  name: string;
  age: number;
  bag_volume: number;
    
  tasks: Task[];
  task_index: number;
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
