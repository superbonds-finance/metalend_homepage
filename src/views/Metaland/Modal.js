import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import "./index.css"
import {RiCloseCircleLine} from "react-icons/ri"
import {ModalWrapper} from "./style"

export default function Modal({openModal,closeModal,isOpen}) {
 
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center py-10 px-10">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="select-none   relative transform overflow-hidden rounded-2xl  modal-container p-6 text-left align-middle shadow-xl transition-all" style={{width:'611px' , maxWidth:'611px'}} >
                  <RiCloseCircleLine className='text-4xl absolute  top-1 right-1 z-10 cursor-pointer'   onClick={closeModal}/>
                  <div className='w-full flex flex-col items-center'>
                    <text className='text-5xl tracking-wide font-semibold header-modal'>Stay Tuned</text>
                    <text className='text-4xl tracking-wide font-semibold mt-4 header-modal'>we're <span className='font-bold launch-text'>launching</span>  soon</text>
                  </div>
                  
                 
                  <ModalWrapper className="flex flex-col justify-center mt-3 input-div items-center">
                  
                    <input  className='block p-4 w-9/12  placeholder-white font-semibold bg-gray-200 rounded-lg  border-gray-300 sm:text-md     dark:bg-gray-700  outline-none text-white ' type="email" placeholder='Enter your email address'/>
                    <button
                      type="button "
                      className="modal-button mt-5"
                      onClick={closeModal}
                    >
                      <span className='text-xl'>Notify Me</span> 
                    </button>
{/* 
                    <div className='flex gap-6 mt-10'>
                        <img src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1658653499/akar-icons_twitter-fill_vkn6xc.svg" alt='twitter' className='w-8'/>
                        <img src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1658653480/akar-icons_discord-fill_ewmxlp.svg" alt='dicsord' className='w-8'/>
                        <img src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1658653480/akar-icons_twitter-fill_gaaszb.png" alt='telegram' className='w-8'/>
                    </div> */}
                  </ModalWrapper>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
