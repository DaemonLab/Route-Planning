import { Item } from "../@types/item";
import { Rider } from "../@types/rider";

//Items DTO

export type GetItemResponse = {
    item: Item
}

export type GetItemsResponse = {
    items: Item[]
}

export type AddItemsBody  = Item[]

//Riders DTo

export type GetRiderResponse = {
    rider: Rider
}

export type GetRidersResponse = {
    riders: Rider[]
}

export type AddRidersBody = Rider[]

//Navigation DTO

export type AddPickupItemBody  = Item




