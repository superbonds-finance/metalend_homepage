import React, { Fragment, useState, useEffect } from "react";
// import { Popover } from "antd";
// import { Settings } from "../Settings";
// import { LABELS } from "../../constants";
import { useWallet } from "@solana/wallet-adapter-react";
import { useHistory,Link } from "react-router-dom";
import { TextDoc } from "../Navbar/navbar-styled";
// import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import "./index.css";
import { useLocation } from "react-router-dom";
import { BtnText } from "../../views/home/home.styled";
import { FiArrowUpRight } from "react-icons/fi";
import { Wrapper } from "./styled";
import { IoIosArrowForward } from "react-icons/io";
import { Menu, Transition } from "@headlessui/react";

export default function NavbarNew(props: {
  left?: JSX.Element;
  right?: JSX.Element;
  showWinUp?: boolean;
}) {
  const history = useHistory();
  const { connected } = useWallet();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const handlePush = (route: string) => {
    history.push(route);
  };

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const Links = (
    <>
      <div className="flex md:flex-col">
        <div className="flex justify-between" style={{ height: "38px" }}>
          <button
            onClick={() =>
              window.open(
                "https://res.cloudinary.com/drr1rnoxf/image/upload/v1649780638/SuperBonds_Audit_Report_caey88.pdf"
              )
            }
            className="hover:bg-green-100  text-white hover:text-black mr-2 border-2 z-40  rounded-md border-green-100 px-5 md:px-3 sm:px-2 py-1 inline-block ml-3"
          >
            <TextDoc transform="" className="" size="16px" weight="true">
              Audit Report
            </TextDoc>
          </button>

          <button
            onClick={() => handlePush("/trade")}
            className="hover:bg-green-100 text-white hover:text-black mr-2 border-2 z-40  rounded-md border-green-100 px-4 md:px-3 sm:px-2 py-0 inline-block ml-3"
          >
            <TextDoc transform="" className="" size="16px" weight="true">
              Launch App
            </TextDoc>
          </button>
        </div>
        <div className="mx-auto py-2 sm:pt-6">
          <a
            href="https://twitter.com/SBonds_Finance"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-twitter fa-lg px-2 z-50" />
          </a>
          <a
            href="https://t.me/SuperBonds"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-telegram fa-lg px-2 z-50" />
          </a>
          <a
            href="https://discord.gg/yCWKEcxKAe"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-discord fa-lg px-2 z-50" />
          </a>
          <a
            href="https://superbonds.medium.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fab fa-medium fa-lg px-2 z-50" />
          </a>
        </div>
      </div>
    </>
  );

  return (
    <Wrapper className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header cursor-pointer">
        <div className="nav-title pl-4" onClick={() => handlePush("/")}>
          <img
            className="inline-block w-52"
            src={
              "https://res.cloudinary.com/drr1rnoxf/image/upload/v1656163543/ss_logo_jwymfz.svg"
            }
            alt="SuperStable"
          />
        </div>
      </div>

       
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div
        className={
          "nav-links  text-center" + (props.showWinUp ? " space_top" : "")
        }
      >
        {path === "/" || path === "/fd"|| path=== "/sb" ?  (
          <>
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button>
                      <button
                        className={`${
                          open ? "menu-button-hover menu-button" : "menu-button"
                        }   nav-title`}
                      >
                        <span className="text-sm tracking-wide menu-options-text">
                          PRODUCT
                        </span>
                      </button>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute  mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-120 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                           <Link to='/fd' target={"_blank"}>
                           <button
                            
                             
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }  menu-options flex justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text">Fixed Deposits</text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                             <Link to='/sb' target={"_blank"}>
                            <button
                              onClick={() => history.push("/sb")}
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }   flex menu-options justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text">SB Token </text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                       
                       
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button>
                      <button
                        className={`${
                          open ? "menu-button-hover menu-button" : "menu-button"
                        }   nav-title`}
                      >
                        <span className="text-sm tracking-wide menu-options-text">
                          DEVELOPERS
                        </span>
                      </button>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute  mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-120 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                window.open(
                                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1649780638/SuperBonds_Audit_Report_caey88.pdf"
                                )
                              }
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }   flex  menu-options justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text"> Audit Report </text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                window.open(
                                  "https://superbonds.gitbook.io/superbonds/"
                                )
                              }
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }   flex  menu-options justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text"> Gitbook </text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button>
                      <button
                        className={`${
                          open ? "menu-button-hover menu-button" : "menu-button"
                        }   nav-title`}
                      >
                        <span className="text-sm tracking-wide menu-options-text">
                          COMMUNITY
                        </span>
                      </button>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute  mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-120 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                window.open(
                                  "https://twitter.com/SBonds_Finance"
                                )
                              }
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }   flex  justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text"> Twitter </text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                window.open("https://t.me/SuperBonds")
                              }
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }   flex  justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text"> Telegram </text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                window.open("https://discord.gg/yCWKEcxKAe")
                              }
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }   flex  justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text"> Discord </text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      </div>{" "}
                      <div className="px-1 py-1" style={{ borderTop: "none" }}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                window.open("https://superbonds.medium.com/")
                              }
                              className={`${
                                active
                                  ? "bg-gray-130 text-white"
                                  : "text-gray-110"
                              }   flex  justify-between w-full items-center rounded-md px-2 py-3 text-sm`}
                            >
                              <text className="menu-text"> Medium </text>
                              {active ? (
                                <IoIosArrowForward
                                  className="text-green-100 text-xl"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IoIosArrowForward
                                  className="text-green-100 hidden"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            <button
              className={
                  "nav-title coming-soon-btn"
              }
             
            >
              <span className="text-sm tracking-wide">GOVERNANCE</span>
              <span className="tracking-wide nav-sub-title">COMING SOON</span>
            </button>

            <button
              onClick={() => history.push("/trade")}
              style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
              className="grow  button-hover-change btn-hover-width w-40 z-40 rounded-md px-2 py-2 inline-block text-center"
            >
              <BtnText
                transform
                size="16px"
                weight="true"
                color="black"
                height="21px"
              >
                Launch App
                <FiArrowUpRight />
              </BtnText>
              {/* <img  className=' mt-0.5' src={arrow}  /> */}
            </button>
            {/* {connected && (
              <button
                className={
                  path === "/myaccount"
                    ? "bg-gray-300 mr-2 text-white rounded-md"
                    : ""
                }
                onClick={() => handlePush("/myaccount")}
              >
                <span className="text-sm tracking-wide">My Account</span>
              </button>
            )} */}

            {/*}<Popover
          placement="topRight"
          content={<AdminNav />}
          trigger="click"
        >
          <button className=""><span className="text-sm tracking-wide">Admin</span></button>
        </Popover>*/}
            {/* <WalletMultiButton type="primary" /> */}
            {/* {connected ? <WalletDisconnectButton className="ml-2" type="ghost" /> : null} */}
            {/* <Popover
              placement="topRight"
              title={LABELS.SETTINGS_TOOLTIP}
              content={<Settings />}
              trigger="click"
            >
              <i className="fas fa-cog fa-lg text-gray-600 cursor-pointer ml-2 mt-1 md:mt-4" />
            </Popover> */}
          </>
        ):
        (
          <div className="nav-links-outer-nav">{Links}</div>
        ) 
        }
      </div>
    
    </Wrapper>
  );
}
