import { Item, PickupItems, Tool} from "../@types/item";
import { Rider } from "../@types/rider";
import { LocationDetail } from "./route";

//Items DTO

export type GetItemResponse = {
    item: Item
}

export type GetToolResponse = {
    tool: Tool
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

export type AddLocationDetailsBody = LocationDetail[]
export type AddPickupItemsBody = PickupItems




