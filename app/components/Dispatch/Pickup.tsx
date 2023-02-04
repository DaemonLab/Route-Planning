import React from "react";

export default function Pickup() {
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
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Item Name
              </label>
            </div>
            <div className="relative z-0 pt-2">
              <input
                type="text"
                name="item id"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
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
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                AWB ID
              </label>
            </div>
            <div className="relative z-0 pt-2">
              <input
                type="text"
                name="volume"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-md text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-green-500">
                Item Volume
              </label>
            </div>
            <div className="relative z-0 pt-2">
              <input
                type="text"
                name="weight"
                className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-3 px-0 text-sm text-gray-100 focus:border-green-500 focus:outline-none focus:ring-0"
                placeholder=" "
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
              >
                Add Pickup
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
