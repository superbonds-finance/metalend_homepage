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
    <button
      onClick={() =>
        window.open(
          "https://res.cloudinary.com/drr1rnoxf/image/upload/v1642360290/SB_Whitepaper-compressed_lafdtl.pdf"
          )
      }
      className="hover:bg-green-100  text-white hover:text-black mr-2 border-2 z-40  rounded-md border-green-100 px-5 md:px-3 sm:px-2 py-1 inline-block ml-3"
    >
      <TextDoc transform="" className="" size="16px" weight="true">
        Whitepaper
      </TextDoc>
    </button>
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
  </>);

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header cursor-pointer">
        <div className="nav-title"  onClick={() => handlePush("/")}>
          <img
            className="inline-block w-52"
            src={
              "https://res.cloudinary.com/drr1rnoxf/image/upload/v1648553250/Logo_with-text_lqvart.png"
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


      <div className={"nav-links" + (props.showWinUp? ' space_top':'')}>

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
                path == "/stake" ? "bg-gray-300  text-white rounded-md" : ""
              }
              onClick={() => handlePush("/stake")}
            >
              <span className="text-sm tracking-wide">SB-Staking</span>
            </button>
            {/* <button className={path=="/tge"?"bg-gray-300  text-white rounded-md":''} onClick={()=>handlePush('/tge')}><span className="text-sm tracking-wide">TGE</span></button>
          <button className={path=="/claimNFT"?"bg-gray-300  text-white rounded-md":''} onClick={()=>handlePush('/claimNFT')}><span className="text-sm tracking-wide">Claim NFT</span></button> */}
            <button
              className={
                path == "/platform" ? "bg-gray-300  text-white rounded-md" : ""
              }
              onClick={() => handlePush("/platform")}
            >
              <span className="text-sm tracking-wide">Platform Stats</span>
            </button>
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
              <i className="fas fa-cog fa-lg text-gray-600 cursor-pointer ml-2 mt-1" />
            </Popover>
          </>
        )}

        <div className="flex flex-wrap justify-center">
          <div className="flex offer_wrapper_mobile lg:w-8/12 md:w-8/12 sm:w-10/12 xs:w-full">
            <div className="rounded-md w-full z-50">
              <div className="offer_wrapper_1_mobile flex flex-col text-center neon-bottom-card selected-box-neon rounded-md">
              <div className="flex justify-center w-9/12 my-0 mx-auto">
              {/* <img
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643874041/ambassador_illustration_2_uncu3e.svg"
                }
                alt="..."
                style={{ width: "65px", height: "60px" }}
              /> */}
               <NewText
              color="white"
              size="24px"
              transform=""
              className=" mt-2 select-none font-bold text-white "
            >
              Become an <span style={{ color: "#01A0FC" }}>S</span>
              <span style={{ color: "#7CFA4C" }}>B</span> Ambassador
            </NewText>
            </div>

            <div className="flex justify-center">

              <button
                onClick={() =>
                  window.open(
                    "https://superbonds.medium.com/the-ambassador-program-from-superbonds-8d11f5063bac"
                  )
                }
                className="hover:bg-green-100 text-white hover:text-black  border-2 z-40 w-36 rounded-md border-green-100 px-2 py-2 inline-block"
                style={{ marginTop: "18px" }}
              >
                <TextDoc transform="" className="" size="16px" weight="true">
                  Join Now
                </TextDoc>
              </button>
            </div>
              </div>
            </div>
          </div>
          <div className="flex trade_sb_token_wrapper_mobile lg:w-8/12 md:w-8/12 sm:w-10/12 xs:w-full">
        <div className="rounded-md z-50">
          <div className="trade_sb_token_wrapper_1_mobile flex flex-col justify-start ">
            <Text
              color="#586779"
              size="16px"
              weight="true"
              transform="true"
              className="my-0 mt-3 select-none"
            >
              Trade SB token
            </Text>
            <div className="flex flex-col justify-start">
              <img
                onClick={() =>
                  window.open("https://www.mexc.com/exchange/SB_USDT")
                }
                className="w-36 my-0  select-none mr-12 cursor-pointer Z-40  mt-3 left-auto right-auto"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366156/full-logo-normal-mexc_cllivy.svg"
                }
                alt="..."
              />
              <img
                onClick={() =>
                  window.open(
                    "https://dex.raydium.io/#/market/E3cNotFPoECwQvacT2D7u3C3tKRkGtUxv8WFYazBEx4X"
                  )
                }
                className="w-36 select-none my-0  mr-12 cursor-pointer mt-3 Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366716/logo-text.cf5a7a0_lx0ueg.svg"
                }
                alt="..."
              />
              <div className="flex my-0 ">
                <img
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="w-8 mt-3 select-none cursor-pointer Z-40"
                  src={
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366783/jupiter-logo_vi90us.svg"
                  }
                  alt="..."
                />

                <Text
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="mx-1 mt-4 cursor-pointer Z-40 select-none '"
                  size="16px"
                  weight="true"
                >
                  Jupiter
                </Text>
              </div>
            </div>
          </div>

          <div className="trade_sb_token_wrapper_1_mobile flex flex-col  justify-start ">
            <Text
              color="#586779"
              size="16px"
              weight="true"
              transform="true"
              className="my-0 select-none"
            >
              Track markets
            </Text>
            <div className="flex flex-col justify-start">
              <img
                onClick={() =>
                  window.open("https://www.coingecko.com/en/coins/superbonds")
                }
                className="w-32 select-none  -ml-1 my-0  mr-10 mt-3 cursor-pointer Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643368369/coingecko-logo-white-3f2aeb48e13428b7199395259dbb96280bf47ea05b2940ef7d3e87c61e4d8408_jlbfa3.png"
                }
                alt="..."
              />
              <img
                onClick={() =>
                  window.open(
                    "https://coinmarketcap.com/currencies/superbonds/"
                  )
                }
                className="w-40 select-none my-0  mr-12 mt-3 cursor-pointer Z-40 "
                src={
                  "https://s2.coinmarketcap.com/static/cloud/img/coinmarketcap_white_1.svg?_=4c6dced"
                }
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>


        </div>

      </div>
    </div>
  );
}
