import { Item } from "./item";
import { Rider, Task } from "./rider";

export interface NavigationContextWrapper {
    items: Item[];
    riders: Rider[];

    getItems: () => void
    getRiders: () => void
    addPickupItem: (item: Item) => void
};

