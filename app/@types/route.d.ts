export type Location = {
    address: string;
    lat: number;
    lng: number;
};

export type RouteLocation = {
    lat: number;
    lng: number;
}

export interface RouteDetail {
    time_taken: number;
    distance: number;
    speed_limit: number;
    instruction: string;
};