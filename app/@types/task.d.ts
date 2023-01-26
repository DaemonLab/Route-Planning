import { Location } from "./route";

export interface Task {
    item_id: string;
    task_type: string;
    awb_id: string;
    task_location: Location;
};

export interface TaskLog {
    item_id: string;
    rider_id: string;
}