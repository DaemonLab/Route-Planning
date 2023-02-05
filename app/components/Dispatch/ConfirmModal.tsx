import React, { Dispatch, SetStateAction, use, useEffect } from "react";
import { useRouter } from "next/router";

import { NavigationContextWrapper } from "../../@types/navigation";
import { NavigationContext } from "../../context/navigationContext";

interface WarnModalProp {
  setShowConfirmModal: Dispatch<SetStateAction<boolean>>;
}



export const ConfirmModal: React.FC<WarnModalProp> = ({setShowConfirmModal}) => {

  const router = useRouter();

  const { dispatch } = React.useContext(NavigationContext) as NavigationContextWrapper;


  const dispatchHelper = () => {
    setShowConfirmModal(false)
    dispatch()
    router.push("/")
  }

  return (
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
              Are you sure, you want to approve all the items and dispatch?
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
              onClick={() => dispatchHelper()}
            >
              Approve and Dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
