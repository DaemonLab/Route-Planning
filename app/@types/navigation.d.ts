import { Item } from "./item";
import { Rider, Task } from "./rider";

export interface NavigationContextWrapper {
    items: Item[];
    riders: Rider[];

    getItems : () => void
    getRiders : () => void
    updateRiderLocations : (time_delta : number) => void
    addPickupItem : (item : Item) => void
};

