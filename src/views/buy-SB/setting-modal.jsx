import React from "react";
import {Text} from "./buy-sb.styled"
import Toggle from 'react-toggle'
import './buy-sb.css';

export function SettingModal() {
  return (
    <div className=" z-10 modal opacity-3  pointer-events-none fixed   w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay mx-0 my-auto absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="z-50 modal-container bg-gray-200 w-4/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>

        <div className="z-50  modal-content py-4 text-left px-6">
           <div className="flex  border-b border-green-300 py-4">
              <Text size='20px' weight>Swap Settings</Text>
           </div>
           <div className="flex border-b border-green-300 py-4 ">
           <Text size='15px'>Limit intermediate tokens</Text>
          
           </div>
           <div className="flex border-b border-green-300  py-4 ">
           <Text size='15px'>Direct Route Only</Text>
           <label className="switch">
                <input type="checkbox"   />
                <span className="slider round"></span>
            </label>
                        </div>

          <div className="flex justify-end pt-2">
            <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">
              Action
            </button>
            <button className="cursor-pointer modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
