import { Item } from "../@types/item";
import { Rider } from "../@types/rider";

export type GetItemsResponse = {
    items: Item[]
}

export type GetRidersResponse = {
    riders: Rider[]
}

export type AddItemsBody = Item[]
