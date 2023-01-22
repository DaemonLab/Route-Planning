import axios from "axios";
import { GetItemsResponse , GetRidersResponse , AddItemsBody } from "../@types/dto";

const BASE_URL = "http://localhost:8000"



export function getItems() {
    return axios.get<GetItemsResponse>(`${BASE_URL}/item`, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}

export function getRiders() {
    return axios.get<GetRidersResponse>('')
}

export function addItems(items : AddItemsBody) {
    return axios.post(`${BASE_URL}/item`,items,{ headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}