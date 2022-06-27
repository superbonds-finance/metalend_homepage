import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Checkbox } from 'antd';
import { notify } from "../../utils/notifications";

export default function MyModal({ isShow = true, handleShow=()=>{}}) {
 

  const [checked,setChecked]=useState(false);

useEffect (()=>{
 if(isShow && localStorage.getItem('confirm-disc') ) setChecked(true)
},[isShow])

  const onChange = (e:any) => {
    setChecked(e.target.checked)
  };

  const handleProcced=()=>{
      if(!checked){
        notify({
            message: "Please Confirm Disclaimer To Proceed!",
            type: "error",
          });
          return ;
      }
      localStorage.setItem('confirm-disc',"true")
      handleShow()
  }
  
 
  return (
    <>
      <Transition appear show={isShow} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>{}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto" >
            <div className="flex min-h-full items-center justify-center p-4 text-center" >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  max-w-md transform overflow-y-auto rounded-2xl bg-gray-130 text-white p-6 text-left align-middle shadow-xl transition-all"style={{height:"30rem"}} >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-green-100"
                  >
                  DISCLAIMER
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                      Superstable.finance , its affiliates, and any related
                      domains, collectively “the Platform” are a
                      community-driven collection of blockchain-enabled smart
                      contracts and infrastructure. Any interaction with the
                      Platform is strictly provided “AS IS”, AT YOUR OWN RISK,
                      AND WITHOUT WARRANTIES OF ANY KIND. Any interaction with
                      the Platform is not without substantial risk and there
                      exists the possibility of loss of capital.<br /><br /> By using or
                      accessing the Platform, you agree that no developer,
                      community member, or individual or entity involved in
                      creating, deploying, or maintaining the Platform will be
                      liable for any claims or damages whatsoever associated
                      with your use, inability to use, or your interaction with
                      other users of, the Platform, including any direct,
                      indirect, incidental, special, exemplary, punitive or
                      consequential damages, or loss of profits,
                      cryptocurrencies, tokens, or anything else of value. By
                      using or accessing this Platform, you represent that you
                      are not subject to sanction or otherwise designated on any
                      list of prohibited restricted parties or excluded or
                      denied person, including but not limited to the lists
                      maintained by the United States’ Department of Treasury’s
                      Office of Foreign Assets Control (OFAC), United Nations
                      Security Council, the European Union or its Member States,
                      or any other government authority.
                    </p>
                  </div>
                  <div>
                    <Checkbox onChange={onChange}>I AGREE & UNDERSTAND</Checkbox>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button" 
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-blue-900   focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>handleProcced()}
                    >
                      PROCEED
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
