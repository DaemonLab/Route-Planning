import { Item } from "../@types/item";
import { Rider } from "../@types/rider";

export type GetItemResponse = {
    item: Item
}

export type GetRiderResponse = {
    rider: Rider
}

export type GetItemsResponse = {
    items: Item[]
}

export type GetRidersResponse = {
    riders: Rider[]
}


export type AddItemsBody  = Item[]
export type AddRidersBody = Rider[]
