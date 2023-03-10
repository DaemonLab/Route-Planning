import axios from "axios";
import {
  GetItemResponse,
  GetToolResponse,
  GetRiderResponse,
  GetItemsResponse,
  GetRidersResponse,
  AddItemsBody,
  AddRidersBody,
  AddPickupItemsBody
} from "../@types/dto";

const BASE_URL = "http://localhost:8000";

//Items API

export function getItem(item_id: string) {
  return axios.get<GetItemResponse>(`${BASE_URL}/item/${item_id}`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function getTool() {
  return axios.get<GetToolResponse>(`${BASE_URL}/item/tool/getTool`,  {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function getItems() {
  return axios.get<GetItemsResponse>(`${BASE_URL}/item`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function addDispatchDetails(items: AddItemsBody) {
  return axios.post(`${BASE_URL}/item/add_dispatch_details`, items, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function addItems(items: AddItemsBody) {
  return axios.post(`${BASE_URL}/item`, items, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

//Riders API

export function getRider(rider_id: string) {
  return axios.get<GetRiderResponse>(`${BASE_URL}/rider/${rider_id}`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function getRiders() {
  return axios.get<GetRidersResponse>(`${BASE_URL}/rider`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function addRiders(riders: AddRidersBody) {
  return axios.post(`${BASE_URL}/rider`, riders, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

//Clock API

export function startDay(day_start: string) {
  return axios.post(`${BASE_URL}/clock/start_day`, day_start, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function completeScan() {
  return axios.get(`${BASE_URL}/clock/complete_scan`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function completeDispatch() {
  return axios.get(`${BASE_URL}/clock/complete_dispatch`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

//Navigation API

export function dispatch() {
  return axios.get(`${BASE_URL}/navigation/dispatch`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function startNavigation() {
  return axios.get(`${BASE_URL}/navigation/start`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function stopNavigation() {
  return axios.get(`${BASE_URL}/navigation/stop`, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}

export function addPickupItems(pickupItems: AddPickupItemsBody) {
  return axios.post(`${BASE_URL}/navigation/add_pickup_items`, pickupItems, {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
}
