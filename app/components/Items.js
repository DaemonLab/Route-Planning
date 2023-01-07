import React from "react";
import ItemCard from "./ItemCard";
function Items() {
  return (
    <div className="w-[100%] items-wrapper bg-[#0deca5] h-[80%] p-5 m-6 rounded-xl">
      <div className="relative">
        <h1 className="absolute left-0 text-[40px] flex flex-end font-bold">
          Today's Items
        </h1>
        <span className="absolute right-0 top-auto bottom-auto">
          7th January, 2023
        </span>
      </div>
      <div className="h-[70%] overflow-scroll mt-20">
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
      </div>
      <div className="w-[100%] flex justify-center mt-4">
        <button className="shadow-2xl z-auto bg-[#111111] text-[#02f97b] px-5 py-5 rounded-3xl w-[50%] font-bold">
          Allot Items to Riders
        </button>
      </div>
    </div>
  );
}

export default Items;
