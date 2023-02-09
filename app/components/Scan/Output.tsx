import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ItemContextWrapper, Item } from "../../@types/item";
import { ItemContext } from "../../context/itemContext";
import axios from "axios";

export const Output: React.FC = () => {
  const router = useRouter();
  const [volume, setVolume] = React.useState(0);
  const { item, setItem, addItem, addItems } = React.useContext(
    ItemContext
  ) as ItemContextWrapper;

  const addItemsHelper = () => {
    addItems();
    router.push("/");
  };

  // useEffect(() => {
  //   axios.get("https://localhost:8000/volume").then((response: any) => {
  //     setVolume(response.volume)
  //   })
  // }, [volume])



  const randomItem = () => {
    setItem({
      ...item,
      item_id: `SKU_${Math.floor(Math.random() * 100).toString()}`,
      name: `ItemName${Math.floor(Math.random() * 10).toString()}`,
      descrption: "Item Description",
      volume: Math.floor(Math.random() * (30 - 10) + 10),
      weight: Math.floor(Math.random() * (500 - 100) + 100)
    });
  }

  return (
    <section className="text-gray-400 bg-black">
      <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
        <h1 className="text-white text-center text-3xl pb-8 font-bold">
          Scanned Output
        </h1>
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="https://dummyimage.com/720x600"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            {item.name}
          </h1>
          <p className="leading-relaxed mb-8">
            {item.description} <br />
            ItemID: {item.item_id} <br />
            Volume: {item.volume} <br />
            Weight: {item.weight} <br />
            AWB_ID: {item.awb_id} <br />
          </p>
          <div className="flex justify-center">
            <button
              className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              onClick={() => addItem(item)}
            >
              Add Item
            </button>
            <button
              className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
              onClick={() => addItemsHelper()}
            >
              Approve Items
            </button>
            <button
              className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
              onClick={() => randomItem()}
            >
              Use Random
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
