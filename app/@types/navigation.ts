import { Item } from "./item";
import { Rider, Task } from "./rider";

export interface NavigationContextWrapper {
    items  : Item[];
    riders : Rider[];

    fetchItems : () => void
    fetchRiders : () => void
    addPickupItem : (item : Item) => void
    assignPickupItem : (task : Task) => void 
    completeTask : (task : Task) => void
};

