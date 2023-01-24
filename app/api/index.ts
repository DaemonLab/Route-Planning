import axios from "axios";
import {GetItemResponse, GetRiderResponse, GetItemsResponse, GetRidersResponse, AddItemsBody, AddRidersBody } from "../@types/dto";

const BASE_URL = "http://localhost:8000"

export function getItem(item_id: string) {
    return axios.get<GetItemResponse>(`${BASE_URL}/item/${item_id}`, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}  

export function getRider(rider_id: string) {
    return axios.get<GetRiderResponse>(`${BASE_URL}/rider/${rider_id}`, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}  

export function getItems() {
    return axios.get<GetItemsResponse>(`${BASE_URL}/item`, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}

export function getRiders() {
    return axios.get<GetRidersResponse>(`${BASE_URL}/rider`, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}

export function addItems(items : AddItemsBody) {
    return axios.post(`${BASE_URL}/item`,items,{ headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}

export function addRiders(riders : AddRidersBody) {
    return axios.post(`${BASE_URL}/rider`,riders,{ headers: { 'Content-Type': 'application/json;charset=utf-8' } })
}