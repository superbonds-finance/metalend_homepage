import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { Text, TextDoc, BtnText, NewText ,NumberText,CalibariText,Jupiter,CardText} from "./home.styled";
// import { Tooltip } from 'antd';
import bgimage from "../../assets/bg.png";
import "./home.css";

import { useWallet } from "@solana/wallet-adapter-react";

import { useConnection } from "../../contexts/connection"
import {
    POOL_30_ADDRESS,
    POOL_90_ADDRESS,
    PLATFORM_DATA_ACCOUNT,
  } from "../../utils/ids";
import {POOL_DATA_LAYOUT,PoolDataLayout} from "../../utils/pool_data_layout";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import BN from "bn.js";
import {
  formatNumberWithoutRounding,
 } from "../../utils/utils";
import '../../styles/trade.css';
import axios from 'axios';
import {AxiosResponse} from 'axios';
 

export const HomeView = () => {
  const history = useHistory();

  const handlePush = (route: string) => {
    history.push(route);
  };

  const wallet = useWallet();

  const connection = useConnection();
    // const wallet = useWallet();
    //const [loaded,setLoaded] = useState(false);

    const [data30pool,setData30pool] = useState<any>();
    const [data90pool,setData90pool] = useState<any>();

    const [showAllTrade,setAllTrade]=useState<number>(2);


    const [bond_yield30,setBond_Yield30] = useState(0);
    const [adjustedLiquidity30,setAdjustedLiquidity30] = useState(0);
    const [tradeLiquidityAvailability30,setTradeLiquidityAvailability30] = useState(0);


    const [bond_yield90,setBond_Yield90] = useState(0);
    const [adjustedLiquidity90,setAdjustedLiquidity90] = useState(0);
    const [tradeLiquidityAvailability90,setTradeLiquidityAvailability90] = useState(0);



    const onShowAllTrades = async (_type:number) =>{
      setAllTrade(_type);
    };

    useEffect(() => {
      readPoolData_30();
      readPoolData_90();
      getStakingPoolData();
      onShowAllTrades(2);
      // getAllBalances();
    }, [wallet]);

    useEffect(() => {
      //if (!wallet.publicKey) return;
      if (data30pool) {
        setAdjustedLiquidity30(new BN(data30pool.adjustedLiquidity, 10, "le").toNumber()/1000000);
        setTradeLiquidityAvailability30(data30pool.trade_liquidity_availability/10000);
        //console.log(data30pool.trade_liquidity_availability,new BN(data30pool.adjustedLiquidity, 10, "le").toNumber()/1000000);
      }
      if (data90pool) {

        setAdjustedLiquidity90(new BN(data90pool.adjustedLiquidity, 10, "le").toNumber()/1000000);
        setTradeLiquidityAvailability90(data90pool.trade_liquidity_availability/10000);
        //console.log(data90pool.trade_liquidity_availability);
      }
    }, [data30pool,data90pool]);

    const readPoolData_30 = async () => {
      // if ( !wallet){
      //   notify({
      //     message: 'Please connect to Sol network',
      //     type: "error",
      //   });
      //   return;
      // }
      // if (!wallet.publicKey){
      //   notify({
      //     message: 'Please connect to Solana network',
      //     type: "error",
      //   });
      //   return;
      // }

      const encodedPoolDataState = (await connection.getAccountInfo(POOL_30_ADDRESS, 'singleGossip'))!.data;
      const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
       //console.log("asas",decodedPoolDataState)
      setData30pool(decodedPoolDataState);

    }
    const readPoolData_90 = async () => {
      // if ( !wallet){
      //   notify({
      //     message: 'Please connect to Sol network',
      //     type: "error",
      //   });
      //   return;
      // }
      // if (!wallet.publicKey){
      //   notify({
      //     message: 'Please connect to Solana network',
      //     type: "error",
      //   });
      //   return;
      // }

      const encodedPoolDataState = (await connection.getAccountInfo(POOL_90_ADDRESS, 'singleGossip'))!.data;
      const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
      setData90pool(decodedPoolDataState);

    }
    const getStakingPoolData = async () => {
      // if ( !wallet){
      //   notify({
      //     message: 'Please connect to Sol network',
      //     type: "error",
      //   });
      //   return;
      // }
      // let publicKey = wallet.publicKey;
      // if (!publicKey){
      //   notify({
      //     message: 'Please connect to Solana network',
      //     type: "error",
      //   });
      //   return;
      // }
      const encodedPoolDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
      const decodedPoolDataState = PLATFORM_DATA_LAYOUT.decode(encodedPoolDataState) as PlatformDataLayout;
      //console.log(decodedPoolDataState);
      let bond_yield = decodedPoolDataState.pool_yield_vector[0]/100;
      setBond_Yield30(bond_yield);
      bond_yield =  decodedPoolDataState.pool_yield_vector[1]/100;
      setBond_Yield90(bond_yield);

    }



    const fetchPublicAPI=async (limit:Number,offset:Number)=>{
      //Get All Trades
      try {
        const data = {limit,offset};
        const response:AxiosResponse<any> = await axios.post('https://api.superbonds.finance/getAllTrades',data);
        if(response.data.trades.length===0 && offset>0) {
          fetchPublicAPI(10,0)
          return;
        }
      } catch (error) {
        console.error(error);
      }
      //Get All Pending Redemptions
      // try {
      //   const data = {limit,offset};;
      //   const response:AxiosResponse<any> = await axios.post('https://api.superbonds.finance/getAllPendings',data);

      // } catch (error) {
      //   console.error(error);
      // }
    }

    const fetchPrivateAPI=async (limit:Number,offset:Number)=>{
      let publicKey = wallet.publicKey;
      if(publicKey){
        if(showAllTrade===2){
          try {
            const data = {limit,offset,trade_owner:publicKey.toString()};
            const response:AxiosResponse<any> = await axios.post('https://api.superbonds.finance/getTrades',data);
            if(response.data.trades.length===0 && offset>0) {
              fetchPrivateAPI(10,0)
              return;
            }

          } catch (error) {
            console.error(error);
          }
        }

        //Get My Pendings
        if(showAllTrade===3){
          try {
            const data = {limit,offset,owner:publicKey.toString()};
            const response:AxiosResponse<any> = await axios.post('https://api.superbonds.finance/getPendings',data);
            if(response.data.pendings.length===0 && offset>0) {
              fetchPrivateAPI(10,0);
              return;
            }

          } catch (error) {
            console.error(error);
          }
        }
      }
    }



    useEffect(()=>{
      let publicKey = wallet.publicKey;
      if(wallet && publicKey) fetchPrivateAPI(10,0)
    },[wallet])

    useEffect(()=>{
      fetchPublicAPI(10,0);
      fetchPrivateAPI(10,0);
    },[showAllTrade])





  return (
    <div className="w-screen h-screen  bg-black hero-section" >
      <div className="flex flex-col absolute trade_sb_token_wrapper">
         {/*Hero Section*/}
        {/* <div className="rounded-md max-w-xs  w-64 z-50">
          <div className="offer_wrapper_1 flex flex-col text-center rounded-md">
            <div className="flex justify-center w-9/12 my-0 mx-auto">
              
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
        </div> */}
        {/* <div className="rounded-md max-w-xs w-64 z-50 mt-3">
          <div className="trade_sb_token_wrapper_1 flex flex-col justify-start ">
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
                className=" my-0  select-none mr-12 cursor-pointer Z-40  mt-3 left-auto right-auto"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366156/full-logo-normal-mexc_cllivy.svg"
                }
                alt="..."
                style={{ height: "38px", width: "131px" }}
              />
              <img
                onClick={() =>
                  window.open(
                    "https://dex.raydium.io/#/market/E3cNotFPoECwQvacT2D7u3C3tKRkGtUxv8WFYazBEx4X"
                  )
                }
                className=" -ml-5 select-none my-0  mr-12 cursor-pointer mt-2 Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366716/logo-text.cf5a7a0_lx0ueg.svg"
                }
                alt="..."
                style={{ height: "38px", width: "176px" }}
              />

              <div className="flex my-0 mt-4">
                <img
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="w-8 select-none cursor-pointer Z-40"
                  src={
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366783/jupiter-logo_vi90us.svg"
                  }
                  alt="..."
                  style={{ height: "38px" }}
                />

                <Text
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="ml-2 mt-2 cursor-pointer Z-40 select-none '"
                  size="16px"
                  weight="true"
                >
                  Jupiter
                </Text>
              </div>
            </div>
          </div>

          <div className="trade_sb_token_wrapper_2 flex flex-col  justify-start ">
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
                className=" select-none  -ml-1 my-0  mr-10 mt-3 cursor-pointer Z-40  "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643368369/coingecko-logo-white-3f2aeb48e13428b7199395259dbb96280bf47ea05b2940ef7d3e87c61e4d8408_jlbfa3.png"
                }
                alt="..."
                style={{ height: "35px", width: "130px" }}
              />
              <img
                onClick={() =>
                  window.open(
                    "https://coinmarketcap.com/currencies/superbonds/"
                  )
                }
                className=" select-none my-0  mr-12 mt-3 cursor-pointer Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643903985/CoinMarketCap_tp16rh.png"
                }
                alt="..."
                style={{ height: "45px", width: "165px" }}
              />
            </div>
          </div>
        </div> */}

      </div>

      <div
        className="flex relative justify-center w-full p-0 m-0  h-4/5 bg-no-repeat bg-cover py-3 home-section"
        style={{ backgroundImage: `url(${bgimage})`,   }}
      >
        <div className="absolute md:hidden">
          <img
            src={
              "https://res.cloudinary.com/drr1rnoxf/image/upload/v1636998507/leftPolygon_kcbqsu.png"
            }
            alt=""
            style={{
              width: "500px",
              height: "600px",
              marginRight: "48vw",
              marginTop: "35vh",
              userSelect: "none",
            }}
          />
        </div>

        <div
          className="main-bg flex flex-col w-full h-full  text-center bg-no-repeat bg-center justify-center "
          style={{
            backgroundImage: `url(${"https://res.cloudinary.com/drr1rnoxf/image/upload/v1636998508/Polygon_qqqvbm.png"})`,
            backgroundSize: "contain",
          }}
        >
          <div className="pt-20">
           
              <div className="flex sm:flex-col justify-center  items-center mt-5 py-3">
                <div className='hex-height flex justify-center items-center h-16'  >
                  <NumberText className='ml-2' style={{marginTop:"1.4rem"}} transform="" size="33px"  color='#7CFA4C'>
                  18
                  </NumberText>
                  <NumberText  style={{marginTop:"1.4rem"}}  transform="" size="33px"  color='#7CFA4C'>
                  %
                  </NumberText>
                </div>
                <BtnText className='ml-2 sm:mt-0' transform="" size="20px" weight="true">
                  Fixed Yield in USDC. Guaranteed.
                </BtnText>
              </div> 
            
            <BtnText className="block -mt-4 " size="15px" weight="" style={{fontWeight:'500'}}>
              Additional rewards. Instant cash-outs.
            </BtnText>
            {/* <BtnText className="block mt-2" size="16px" weight="true">
              Instant Redemptions
            </BtnText> */}
            {/* <BtnText className="block   mt-2" size="16px" weight="true">
              Full Custody
            </BtnText> */}
          </div>
          <div className="flex justify-center mt-10 xl:mt-6">
            {/* <button
              onClick={() =>
                handlePush("/trade")
              }
              className="w-48  z-40 rounded-md bg-green-100 px-4 py-2 inline-block text-center"
            >
              <BtnText
                className=""
                transform=""
                size="16px"
                weight="true"
                color="black"
              >
                Launch Devnet
              </BtnText>
               
            </button> */}

            <button
              onClick={() =>
                handlePush("/trade")
              }
              className="w-48 z-40 rounded-md bg-green-100 px-4 py-2 inline-block text-center transform   hover:scale-105"
            >
              <BtnText
                className="transform transition hover:scale-105"
                transform=""
                size="16px"
                weight="true"
                color="black"
              >
                Launch App
              </BtnText>
              {/* <img  className=' mt-0.5' src={arrow}  /> */}
            </button>
            <button
              onClick={() =>
                window.open("https://superbonds.gitbook.io/superbonds/")
              }
              className="hover:bg-green-100  text-white hover:text-black  border-2 z-40 w-44 rounded-md border-green-100 px-4 py-2 inline-block ml-3"
            >
              <TextDoc transform="" className="" size="16px" weight="true">
                Docs
              </TextDoc>
            </button>
          </div>
          <div className="flex justify-center mt-5 xl:mt-3">
            <div className="home_widget w-96 flex flex-col items-center">
              <Text   className='text-center' size={"14px"} spacing={'0px'} >Total Bonds Available</Text>
              <NumberText className='text-center mt-2' size={"28px"} color={'#01A0FC'} style={{height:'25px'}}>
                <span ><strong>{(bond_yield90 || bond_yield30) ?
               formatNumberWithoutRounding.format(
                (bond_yield90 ? ((adjustedLiquidity90 * tradeLiquidityAvailability90 / (((1 + (bond_yield90/100))**(90/365)) - 1))/0.35) : 0) +
                (bond_yield30 ? ((adjustedLiquidity30 * tradeLiquidityAvailability30 / (((1 + (bond_yield30/100))**(30/365)) - 1))/0.35) : 0))
                :"0.00"}</strong></span> USDC</NumberText>
            </div>
          </div>

          <div className="flex justify-center mt-8">
              {/* <Text transform="" size="42px" weight="true">
                SuperBonds
              </Text> */}
              <img
                className=" "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1636998509/solana_ffxt3n.svg"
                }
                alt="..."
              />
            </div>
        </div>

        <div className="absolute md:hidden">
          <img
            src={
              "https://res.cloudinary.com/drr1rnoxf/image/upload/v1636998509/rightPolygon_pq5wrn.png"
            }
            alt=""
            style={{
              width: "400px",
              height: "400px",
              marginLeft: "46vw",
              marginTop: "-1vh",
              userSelect: "none",
            }}
          />
        </div>
      </div>
      <section className="sub_nav">
        <div className=' flex flex-wrap items-center justify-around w-9/12 mx-auto my-0 py-6  xl:w-full justify-center ' >
          <div className='  flex flex-col justify-center items-center  g:py-2'>
            <NewText
              color='white'
              weight="true"
              transform=""
              size='30px'
              className="my-0 select-none text-center"
              >
              Become an <span style={{ color: "#01A0FC" }}>S</span>
              <span style={{ color: "#7CFA4C" }}>B</span> Ambassador
            </NewText>
            <button
              onClick={() =>
                window.open("https://superbonds.medium.com/the-ambassador-program-from-superbonds-8d11f5063bac")
              }
              className="w-36 mt-5 z-40 rounded-md bg-green-100 px-4 py-2 inline-block text-center "
            >
              <BtnText
                className=" "
                transform=""
                size="16px"
                weight="true"
                color="black"
              >
                Join Now
              </BtnText>
              {/* <img  className=' mt-0.5' src={arrow}  /> */}
            </button>
          
          </div>
          
          <div className="vl" style={{borderLeft: '3px solid rgb(70 129 48)',height: '100px'}}></div>
          <div className='flex flex-col justify-center items-center  lg:py-2 z-50' >
            <NewText
              color='white'
              weight="true"
              transform=""
              size='30px'
              className="my-0 select-none"
              >
                Trade <span style={{ color: "#01A0FC" }}>S</span>
                <span style={{ color: "#7CFA4C" }}>B</span> Token
            </NewText>
            <div className="flex sm:flex-wrap sm:justify-content-center xs:flex-col mt-5 items-center">
              <img
                onClick={() =>
                  window.open("https://www.mexc.com/exchange/SB_USDT")
                }
                className=" my-0  select-none cursor-pointer Z-40   left-auto right-auto"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366156/full-logo-normal-mexc_cllivy.svg"
                }
                alt="..."
                style={{ height: "50px", width: "130px" }}
                      />
              <img
                onClick={() =>
                  window.open(
                    "https://dex.raydium.io/#/market/E3cNotFPoECwQvacT2D7u3C3tKRkGtUxv8WFYazBEx4X"
                  )
                }
                className="ml-2 select-none my-0  cursor-pointer   Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366716/logo-text.cf5a7a0_lx0ueg.svg"
                }
                alt="..."
                style={{ height: "38px", width: "150px" }}
              />
              <div className="flex my-0 ml-2  ">
                <img
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="w-8 select-none cursor-pointer Z-40"
                  src={ 
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366783/jupiter-logo_vi90us.svg"
                  }
                  alt="..."
                  style={{ height: "42px" }}
                />

                <Jupiter
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="ml-2 mt-2 cursor-pointer Z-40 select-none '"
                  size="14px"
                
                >
                  Jupiter
                </Jupiter>
              </div>
             </div>
            </div>
          </div>
        </section>
       
      {/* <section>
        <div className="flex flex-wrap items-center justify-around w-8/12 mt-5 mx-auto my-0 pt-5 2xl:w-11/12 xl:w-full justify-center">
        <div className="rounded-md max-w-xs z-50" >
            <div className="offer_wrapper_1 mt-3 flex flex-col text-center rounded-md" style={{minHeight:"214px",maxWidth:"216px"}}> 
              <div className="flex justify-center my-0 mx-auto">
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
              <div className="flex justify-center pt-5">
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
 
        
          <div className="trade_sb_token_wrapper_1 mt-3 rounded-md flex flex-col  items-center z-50 ">
            <Text
              color="#586779"
              size="16px"
              weight="true"
              transform="true"
              className="my-0 select-none"
            >
              Trade SB token
            </Text>
            <div className="flex flex-col justify-start">
              <img
                onClick={() =>
                  window.open("https://www.mexc.com/exchange/SB_USDT")
                }
                className=" my-0  select-none cursor-pointer Z-40  mt-3 left-auto right-auto"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366156/full-logo-normal-mexc_cllivy.svg"
                }
                alt="..."
                style={{ height: "38px", width: "131px" }}
              />
              <img
                onClick={() =>
                  window.open(
                    "https://dex.raydium.io/#/market/E3cNotFPoECwQvacT2D7u3C3tKRkGtUxv8WFYazBEx4X"
                  )
                }
                className=" -ml-3 select-none my-0  cursor-pointer mt-2 Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366716/logo-text.cf5a7a0_lx0ueg.svg"
                }
                alt="..."
                style={{ height: "38px", width: "176px" }}
              />

              <div className="flex my-0 mt-4">
                <img
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="w-8 select-none cursor-pointer Z-40"
                  src={
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366783/jupiter-logo_vi90us.svg"
                  }
                  alt="..."
                  style={{ height: "38px" }}
                />

                <Text
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="ml-2 mt-2 cursor-pointer Z-40 select-none '"
                  size="16px"
                  weight="true"
                >
                  Jupiter
                </Text>
              </div>
            </div>
          </div>
          
          <div className="trade_sb_token_wrapper_2 mt-3 flex flex-col  rounded-md items-center   z-50 sm:mt-3" style={{minHeight:"214px"}} >
            <Text
              color="#586779"
              size="16px"
              weight="true"
              transform="true"
              className="my-0 select-none"
            >
              Track markets
            </Text>
            <div className="flex flex-col justify-start pt-3">
              <img
                onClick={() =>
                  window.open("https://www.coingecko.com/en/coins/superbonds")
                }
                className=" select-none  -ml-1 my-0  mt-3 cursor-pointer Z-40  "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643368369/coingecko-logo-white-3f2aeb48e13428b7199395259dbb96280bf47ea05b2940ef7d3e87c61e4d8408_jlbfa3.png"
                }
                alt="..."
                style={{ height: "35px", width: "130px" }}
              />
              <img
                onClick={() =>
                  window.open(
                    "https://coinmarketcap.com/currencies/superbonds/"
                  )
                }
                className=" select-none my-0   mt-3 cursor-pointer Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643903985/CoinMarketCap_tp16rh.png"
                }
                alt="..."
                style={{ height: "45px", width: "165px" }}
              />
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <div className="flex flex-col mt-12 text-center justify-center select-none">
          
          <div className="flex justify-center items-center">
            <div>
              <img
                className="home-line-left"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644226260/Group_101_bre4ta.png"
                }
                width="100%"
                height="100%"
                alt="trade"
              />
            </div>
            <div className="flex flex-col px-5">
              <BtnText color="#7CFA4C" size="28px" weight="true">
                MetaYielder
              </BtnText>
              {/* <BtnText className="mt-2" color="white" size="14px" weight="true">
                Q1 2022
              </BtnText> */}
            </div>
            <div>
              <img
                className="home-line-right"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644226260/Group_1334_gmxlrb.png"
                }
                width="100%"
                height="100%"
                alt="trade"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-9/12 mx-auto my-0 pt-5 2xl:w-11/12 xl:w-full justify-center">
            <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
              <div className="z-50">
                <img
                  className="my-0 mx-auto w-24 z-50"
                  src={
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644309050/Trade_irbh1a.svg"
                  }
                  alt="trade"
                />
              </div>
              <div className="flex flex-col justify-start yielder-below-Q1 mx-auto my-0 px-3 pb-4 pt-16 rounded-md w-64 -z-50 -mt-14 sm:w-full h-full">
                <div className="flex flex-col ">
                  <BtnText
                    className="mt-1"
                    color="white"
                    size="21px"
                    weight="true"
                  >
                   Fixed Yield
                  </BtnText>
                  <CardText
                    letterSpacing="1px"
                    className="tracking-normal mt-5"
                    size="15px"
                    opacity="0.5"
                  >
                     Up to 18% fixed yield through bonds with various maturities. Powered by LP underwriting.
                  </CardText>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
              <div className="z-50">
                <img
                  className="my-0 mx-auto w-24 z-50"
                  src={
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644309050/Yield_vdeosl.svg"
                  }
                  alt="trade"
                />
              </div>
              <div className="flex flex-col justify-start yielder-below-Q1 mx-auto my-0 px-3 pb-4 pt-16  rounded-md w-64 -z-50 -mt-14 sm:w-full h-full">
                <div className="flex flex-col">
                  <BtnText
                    className="mt-1"
                    color="white"
                    size="21px"
                    weight="true"
                  >
                  Cross-Chain
                  </BtnText>
                  <CardText
                    letterSpacing="1px"
                    className="tracking-normal mt-5"
                    size="15px"
                    opacity="0.5"
                  >
                    No need to farm stablecoins elsewhere. SuperBonds programmatically farms the most established stablecoin yields crosschain for the benefit of LPs.
                  </CardText>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
              <div className="z-50">
                <img
                  className="my-0 mx-auto  w-24  z-50"
                  src={
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644309050/NFT_wfsjbl.svg"
                  }
                  alt="trade"
                />
              </div>
              <div className="flex flex-col justify-start yielder-below-Q1 mx-auto my-0 px-3 pb-4 pt-16  rounded-md w-64 -z-50 -mt-14 sm:w-full h-full">
                <div className="flex flex-col">
                  <BtnText
                    className="mt-1"
                    color="white"
                    size="21px"
                    weight="true"
                  >
                    Financial NFTs
                  </BtnText>
                  <CardText
                    letterSpacing="1px"
                    className="tracking-normal mt-5"
                    size="15px"
                    opacity="0.5"
                  >
                    Issued bonds are self-custodied Financial NFTs with a known terminal value, making them a form of collateral not yet in circulation. 
                  </CardText>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
              <div className="z-50">
                <img
                  className="my-0 mx-auto  w-24  z-50"
                  src={
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644405667/SuperB_tgvltb.svg"
                  }
                  alt="trade"
                />
              </div>
              <div className="flex flex-col justify-start yielder-below-Q1 mx-auto my-0 px-3 pb-4 pt-16  rounded-md w-64 -z-50 -mt-14 sm:w-full h-full">
                <div className="flex flex-col">
                  <BtnText
                    className="mt-1"
                    color="white"
                    size="21px"
                    weight="true"
                  >
                    SB Token
                  </BtnText>
                  <CardText
                    letterSpacing="1px"
                    className="tracking-normal mt-5"
                    size="15px"
                    opacity="0.5"
                  >
                    The bloodline of the SuperBonds platform and a layer-2 gas. SB has a pre-determined mint and is burned on every transaction on SuperBonds.
                  </CardText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="flex flex-col mt-16 text-center justify-center select-none">
          <div className="flex justify-center">
            <button
              onClick={() =>
                handlePush("/trade")
              }
              className="text-black bg-green-100 rounded-md px-6 py-4"
            >
              <TextDoc transform="" className="" size="16px" weight="true">
                LAUNCH APP
              </TextDoc>
            </button>
          </div>
        </div>
      </section> */}

      <section>
        <div className="flex flex-col mt-12 text-center justify-center select-none">
          <div className="flex justify-center items-center">
            <div>
              <img
                className="home-line-left"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644210559/Group_1335_qxg5xu.png"
                }
                width="100%"
                height="100%"
                alt="trade"
              />
            </div>
            <div className="flex flex-col px-5">
              <BtnText color="#01A0FC" size="28px" weight="true">
                MetaLend
              </BtnText>

              {/* <BtnText className="mt-2" color="white" size="14px" weight="true">
                Q2 2022
              </BtnText> */}
            </div>
            <div>
              <img
                className="home-line-right"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644210546/Group_1336_nedhlq.png"
                }
                width="100%"
                height="100%"
                alt="trade"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center yielder-below mx-auto my-0 py-14 px-20 rounded-md mt-5">
            <div>
              <BtnText color="white" size="21px" weight="true">
                Coming Soon
              </BtnText>
            </div>

            <div className="py-5">
              <button
                onClick={() =>
                  window.open(
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1642360290/SB_Whitepaper-compressed_lafdtl.pdf#page=13"
                  )
                }
                className="text-white border-2 rounded-md border-purple-100 px-8 py-4"
              >
                <TextDoc transform="" className="" size="16px" weight="true">
                  READ MORE
                </TextDoc>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5" style={{ marginTop: "7rem" }}>
        <div
          className="mt-10 w-1/12 text-center border-b-4 border-white"
          style={{ margin: "0 auto" }}
        ></div>

        <div
          className="flex justify-around   mt-5   rounded-md flex-wrap w-8/12  2xl:w-9/12  maxWidth-lg my-0 mx-auto pb-1 pt-1 lg:w-12/12"
          style={{ maxWidth: "1400px" }}
        >
          <div className="w-56 xl:w-56 bg-transparent rounded-lg sahdow-lg flex flex-col justify-center items-center max-w-xs w-64  min-h-16">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginBottom: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/COMMONCROPPED_onwv85.svg"
              alt="home-page-card"
            />
          </div>

          <div className="w-56 xl:w-56 bg-transparent rounded-lg sahdow-lg flex flex-col justify-center items-center max-w-xs  min-h-16">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginBottom: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/LVNACROPPED_dsoyzg.svg"
              alt="home-page-card"
            />
          </div>

          <div className="w-56 xl:w-56 bg-transparent rounded-lg sahdow-lg  flex flex-col justify-center items-center max-w-xs  min-h-16">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginBottom: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/POLYCHAINCROPPED_nug9cn.svg"
              alt="home-page-card"
            />
          </div>

          <div className="w-56 xl:w-56 bg-transparent rounded-lg sahdow-lg  flex flex-col justify-center items-center max-w-xs min-h-16">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginTop: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/KUBIKCROPPED_uhhbyu.svg"
              alt="home-page-card"
            />
          </div>
        </div>
      </section>

      <footer className="footer">
      <section className="sub_nav">
        <div className=' flex flex-wrap items-center justify-around w-9/12 mx-auto my-0 py-6  xl:w-full justify-center ' >
          <div className='  flex flex-col justify-center items-center   lg:py-2'>
            <NewText
              color='white'
              weight="true"
              transform=""
              size='30px'
              className="my-0 select-none text-center"
              >
              Become an <span style={{ color: "#01A0FC" }}>S</span>
              <span style={{ color: "#7CFA4C" }}>B</span> Ambassador
            </NewText>
            <button
              onClick={() =>
                window.open("https://superbonds.medium.com/the-ambassador-program-from-superbonds-8d11f5063bac")
              }
              className="w-36 mt-5 z-40 rounded-md bg-green-100 px-4 py-2 inline-block text-center "
            >
              <BtnText
                className=" "
                transform=""
                size="16px"
                weight="true"
                color="black"
              >
                Join Now
              </BtnText>
              {/* <img  className=' mt-0.5' src={arrow}  /> */}
            </button>
          
          </div>
          
          <div className="vl" style={{borderLeft: '3px solid rgb(70 129 48)',height: '100px'}}></div>
          <div className='flex flex-col justify-center items-center  lg:py-2 z-50' >
            <NewText
              color='white'
              weight="true"
              transform=""
              size='30px'
              className="my-0 select-none"
              >
                Trade <span style={{ color: "#01A0FC" }}>S</span>
                <span style={{ color: "#7CFA4C" }}>B</span> Token
            </NewText>
            <div className="flex sm:flex-wrap sm:justify-content-center xs:flex-col mt-5 items-center">
              <img
                onClick={() =>
                  window.open("https://www.mexc.com/exchange/SB_USDT")
                }
                className=" my-0  select-none cursor-pointer Z-40   left-auto right-auto"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366156/full-logo-normal-mexc_cllivy.svg"
                }
                alt="..."
                style={{ height: "50px", width: "130px" }}
                      />
              <img
                onClick={() =>
                  window.open(
                    "https://dex.raydium.io/#/market/E3cNotFPoECwQvacT2D7u3C3tKRkGtUxv8WFYazBEx4X"
                  )
                }
                className="ml-2 select-none my-0  cursor-pointer   Z-40 "
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366716/logo-text.cf5a7a0_lx0ueg.svg"
                }
                alt="..."
                style={{ height: "38px", width: "150px" }}
              />
              <div className="flex my-0 ml-2  ">
                <img
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="w-8 select-none cursor-pointer Z-40"
                  src={ 
                    "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366783/jupiter-logo_vi90us.svg"
                  }
                  alt="..."
                  style={{ height: "42px" }}
                />

                <Jupiter
                  onClick={() => window.open("https://jup.ag/swap/USDC-SB")}
                  className="ml-2 mt-2 cursor-pointer Z-40 select-none '"
                  size="14px"
                
                >
                  Jupiter
                </Jupiter>
              </div>
             </div>
            </div>
          </div>
         
        <div className=" flex justify-center">
          <Text>
            Copyright © 2021 <strong>SuperBonds</strong>
          </Text>
        </div>
        </section>

      </footer>
    </div>
  );
};
