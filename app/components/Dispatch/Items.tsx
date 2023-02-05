import React, { use, useEffect } from "react";

import { WarnModal } from "./WarnModal";
import { ConfirmModal } from "./ConfirmModal";
import { ItemContextWrapper, Item } from "../../@types/item";
import { ItemContext } from "../../context/itemContext";

export default function Items() {
  const {  items, getItems } =
    React.useContext(ItemContext) as ItemContextWrapper;

  useEffect(() => {
    getItems();
  }, []);

  const [showWarnModal, setShowWarnModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  return (
    <div className="bg-black">

      {showWarnModal ? <WarnModal setShowWarnModal={setShowWarnModal} /> : null}
      {showConfirmModal ? <ConfirmModal setShowConfirmModal={setShowConfirmModal} /> : null}

      <div className="mx-auto w-full max-w-5xl pt-8 pb-16">
        <h1 className="text-white text-center text-3xl pt-4 pb-2 font-bold">
          Today's Items
        </h1>
        <h2 className="text-center text-white pb-2">January 10, 2023</h2>

        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.item_id} className="border-b-2 border-gray-100">
              <div
                className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent text-gray-100 hover:text-gray-900 ${
                  item.task_type
                    ? "hover:border-green-400 hover:bg-green-100"
                    : "hover:border-yellow-500 hover:bg-yellow-100"
                }`}
              >
                <div className="sm:pl-4 pr-8 flex sm:items-center">
                  <div className="space-y-1">
                    <p className="text-base text-white text-inherit font-bold tracking-wide hover:underline cursor-pointer">
                      {item.item_id}
                    </p>
                    <p className="text-sm font-medium">
                      {item.task_location.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="pr-4 flex flex-col justify-start items-end">
                    <div>
                      {item.task_type == "Delivery" ? (
                        <div>
                          <span className="text-xs text-green-500 font-semibold bg-green-50 px-2 py-1 rounded-full">
                            Delivery
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-yellow-500 font-semibold bg-yellow-50 px-2 py-1 rounded-full">
                          Pickup
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="mx-4 cursor-pointer"
                    onClick={() => setShowWarnModal(true)}
                  >
                    <svg
                      className="w-4"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      stroke="currentColor"
                      fill="#EF4444"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            className="mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg px-5 py-2.5"
            onClick={() => setShowConfirmModal(true)}
          >
            Approve all items and dispatch
          </button>
        </div>
      </div>
    </div>
  );
}
