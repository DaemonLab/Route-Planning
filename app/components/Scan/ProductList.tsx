import React, { useEffect } from "react";

import {Product} from "./Product";
import { ItemContextWrapper, Item } from "../../@types/item";
import { ItemContext } from "../../context/itemContext";

export const ProductList: React.FC = () => {
  const { items } = React.useContext(ItemContext) as ItemContextWrapper;

  return (
    <div className="text-gray-400 bg-black">
      <div className="container px-5 py-12 mx-auto">
        <h1 className="text-white text-center text-3xl pb-8 font-bold">
          Scanned Items
        </h1>
        <div className="flex flex-wrap -m-4">
          {items.map((item) => {
            return <Product item={item} key={item.item_id} />;
          })}
        </div>
      </div>
    </div>
  );
}
