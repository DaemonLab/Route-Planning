import { Item, PickupItems } from "./item";
import { Rider, Task } from "./rider";
import { LocationDetail } from "./route";


export interface NavigationContextWrapper {
    items: Item[];
    riders: Rider[];

    dispatch: () => void
    startInterval: () => void
    getItems: () => void
    getRiders: () => void
    addPickupItems: (pickupItems: PickupItems) => void
};

