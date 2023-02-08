export type Location = {
    address: string;
    lat: number;
    lng: number;
};

export type RouteLocation = {
    lat: number;
    lng: number;
}

export type LocationDetail = {
    address: string;
    area: string;
    awb_id: string;
    lat: number;
    lng: number;
    item_id: string;
}

export interface RouteStep {
    distance: number;
    time_taken: number;
    instruction: str;
    polyline: RouteLocation[]
};