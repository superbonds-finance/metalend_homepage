import React, { useRef } from "react";
import { CloseButton, ModalWrapper } from "./buy-sb.styled";
import { useOutsideClick } from "./UseOutsideClick";
import { DropDown } from "./helper";

interface ModalTypes {
  setShowModal: (e: string) => void,
  showModal: string,
  setInputState: (e: { label: string, seconadaryLabel: string, id: number }) => void,
}

export default function Modal({ setShowModal, showModal, setInputState }: ModalTypes) {

  const dropDownRef = useRef(null);
  useOutsideClick(dropDownRef, () => setShowModal(''));

  return (
    <>
      {showModal ? (
        <>
          <ModalWrapper

            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
          >
            <div ref={dropDownRef} className="relative w-auto my-6 sm:my-0 mx-auto max-w-md sm:max-w-full">
              {/*content*/}
              <div className="flex flex-col relative w-full h-full overflow-hidden text-left bg-gray-200 rounded-lg style1">
                <CloseButton onClick={() => setShowModal('')}>×</CloseButton>
                {/* <div className="flex pt-3 px-5 style2">
                  <div className="flex items-center text-black text-white fill-current">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="inherit" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.30327 14.6058C8.75327 14.6074 10.1705 14.1746 11.3729 13.3637L15.5971 17.5871C16.1463 18.1371 17.0377 18.1371 17.5877 17.5871C18.1377 17.0371 18.1377 16.1457 17.5877 15.5964L13.3643 11.3722C14.5823 9.55661 14.9229 7.28943 14.2909 5.19563C13.6596 3.10183 12.1229 1.40183 10.1033 0.56283C8.08365 -0.276231 5.79385 -0.16607 3.86505 0.86283C1.93537 1.89251 0.569053 3.73243 0.140853 5.87683C-0.286487 8.02143 0.269759 10.2448 1.65725 11.9354C3.04397 13.6261 5.11665 14.6064 7.30325 14.6058H7.30327ZM7.30327 1.68943C8.79233 1.68865 10.2197 2.28005 11.2729 3.33319C12.3252 4.38631 12.9166 5.81359 12.9166 7.30279C12.9166 8.79199 12.3252 10.2192 11.2729 11.2724C10.2198 12.3247 8.79247 12.9162 7.30327 12.9162C5.81407 12.9162 4.38687 12.3247 3.33367 11.2724C2.28133 10.2193 1.68913 8.79199 1.68991 7.30279C1.69148 5.81451 2.28287 4.38719 3.33523 3.33479C4.38759 2.28239 5.81483 1.69103 7.30323 1.68947L7.30327 1.68943Z" fill="inherit" fill-opacity="0.25">
                      </path>
                    </svg>
                  </div>
                  <input autoComplete="off" className="w-[70%] ml-4 truncate bg-transparent text-white" placeholder="Search by token or paste address" name="searchValue" />
                  <div className="absolute px-3 py-2 text-xs font-semibold rounded cursor-pointer focus:bg-red-100 right-4 top-8 md:right-4 md:top-7 bg-input-light bg-black-25 text-white-50 text-black-50">Esc</div>
                </div> */}
                {/* <div className="hidden md:flex flex-wrap pt-4 pb-2 px-5 border-b border-input-light border-white-25">
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style3">
                        <span className="style4">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style5"
                        </span>
                        <img alt="USDC" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style6"
                      </span>
                      <span className="text-xs">USDC</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style7">
                        <span className="style8">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style9"
                        </span>
                        <img alt="SOL" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style10"
                      </span>
                      <span className="text-xs">SOL</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style11">
                        <span className="style12">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style13"
                        </span>
                        <img alt="USDT" srcset="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg 1x, https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg 2x" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg" decoding="async" data-nimg="intrinsic" className="rounded-full style14"
                      </span>
                      <span className="text-xs">USDT</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style15">
                        <span className="style16">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style17"
                        </span>
                        <img alt="mSOL" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FmSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FmSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FmSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style18"
                      </span>
                      <span className="text-xs">mSOL</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style19">
                        <span className="style20">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style21"
                        </span>
                        <img alt="ETH" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style22"
                      </span>
                      <span className="text-xs">ETH</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style23">
                        <span className="style24">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style25"
                        </span>
                        <img alt="RAY" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style26"
                      </span>
                      <span className="text-xs">RAY</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style27">
                        <span className="style28">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style29"
                        </span>
                        <img alt="stSOL" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style30"
                      </span>
                      <span className="text-xs">stSOL</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style31">
                        <span className="style32">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style33"
                        </span>
                        <img alt="BTC" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style34"
                      </span>
                      <span className="text-xs">BTC</span>
                    </div>
                  </div>
                </div>
                <div className="flex md:hidden flex-wrap pt-4 pb-2 px-5 border-b border-input-light border-white-25">
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style35">
                        <span className="style36">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style37"
                        </span>
                        <img alt="USDC" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style38"
                      </span>
                      <span className="text-xs">USDC</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style39">
                        <span className="style40">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style41"
                        </span>
                        <img alt="SOL" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style42"
                      </span>
                      <span className="text-xs">SOL</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style43">
                        <span className="style44">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style45"
                        </span>
                        <img alt="USDT" srcset="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg 1x, https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg 2x" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg" decoding="async" data-nimg="intrinsic" className="rounded-full style46"
                      </span>
                      <span className="text-xs">USDT</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style47">
                        <span className="style48">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style49"
                        </span>
                        <img alt="mSOL" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FmSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FmSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FmSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style50"
                      </span>
                      <span className="text-xs">mSOL</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style51">
                        <span className="style52">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style53"
                        </span>
                        <img alt="ETH" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style54"
                      </span>
                      <span className="text-xs">ETH</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="invisible absolute rounded shadow-lg py-1 px-2 -mt-8 flex justify-center items-center text-center bg-white text-black">
                      <div className="text-xs">Route not available</div>
                    </div>
                    <div className="flex mr-2 mb-1 items-center space-x-2 py-2 px-3 bg-transparent cursor-pointer bg-bg-grey hover:bg-opacity-50 bg-transparent hover:bg-white-10 rounded-lg border border-[#E4E9EE] border-white-10 text-white font-semibold" translate="no">
                      <span className="style55">
                        <span className="style56">
                          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e style57"
                        </span>
                        <img alt="RAY" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style58"
                      </span>
                      <span className="text-xs">RAY</span>
                    </div>
                  </div>
                </div> */}
                <div className="mt-2 style59">
                  <div className="style60">
                    <div className="overflow-y-scroll mr-1 min-h-[12rem] px-5 style61">
                      <div className="style62">
                        {DropDown.map(({ label, seconadaryLabel, id }, index) => (
                          <li onClick={() => { setInputState({ label, seconadaryLabel, id }); setShowModal(''); }} key={'coin' + index} className="bg-gradient rounded py-4 cursor-pointer px-5 list-none bg-input-light bg-transparent style63" style={{ top: `${72 * index}px` }} translate="no">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 -mt-1">
                                <div className="h-6 w-6 bg-gray-200 rounded-full">
                                  <span className="style64">
                                    <span className="style65">
                                      {/* <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2732%27%20height=%2732%27/%3e style66"*/}
                                      <img
                                        className="rounded-full"
                                        src={require(`../../assets/coinType/logo${index + 1}.jpg`)}
                                        alt="..."
                                      />
                                    </span>
                                    {/* <img alt="soALEPH" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FCsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FCsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K%2Flogo.png&amp;w=64&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FCsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K%2Flogo.png&amp;w=64&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full style67"*/}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{label}</p>
                                <p className="text-sm text-white-50 truncate">{seconadaryLabel}</p>
                              </div>
                              <div className="text-xs text-white-50 text-right">
                                <p>
                                </p>
                                <p>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="resize-triggers">
                    <div className="expand-trigger">
                      <div className="style113" >
                      </div>
                    </div>
                    <div className="contract-trigger">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalWrapper>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">

          </div>
        </>
      ) : null}
    </>
  );
}
