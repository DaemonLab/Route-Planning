export interface RoutePointType {
    task_id : string;
    task_type : string;
    task_location : string;
    time_req : number;
}

export interface RiderType {
    id : string;
    name : string;
    age : number;
    bag_volume : number;
    current_location : string;
    route : RoutePointType[];
};

export type RidersContextType = {
    riders : RiderType[];
    getRiders : () => void;
    addRider : (rider : RiderType) => void;
    updateRider : (rider : RiderType) => void;
    deleteRider : (id : string) => void;
};