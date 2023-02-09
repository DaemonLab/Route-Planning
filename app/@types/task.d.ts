import { Location, RouteLocation, RouteStep} from "./route";

export interface Task {
    item_id: string;
    awb_id: string;
    task_type: "Delivery" | "Pickup";
    volume: number;
    
    task_location: Location;
    edd: number;
    
    route_steps: RouteStep[];
    route_polyline: RouteLocation[];
    time_taken: number;
    time_next: number; 
};

export interface TaskLog {
    item_id: string;
    rider_id: string;
}