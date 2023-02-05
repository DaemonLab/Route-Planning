import { Item } from "./item";
import { Rider, Task } from "./rider";
import { LocationDetail } from "./route";

export interface NavigationContextWrapper {
    items: Item[];
    riders: Rider[];

    addLocationDetails: (locationDetails: LocationDetail[]) => void
    dispatch: () => void
    startInterval: () => void
    getItems: () => void
    getRiders: () => void
    addPickupItem: (item: Item) => void
};

