import React, { useEffect } from "react";
import { ItemsContextWrapper , Item } from "../../@types/item";
import { ItemsContext } from "../../context/itemsContext";

export default function Items() {

  const { items , getItems , approveItemList } = React.useContext(ItemsContext) as ItemsContextWrapper;

  const [showWarnModal, setShowWarnModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const lolitems = [
    {
      id: "(ID 879-10-940)",
      address:
        "1260, SY 35/4, SJR Tower's, 7th Phase, 24th Main, Puttanhalli, JP Nagar, Bangalore",
      type: true,
      link: "#userProfile1",
      rider: "John Doe",
    },
    {
      id: "(ID 879-10-941)",
      address:
        "915, 24th Main Road, 2nd Phase, Mayura Circle, JP Nagar, Bangalore",
      type: false,
      link: "#userProfile2",
      rider: "John Doe",
    },
    {
      id: "(ID 879-10-942)",
      address: "44, 3rd Cross, Marenahalli, 2nd Phase, JP Nagar, Bangalore",
      type: true,
      link: "#userProfile3",
    },
  ];

  return (
    <div className="bg-black">
      <button className="text-white" onClick={()=>approveItemList()}>Click to approve</button>
      {showWarnModal ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl px-2">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                <h3 className="p-1 text-xl font-semibold">Delete Item</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none"
                  onClick={() => setShowWarnModal(false)}
                >
                  <span className="bg-transparent h-6 w-6 text-2xl block outline-none">
                    <svg
                      className="w-4"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      stroke="currentColor"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="relative px-6 py-2 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Are you sure, you want to delete this item?
                </p>
              </div>
              <div className="flex items-center justify-end px-4 py-2 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowWarnModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowWarnModal(false)}
                >
                  Delete item
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showConfirmModal ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl px-2">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                <h3 className="p-1 text-xl font-semibold">Approve Items</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none"
                  onClick={() => setShowConfirmModal(false)}
                >
                  <span className="bg-transparent h-6 w-6 text-2xl block outline-none">
                    <svg
                      className="w-4"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      stroke="currentColor"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="relative px-6 py-2 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Are you sure, you want to approve all the items?
                </p>
              </div>
              <div className="flex items-center justify-end px-4 py-2 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mx-auto w-full max-w-5xl pt-8 pb-16">
        <h1 className="text-white text-center text-3xl pt-4 pb-2 font-bold">
          Today's Items
        </h1>
        <h2 className="text-center text-white pb-2">January 10, 2023</h2>

        <ul className="flex flex-col">
          {lolitems.map((item) => (
            <li key={item.id} className="border-b-2 border-gray-100">
              <div
                className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent text-gray-100 hover:text-gray-900 ${
                  item.type
                    ? "hover:border-green-400 hover:bg-green-100"
                    : "hover:border-yellow-500 hover:bg-yellow-100"
                }`}
              >
                <div className="sm:pl-4 pr-8 flex sm:items-center">
                  <div className="space-y-1">
                    <p className="text-base text-white text-inherit font-bold tracking-wide hover:underline cursor-pointer">
                      {item.id}
                    </p>
                    <p className="text-sm font-medium">{item.address}</p>
                    <p className="text-sm font-medium">
                      {item.rider ? item.rider : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="pr-4 flex flex-col justify-start items-end">
                    <div>
                      {item.type ? (
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
            Approve all items
          </button>
        </div>
      </div>
    </div>
  );
}
