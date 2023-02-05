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

export interface RouteDetail {
    time_taken: number;
    distance: number;
    speed_limit: number;
    instruction: string;
    from_index: number;
    to_index: number;
    polyline_index: number;
};