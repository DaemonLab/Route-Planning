import React, { use, useEffect } from "react";
import RiderMap from "./Map";

export default function Navigation(props: any) {
  // console.log(props.ridersList)
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [riderMap, setRiderMap] = React.useState({})
  useEffect(()=>{
    console.log(props.ridersList)
  })
  const lolitems = [
    {
      current_task: "(ID 879-10-940)",
      name: "John Doe",
      type: true,
      volume: "50 Kg",
    },
    {
      current_task: "(ID 879-10-940)",
      name: "John Doe",
      type: false,
      volume: "50 Kg",
    },
    {
      current_task: "(ID 879-10-940)",
      name: "John Doe",
      type: true,
      volume: "50 Kg",
    },
  ];
  return (
    <section className="bg-black">
      <div className="lg:container px-24 lg:px-5 py-24 mx-auto flex flex-wrap">
        {showInfoModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl px-2">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="p-1 text-xl font-semibold">
                    Task Information
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none"
                    onClick={() => setShowInfoModal(false)}
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
                    Task Information to be filled
                  </p>
                </div>
                <div className="flex items-center justify-end px-4 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase py-2 text-sm outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowInfoModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <h2 className="sm:text-3xl text-2xl text-white font-medium title-font mb-2 md:w-2/5">
          Map
          <RiderMap {...riderMap}></RiderMap>
        </h2>
        <div className="md:w-3/5 md:pl-6">
          <div className="bg-black">
            <div className="mx-auto w-full max-w-5xl lg:pr-4">
              <h1 className="text-white text-center text-3xl pb-2 font-bold">
                All Riders
              </h1>
              <h2 className="text-center text-white pb-2">January 10, 2023</h2>
              
              {props.ridersList.length === 0 || props.ridersList===undefined ? (<h1 className="text-white">Loading!!!</h1>) : (<> <ul className="flex flex-col" >
                {props.ridersList.map((item: any) => (
                  <li
                    key={item.current_task}
                    className="border-b-2 border-gray-100"
                    onClick={() => setRiderMap({ rider: item })}
                  >
                    <div
                      className={`py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent text-gray-100 hover:text-gray-900 ${item.type
                        ? "hover:border-green-400 hover:bg-green-100"
                        : "hover:border-yellow-500 hover:bg-yellow-100"
                        }`}
                    >
                      <div className="sm:pl-4 pr-8 flex sm:items-center">
                        <div className="space-y-1">
                          <p className="text-base text-white text-inherit font-bold tracking-wide hover:underline cursor-pointer">
                            {item.rider_id}
                          </p>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm font-medium">
                            Bag Volume: {item.bag_volume}
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
                          onClick={() => setShowInfoModal(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="#FFFFFF"
                            viewBox="0 0 512 512"
                          >
                            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul></>)}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
