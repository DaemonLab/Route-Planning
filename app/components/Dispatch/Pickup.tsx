import React, { useState } from "react";

import { NavigationContextWrapper } from "../../@types/navigation";
import { NavigationContext } from "../../context/navigationContext";

import { Item } from "../../@types/item";

export default function Pickup() {

  const { addPickupItem } = React.useContext(NavigationContext) as NavigationContextWrapper;

  const [pickupItem,setPickupItem] = useState<Item>({
    item_id: "",
    name: "",
    description: "",
    task_type:"Pickup",
    is_completed: false,
    completion_time: new Date("2023-01-14 16:30:00"),
  
    volume:0,
    weight: 0,
  
    awb_id: "",
    task_location: {
      "address":"",
      "lat":0.0,
      "lng":0.0
    },
    scan_time: new Date("2023-01-14 16:30:00"),
    edd: new Date("2023-01-14 16:30:00")
  })

  const addPickupHelper = (e: any) => {
    e.preventDefault()
    addPickupItem(pickupItem)
  }

  return (
    <div className="flex items-center justify-start bg-black pt-8 px-4">
      <div className="mx-auto w-full max-w-lg pt-4">
        <h1 className="text-4xl font-bold text-center text-white">Add a Pickup</h1>
        <form action="" className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative z-0 pt-2 col-span-2">
              <input
                type="text"
                name="name"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
                value={pickupItem.name}
                onChange={(e)=>{setPickupItem({...pickupItem,name:e.target.value})}}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Item Name
              </label>
            </div>
            <div className="relative z-0 pt-2 col-span-2">
              <input
                type="text"
                name="name"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
                value={pickupItem.task_location.address}
                onChange={(e)=>{setPickupItem({...pickupItem,task_location:{'address':e.target.value,lat:0.0,'lng':0.0}})}}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Address
              </label>
            </div>
            <div className="relative z-0 pt-2">
              <input
                type="text"
                name="item id"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
                value={pickupItem.item_id}
                onChange={(e)=>{setPickupItem({...pickupItem,item_id:e.target.value})}}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Item ID
              </label>
            </div>
            <div className="relative z-0 pt-2">
              <input
                type="text"
                name="awb_id"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
                value={pickupItem.awb_id}
                onChange={(e)=>{setPickupItem({...pickupItem,awb_id:e.target.value})}}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                AWB ID
              </label>
            </div>
            <div className="relative z-0 pt-2">
              <input
                type="number"
                name="volume"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
                value={pickupItem.volume}
                onChange={(e)=>{setPickupItem({...pickupItem,volume:parseInt(e.target.value)})}}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Item Volume
              </label>
            </div>
            <div className="relative z-0 pt-2">
              <input
                type="number"
                name="weight"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
                value={pickupItem.weight}
                onChange={(e)=>{setPickupItem({...pickupItem,weight:parseInt(e.target.value)})}}
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Item Weight
              </label>
            </div>
            <div className="relative z-0 col-span-2 pt-2">
              <textarea
                name="message"
                rows={5}
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-2.5 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
                value={pickupItem.description}
                onChange={(e)=>{setPickupItem({...pickupItem,description:e.target.value})}}
              ></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Item Description
              </label>
            </div>
          </div>
          <div className="flex justify-center py-4 mb-8">
              <button
                type="submit"
                className="mt-5 rounded-md bg-green-600 hover:bg-green-500 px-10 py-2 text-white"
                onClick={(e)=>addPickupHelper(e)}
              >
                Add Pickup
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
