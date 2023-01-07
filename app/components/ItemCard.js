import React from "react";

function ItemCard() {
  return (
    <div className="flex justify-center">
      <div className="bg-[#cee0d5] w-[90%] h-20 mb-5 flex items-center rounded-3xl relative">
        <div className="absolute top-auto left-0 h-[80%] flex items-center w-[75%] justify-center rounded-3xl bg-[#111111] text-white ml-2">
          <div>
            <span className="w-[100%] relative top-0 text-[12px]">
              Item ID:
            </span>
            <h1 className="font-bold text-2xl">79234y7942bhdsda</h1>
          </div>
        </div>

        <button className="absolute border-2 border-[#0deca5] top-auto right-0 h-[80%] flex items-center w-[20%] justify-center rounded-3xl bg-[#111111] text-[#0deca5] mr-2 font-bold">
          Details
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
