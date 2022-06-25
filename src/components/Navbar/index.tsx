import React, { useState, useEffect } from "react";
// import superBsvg from "../../assets/superB.svg";
// import settingsvg from "../../assets/setting.svg";
import { /* Button,  */Popover } from "antd";
import { Settings } from "../Settings";
import { LABELS } from "../../constants";
import { useWallet } from "@solana/wallet-adapter-react";
import { /* Link,  */useHistory } from "react-router-dom";
// import { AdminNav } from "../AppBar/admin";
import { TextDoc,NewText } from "./navbar-styled";
import {
  // WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-ant-design";
import "./index.css";
import { useLocation } from "react-router-dom";
// import { linkSync } from "fs";
import { Text/* , BtnText  */} from "../../views/home/home.styled";
// import bgimage from "../../assets/bg.png";

export default function Navbar(props: {
  left?: JSX.Element,
  right?: JSX.Element,
  showWinUp?: boolean
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

  const Links = (<>
  <div className="flex md:flex-col">
    <div className="flex justify-between" style={{height: '38px'}}>
      <button
          onClick={() =>
            window.open("https://res.cloudinary.com/drr1rnoxf/image/upload/v1649780638/SuperBonds_Audit_Report_caey88.pdf")
          }
        className="hover:bg-green-100  text-white hover:text-black mr-2 border-2 z-40  rounded-md border-green-100 px-5 md:px-3 sm:px-2 py-1 inline-block ml-3"
      >
        <TextDoc transform="" className="" size="16px" weight="true">
          Audit Report
        </TextDoc>
      </button>


      <button

         onClick={() =>
          handlePush("/trade")
        }
        className="hover:bg-green-100 text-white hover:text-black mr-2 border-2 z-40  rounded-md border-green-100 px-4 md:px-3 sm:px-2 py-0 inline-block ml-3"
      >
        <TextDoc transform="" className="" size="16px" weight="true">
          Launch App
        </TextDoc>
      </button>
    </div>
    <div className='mx-auto py-2 sm:pt-6'>
      <a href="https://twitter.com/SBonds_Finance" target="_blank">
        <i className="fab fa-twitter fa-lg px-2 z-50" />
      </a>
      <a href="https://t.me/SuperBonds" target="_blank">
        <i className="fab fa-telegram fa-lg px-2 z-50" />
      </a>
      <a href="https://discord.gg/yCWKEcxKAe" target="_blank">
        <i className="fab fa-discord fa-lg px-2 z-50" />
      </a>
      <a href="https://superbonds.medium.com/" target="_blank">
        <i className="fab fa-medium fa-lg px-2 z-50" />
      </a>
    </div>
  </div>

  </>);

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header cursor-pointer">
        <div className="nav-title"  onClick={() => handlePush("/")}>
          <img
            className="inline-block w-52"
            src={
              "https://res.cloudinary.com/drr1rnoxf/image/upload/v1656163543/ss_logo_jwymfz.svg"
            }
            alt="SuperB"
          />

        </div>
      </div>

      {path == "/" && <div className="nav-links-outer">
        <div>
          {Links}
        </div>
      </div>}

      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>


      <div className={"nav-links  text-center" + (props.showWinUp? ' space_top':'')}>

      {path == "/" ?  (
        <div className="nav-links-outer-nav">
        {Links}
      </div>
      ):(
          <>
            <button
              className={
                path == "/trade" ? "bg-gray-300  text-white rounded-md" : ""
              }
              onClick={() => handlePush("/trade")}
            >
              <span className="text-sm tracking-wide">Trade</span>
            </button>
           
            <button
              className={
                path == "/liquidity" ? "bg-gray-300  text-white rounded-md" : ""
              }
              onClick={() => handlePush("/liquidity")}
            >
              <span className="text-sm tracking-wide">Liquidity</span>
            </button>
            <button
              className={
                path == "/buy-SB" ? "bg-gray-300  text-white rounded-md" : ""
              }
              onClick={() => handlePush("/buy-SB")}
            >
              <span className="text-sm tracking-wide">Buy-SB</span>
            </button>
            <button
              className={
                path == "/stake" ? "bg-gray-300  text-white rounded-md" : ""
              }
              onClick={() => handlePush("/stake")}
            >
              <span className="text-sm tracking-wide">Stake-SB</span>
            </button>
            {/* <button className={path=="/tge"?"bg-gray-300  text-white rounded-md":''} onClick={()=>handlePush('/tge')}><span className="text-sm tracking-wide">TGE</span></button>
          <button className={path=="/claimNFT"?"bg-gray-300  text-white rounded-md":''} onClick={()=>handlePush('/claimNFT')}><span className="text-sm tracking-wide">Claim NFT</span></button> */}
            {/* <button
              className={
                path == "/platform" ? "bg-gray-300  text-white rounded-md" : ""
              }
              onClick={() => handlePush("/platform")}
            >
              <span className="text-sm tracking-wide">Platform Stats</span>
            </button> */}
            {connected && (
              <button
                className={
                  path == "/myaccount"
                    ? "bg-gray-300 mr-2 text-white rounded-md"
                    : ""
                }
                onClick={() => handlePush("/myaccount")}
              >
                <span className="text-sm tracking-wide">My Account</span>
              </button>
            )}

            {/*}<Popover
          placement="topRight"
          content={<AdminNav />}
          trigger="click"
        >
          <button className=""><span className="text-sm tracking-wide">Admin</span></button>
        </Popover>*/}
            <WalletMultiButton type="primary" />
            {/* {connected ? <WalletDisconnectButton className="ml-2" type="ghost" /> : null} */}
            <Popover
              placement="topRight"
              title={LABELS.SETTINGS_TOOLTIP}
              content={<Settings />}
              trigger="click"
            >
              <i className="fas fa-cog fa-lg text-gray-600 cursor-pointer ml-2 mt-1 md:mt-4" />
            </Popover>
          </>
        )}

      </div>
    </div>
  );
}
