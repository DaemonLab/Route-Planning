import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ItemContextWrapper, Item } from "../../@types/item";
import { ItemContext } from "../../context/itemContext";

export const Output: React.FC = () => {
  const router = useRouter();

  const { item, setItem, addItem, addItems } = React.useContext(
    ItemContext
  ) as ItemContextWrapper;

  setTimeout(() => {
    setItem({
      ...item,
      item_id: `SKU_${Math.floor(Math.random() * 100).toString()}`,
      name: `ItemName${Math.floor(Math.random() * 10).toString()}`,
      descrption: "Item Description",
      volume: Math.floor(Math.random() * 10).toString(),
      weight: Math.floor(Math.random() * 100).toString(),
    });
  }, 2000);

  const addItemsHelper = () => {
    addItems();
    router.push("/");
  };

  return (
    <section className="bg-black">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl font-medium text-white">
            ID {item.item_id}
          </h1>
          <div className="mb-8 leading-relaxed text-white">
            {item.description} <br />
            ItemID: {item.item_id} <br />
            Volume: {item.volume} <br />
            Weight: {item.weight} <br />
            AWB_ID: {item.awb_id} <br />
          </div>
          <div className="flex justify-center">
            <button className="inline-flex text-gray-800 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              Add Item
            </button>
            <button className="ml-4 inline-flex text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 rounded text-lg">
              Approve Items
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
