import React/* , {useState,useEffect} */ from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Link ,useHistory} from "react-router-dom";
import {/* TextDoc,Text, */NewText,Bold,TextDoc,NewButtonText} from "./navbar-styled";
// import {
//   WalletDisconnectButton,
//   WalletMultiButton,
// } from "@solana/wallet-adapter-ant-design";
import "./subheader.css";
// import { useLocation } from 'react-router-dom';
// import { linkSync } from "fs";

export default function SunNavbar(props: { left?: JSX.Element; right?: JSX.Element, showWinUp?: boolean }) {
  // const history = useHistory();
  // const { connected } = useWallet();
  // const location = useLocation();
  // const [path,setPath]=useState(location.pathname)


  return props.showWinUp ? (
    <div className="sub_nav lg:py-2">
      <div className='flex justify-around lg:flex-wrap lg:justify-center'>

        <div className='flex justify-center items-center py-1.5 lg:py-2'>
          <img  src='https://www.orca.so/static/media/logomark.1ef55f8f.svg' alt='...' className="w-11 mr-2 lg:hidden" />
          <NewText
              color='white'
              weight="true"
              transform=""
              className="my-0 select-none"
            >
             Dual rewards for SB/USDC pool
          </NewText>
          <button
                onClick={() => window.open("https://www.orca.so/pools?pool=sb/usdc")}
                className="ml-5 sm:ml-2 bg-green-100 text-black   border-2 z-40 w-28 rounded-md px-1 py-1.5 inline-block"
                
              >
                <NewButtonText transform="" className="" size="18px" weight="true">
                  Join Now
                </NewButtonText>
             
              </button>

            {/* <button onClick={() => window.open("https://www.orca.so/pools?pool=sb/usdc")} className="hover:bg-black  hover:text-white text-black  ml-5 border-2 z-40 w-44 xl:w-36 whitespace-nowrap rounded-xl border-black px-2 py-2 inline-block lg:mt-2">
                <NewText transform="" className='font-bold tracking-wide' size="16px" weight="true">
                  Become LP
                </NewText>
            </button> */}
            <img  src='https://www.orca.so/static/media/logomark.1ef55f8f.svg' alt='...' className="w-11 lg:hidden ml-2" />
        </div>
      
{/* 
        <div className='flex justify-center items-center lg:py-2'>
            <img  src='https://res.cloudinary.com/drr1rnoxf/image/upload/v1643731097/white_arrow_vian3p.svg' alt='...' className="w-16 lg:hidden" />
            <NewText
                color=''
                weight="true"
                transform=""
                className="my-0 select-none"
              >
                Win up to <Bold weight="true" className="font-extrabold" style={{fontWeight:"bold"}}> $20,000 </Bold> by trading SB 
            </NewText>
            <button
                onClick={() => window.open("https://superbonds.medium.com/superbonds-trading-competition-32d193de3bf8")}
                className="ml-5 sm:ml-2 bg-green-100 text-black  border-2 z-40 w-28 rounded-md  px-1  py-1.5 inline-block"
                
              >
                <NewButtonText transform="" className="" size="18px" weight="true">
                Start Now
                </NewButtonText>
              </button>
 
            <img  src='https://res.cloudinary.com/drr1rnoxf/image/upload/v1643731097/white_arrow_vian3p.svg' alt='...' className="w-16 lg:hidden ml-2" />
        </div> */}
      
        </div>
    </div>
  ) : null;
}
