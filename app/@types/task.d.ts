import { Location } from "./route";

export interface Task {
    item_id: string;
    volume: number;
    task_type: string;
    edd: Date | null;
    awb_id: string;
    task_location: Location;
    time_next: number;
};

export interface TaskLog {
    item_id: string;
    rider_id: string;
}