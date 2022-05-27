import React, { useEffect,useCallback, useState } from "react";
import { notify } from "../../utils/notifications";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection,sendTransaction,useENV,sendTransactionJupiter } from "../../contexts/connection";
import { SUPERBONDS_PROGRAM_ID,
         USDC_MINT_ADDRESS,
         USDT_MINT_ADDRESS,
         SUPERB_MINT_ADDRESS,
         WRAPPED_SOL_MINT,
         USDC_DECIMALS,
         USDT_DECIMALS,
         SUPERB_DECIMALS,
         SOL_DECIMALS,
         FEE_BPS,
         FEE_COLLECTOR,
         BTC_TOKEN_DECIMALS,
         ETH_TOKEN_DECIMALS,
         ALEPH_TOKEN_DECIMALS,
         SERUM_TOKEN_DECIMALS,
         SUSHI_TOKEN_DECIMALS,
         MSRM_TOKEN_DECIMALS,
         FTT_TOKEN_DECIMALS,
         YFI_TOKEN_DECIMALS,
         SXP_TOKEN_DECIMALS,
         LINK_TOKEN_DECIMALS,
         HGET_TOKEN_DECIMALS,
         CREAM_TOKEN_DECIMALS,
         UBXT_TOKEN_DECIMALS,
         HNT_TOKEN_DECIMALS,
         FRONT_TOKEN_DECIMALS,
         AKRO_TOKEN_DECIMALS,
         HXRO_TOKEN_DECIMALS,
         UNI_TOKEN_DECIMALS,
         MATH_TOKEN_DECIMALS,
         TOMO_TOKEN_DECIMALS,
         LUA_TOKEN_DECIMALS,
         BTC_MINT_ADDRESS,
         ETH_MINT_ADDRESS,
         ALEPH_MINT_ADDRESS,
         SERUM_MINT_ADDRESS,
         SUSHI_MINT_ADDRESS,
         MSRM_MINT_ADDRESS,
         FTT_MINT_ADDRESS,
         YFI_MINT_ADDRESS,
         SXP_MINT_ADDRESS,
         LINK_MINT_ADDRESS,
         HGET_MINT_ADDRESS,
         CREAM_MINT_ADDRESS,
         UBXT_MINT_ADDRESS,
         HNT_MINT_ADDRESS,
         FRONT_MINT_ADDRESS,
         AKRO_MINT_ADDRESS,
         HXRO_MINT_ADDRESS,
         UNI_MINT_ADDRESS,
         MATH_MINT_ADDRESS,
         TOMO_MINT_ADDRESS,
         LUA_MINT_ADDRESS,
       } from "../../utils/ids";
import { findAssociatedTokenAddress } from "../../contexts/accounts";
import {POOL_DATA_LAYOUT,PoolDataLayout} from "../../utils/pool_data_layout";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {STAKING_DATA_LAYOUT,StakingDataLayout} from "../../utils/staking_data_layout";
import {TRADER_LAYOUT/* ,TraderLayout */} from "../../utils/trader_layout";
import {FARMING_REWARD_LAYOUT} from "../../utils/farming_reward_layout";
import {ButtonText,Text,HeroText,HoverToolTip, InputWrapper} from "./buy-sb.styled";
import BN from "bn.js";
import axios from 'axios';
import {AxiosResponse} from 'axios';
import {
  Numberu64,numberFormatter,
  convertTimeStamp,
  getTokenBalance,delay,
  formatNumberWithoutRounding,
  formatInputNumber, unformatInputNumber,
  numOnly, noSpecial } from "../../utils/utils";

import Swal from 'sweetalert2';
import '../../styles/trade.css';
import { MdSwapVert ,MdRefresh} from "react-icons/md";
import {BsArrowDownCircleFill} from "react-icons/bs"
import {GoSettings} from "react-icons/go"
import { GlobalStyle } from "../redeem/redeem.styled";

import Modal from "./Modal";

import {SettingModal} from "./setting-modal"
import { DropDown } from "./helper";
import fetch from 'cross-fetch'
import { Transaction } from '@solana/web3.js';
import { ConsoleSqlOutlined } from "@ant-design/icons";

interface ParamTypes {
  trade_account: string
}

export function BuySBView() {

  const connection = useConnection();
  const wallet = useWallet();
  const env = useENV();
  const [showModal, setShowModal] = React.useState('');
  const [youPay, setYouPay] = React.useState(DropDown[0]);
  const [youGet, setYouGet] = React.useState({
    id: 2,
    label: 'SB',
    seconadaryLabel: 'SuperBonds Token',
  })
  const [inputAmount,setInputAmount] = useState<any>("");
  const [outputAmount,setOutputAmount] = useState<any>("");

  const [InputBalance,setInputBalance] = useState<any>(0);
  const [OutputBalance,setOutputBalance] = useState<any>(0);
  const [InputToken,setInputToken] = useState(USDC_MINT_ADDRESS);
  const [InputDecimal,setInputDecimal] = useState(USDC_DECIMALS);
  const [OutputToken,setOutputToken] = useState(SUPERB_MINT_ADDRESS);
  const [OutputDecimal,setOutputDecimal] = useState(SUPERB_DECIMALS);
  const [routes,setRoutes] = useState<any>([]);

  const onChangeInputToken = async () =>{
    // if ( !wallet){
    //   return;
    // }
    // if (!wallet.publicKey){
    //   return;
    // }

    switch(youPay.label) {
      case 'USDC':
        setInputToken(USDC_MINT_ADDRESS);
        setInputDecimal(USDC_DECIMALS);
        break;
      case 'USDT':
          setInputToken(USDT_MINT_ADDRESS);
          setInputDecimal(USDT_DECIMALS);
        break;
      case 'SB':
          setInputToken(SUPERB_MINT_ADDRESS);
          setInputDecimal(SUPERB_DECIMALS);
        break;
      case 'SOL':
          setInputToken(WRAPPED_SOL_MINT);
          setInputDecimal(SOL_DECIMALS);
        break;
      case 'soALEPH':
          setInputToken(ALEPH_MINT_ADDRESS);
          setInputDecimal(ALEPH_TOKEN_DECIMALS);
        break;
      case 'BTC':
          setInputToken(BTC_MINT_ADDRESS);
          setInputDecimal(BTC_TOKEN_DECIMALS);
        break;
      case 'soETH':
          setInputToken(ETH_MINT_ADDRESS);
          setInputDecimal(ETH_TOKEN_DECIMALS);
        break;
      case 'SRM':
          setInputToken(SERUM_MINT_ADDRESS);
          setInputDecimal(SERUM_TOKEN_DECIMALS);
        break;
      case 'soSUSHI':
          setInputToken(SUSHI_MINT_ADDRESS);
          setInputDecimal(SUSHI_TOKEN_DECIMALS);
        break;
      case 'MSRM':
          setInputToken(MSRM_MINT_ADDRESS);
          setInputDecimal(MSRM_TOKEN_DECIMALS);
        break;
      case 'soFTT':
          setInputToken(FTT_MINT_ADDRESS);
          setInputDecimal(FTT_TOKEN_DECIMALS);
        break;
      case 'soYFI':
          setInputToken(YFI_MINT_ADDRESS);
          setInputDecimal(YFI_TOKEN_DECIMALS);
        break;
      case 'soSXP':
          setInputToken(SXP_MINT_ADDRESS);
          setInputDecimal(SXP_TOKEN_DECIMALS);
        break;
      case 'soLINK':
          setInputToken(LINK_MINT_ADDRESS);
          setInputDecimal(LINK_TOKEN_DECIMALS);
        break;
      case 'soHGET':
          setInputToken(HGET_MINT_ADDRESS);
          setInputDecimal(HGET_TOKEN_DECIMALS);
        break;
      case 'soCREAM':
          setInputToken(CREAM_MINT_ADDRESS);
          setInputDecimal(CREAM_TOKEN_DECIMALS);
        break;
      case 'soUBXT':
          setInputToken(UBXT_MINT_ADDRESS);
          setInputDecimal(UBXT_TOKEN_DECIMALS);
        break;
      case 'soHNT':
          setInputToken(HNT_MINT_ADDRESS);
          setInputDecimal(HNT_TOKEN_DECIMALS);
        break;
      case 'soFRONT':
          setInputToken(FRONT_MINT_ADDRESS);
          setInputDecimal(FRONT_TOKEN_DECIMALS);
        break;
      case 'soAKRO':
          setInputToken(AKRO_MINT_ADDRESS);
          setInputDecimal(AKRO_TOKEN_DECIMALS);
        break;
      case 'soHXRO':
          setInputToken(HXRO_MINT_ADDRESS);
          setInputDecimal(HXRO_TOKEN_DECIMALS);
        break;
      case 'soUNI':
          setInputToken(UNI_MINT_ADDRESS);
          setInputDecimal(UNI_TOKEN_DECIMALS);
        break;
      case 'soMATH':
          setInputToken(MATH_MINT_ADDRESS);
          setInputDecimal(MATH_TOKEN_DECIMALS);
        break;
      case 'soTOMO':
          setInputToken(TOMO_MINT_ADDRESS);
          setInputDecimal(TOMO_TOKEN_DECIMALS);
        break;
      case 'soLUA':
          setInputToken(LUA_MINT_ADDRESS);
          setInputDecimal(LUA_TOKEN_DECIMALS);
        break;
      default:
        // code block
    }
  }

  const onChangeOutputToken = async () =>{
    // if ( !wallet){
    //   return;
    // }
    // if (!wallet.publicKey){
    //   return;
    // }
    switch(youGet.label) {
      case 'USDC':
        setOutputToken(USDC_MINT_ADDRESS);
        setOutputDecimal(USDC_DECIMALS);
        break;
      case 'USDT':
          setOutputToken(USDT_MINT_ADDRESS);
          setOutputDecimal(USDT_DECIMALS);
        break;
      case 'SB':
          setOutputToken(SUPERB_MINT_ADDRESS);
          setOutputDecimal(SUPERB_DECIMALS);
        break;
      case 'SOL':
          setOutputToken(WRAPPED_SOL_MINT);
          setOutputDecimal(SOL_DECIMALS);
        break;
      case 'soALEPH':
          setOutputToken(ALEPH_MINT_ADDRESS);
          setOutputDecimal(ALEPH_TOKEN_DECIMALS);
        break;
      case 'BTC':
          setOutputToken(BTC_MINT_ADDRESS);
          setOutputDecimal(BTC_TOKEN_DECIMALS);
        break;
      case 'soETH':
          setOutputToken(ETH_MINT_ADDRESS);
          setOutputDecimal(ETH_TOKEN_DECIMALS);
        break;
      case 'SRM':
          setOutputToken(SERUM_MINT_ADDRESS);
          setOutputDecimal(SERUM_TOKEN_DECIMALS);
        break;
      case 'soSUSHI':
          setOutputToken(SUSHI_MINT_ADDRESS);
          setOutputDecimal(SUSHI_TOKEN_DECIMALS);
        break;
      case 'MSRM':
          setOutputToken(MSRM_MINT_ADDRESS);
          setOutputDecimal(MSRM_TOKEN_DECIMALS);
        break;
      case 'soFTT':
          setOutputToken(FTT_MINT_ADDRESS);
          setOutputDecimal(FTT_TOKEN_DECIMALS);
        break;
      case 'soYFI':
          setOutputToken(YFI_MINT_ADDRESS);
          setOutputDecimal(YFI_TOKEN_DECIMALS);
        break;
      case 'soSXP':
          setOutputToken(SXP_MINT_ADDRESS);
          setOutputDecimal(SXP_TOKEN_DECIMALS);
        break;
      case 'soLINK':
          setOutputToken(LINK_MINT_ADDRESS);
          setOutputDecimal(LINK_TOKEN_DECIMALS);
        break;
      case 'soHGET':
          setOutputToken(HGET_MINT_ADDRESS);
          setOutputDecimal(HGET_TOKEN_DECIMALS);
        break;
      case 'soCREAM':
          setOutputToken(CREAM_MINT_ADDRESS);
          setOutputDecimal(CREAM_TOKEN_DECIMALS);
        break;
      case 'soUBXT':
          setOutputToken(UBXT_MINT_ADDRESS);
          setOutputDecimal(UBXT_TOKEN_DECIMALS);
        break;
      case 'soHNT':
          setOutputToken(HNT_MINT_ADDRESS);
          setOutputDecimal(HNT_TOKEN_DECIMALS);
        break;
      case 'soFRONT':
          setOutputToken(FRONT_MINT_ADDRESS);
          setOutputDecimal(FRONT_TOKEN_DECIMALS);
        break;
      case 'soAKRO':
          setOutputToken(AKRO_MINT_ADDRESS);
          setOutputDecimal(AKRO_TOKEN_DECIMALS);
        break;
      case 'soHXRO':
          setOutputToken(HXRO_MINT_ADDRESS);
          setOutputDecimal(HXRO_TOKEN_DECIMALS);
        break;
      case 'soUNI':
          setOutputToken(UNI_MINT_ADDRESS);
          setOutputDecimal(UNI_TOKEN_DECIMALS);
        break;
      case 'soMATH':
          setOutputToken(MATH_MINT_ADDRESS);
          setOutputDecimal(MATH_TOKEN_DECIMALS);
        break;
      case 'soTOMO':
          setOutputToken(TOMO_MINT_ADDRESS);
          setOutputDecimal(TOMO_TOKEN_DECIMALS);
        break;
      case 'soLUA':
          setOutputToken(LUA_MINT_ADDRESS);
          setOutputDecimal(LUA_TOKEN_DECIMALS);
        break;
      default:
        // code block
    }

  }

  useEffect(() => {
    const getInputBalance = async () =>{
        if ( !wallet){
          return;
        }
        if (!wallet.publicKey){
          return;
        }
        if (youPay.label != 'SOL')
          setInputBalance(await getTokenBalance(connection,wallet.publicKey,InputToken,InputDecimal));
        else
          setInputBalance(await connection.getBalance(wallet.publicKey)/(10**9))
    }
    getInputBalance()
  }, [InputToken]);

  useEffect(()=>{

  },[])

  useEffect(() => {
    const getOutputBalance = async () =>{
      if ( !wallet){
        return;
      }
      if (!wallet.publicKey){
        return;
      }
      if (youGet.label != 'SOL')
        setOutputBalance(await getTokenBalance(connection,wallet.publicKey,OutputToken,OutputDecimal));
      else
        setOutputBalance(await connection.getBalance(wallet.publicKey)/(10**9))
    }
    getOutputBalance();
  }, [OutputToken]);


  useEffect(() => {
    if (routes.length == 0 ) return;

    setOutputAmount(routes[0].outAmount / (10**OutputDecimal));
  }, [routes]);

  useEffect(() => {
    onChangeInputToken();
  }, [youPay]);

  useEffect(() => {
    onChangeOutputToken();
  }, [youGet]);

  useEffect(() => {
    loadJupiter();
  }, [inputAmount,InputToken,OutputToken]);

  const onChangeInputAmount = useCallback( async (e) => {
    const { value } = e.target;
    setInputAmount(parseFloat(value || 0.00 ));
    if(!value) setOutputAmount(0.00)
  },[]);

  const [transactionFees,setTransactionFees] = useState<any>();
  const [showSettingModal,setshowSettingModal] = useState<any>(false);

  const onRefresh = async () =>{
    await getAllBalances();
    // console.log('here')
  }
  const onSwap = async () => {
    if(youPay.label===youGet.label){
    notify({
        message: `can't swap if both coins are same`,
        type: "error",
        });
        return
    }

    console.log('onSwap');
    if ( !wallet){
      notify({
        message: 'Please connect to Solana network',
        type: "error",
      });
      return;
    }
    let publicKey = wallet.publicKey;
    if (!publicKey){
      notify({
        message: 'Please connect to Solana network',
        type: "error",
      });
      return;
    }
    let SOL_balance = await connection.getBalance(publicKey)/(10**9);
    if (SOL_balance <= 0.005){
      notify({
        message: 'You have low Sol balance',
        type: "error",
      });
      return;
    }
    if (parseFloat(InputBalance) < inputAmount) {
      notify({
        message: 'Not enough balance',
        type: "error",
      });
      return;
    }
    if (routes.length == 0 ){
      notify({
        message: 'No Swap Option found',
        type: "info",
      });
      return;
    }
    let feeAccount = FEE_COLLECTOR;
    if (OutputToken.toString() == USDC_MINT_ADDRESS.toString()){
      feeAccount = await findAssociatedTokenAddress(publicKey,USDC_MINT_ADDRESS);
    }
    else if (OutputToken.toString() == USDT_MINT_ADDRESS.toString()){
      feeAccount = await findAssociatedTokenAddress(publicKey,USDT_MINT_ADDRESS);
    }
    else if (OutputToken.toString() == SUPERB_MINT_ADDRESS.toString()){
      feeAccount = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
    }
    // get serialized transactions for the swap
    const transactions = await (
      await fetch('https://quote-api.jup.ag/v1/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // route from /quote api
          route: routes[0],
          // user public key to be used for the swap
          userPublicKey: publicKey.toString(),
          // auto wrap and unwrap SOL. default is true
          wrapUnwrapSOL: true,
          // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
          // This is the ATA account for the output token where the fee will be sent to. If you are swapping from SOL->USDC then this would be the USDC ATA you want to collect the fee.
          feeAccount: feeAccount.toString()
        })
      })
    ).json();

    const { setupTransaction, swapTransaction, cleanupTransaction } = transactions;
    notify({
      message: 'Swapping ...',
      type: "success",
    });
    console.log(setupTransaction, swapTransaction, cleanupTransaction);
    let txid1 = await sendTransactionJupiter(connection,wallet,[setupTransaction, swapTransaction, cleanupTransaction],[]);
    if (!txid1){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Successfully swapped',
        type: "success",
      });

    }
    await delay(2000);
    if (youPay.label != 'SOL')
      setInputBalance(await getTokenBalance(connection,publicKey,InputToken,InputDecimal));
    else
      setInputBalance(await connection.getBalance(publicKey)/(10**9));

    if (youGet.label != 'SOL')
      setOutputBalance(await getTokenBalance(connection,publicKey,OutputToken,OutputDecimal));
    else
      setOutputBalance(await connection.getBalance(publicKey)/(10**9));
  }

  const getAllBalances = async () => {
    if ( !wallet){
      return;
    }
    if (!wallet.publicKey){
      return;
    }

    setInputBalance(await getTokenBalance(connection,wallet.publicKey,InputToken,InputDecimal));
    setOutputBalance(await getTokenBalance(connection,wallet.publicKey,OutputToken,OutputDecimal));

  }

  let jupiter = null;
  let routeMap = null;
  const loadJupiter = async () => {

    console.log(InputToken.toString(),OutputToken.toString(),inputAmount);
    const { data } = await (
      await fetch(
        'https://quote-api.jup.ag/v1/quote?inputMint='+InputToken+'&outputMint='+OutputToken+'&amount='+Math.round(inputAmount * (10 ** InputDecimal))+'&slippage=0.5&feeBps=' + FEE_BPS
      )
    ).json()
    const routes = data;
    setRoutes(routes||[]);
    console.log('routes',routes);
  }

  useEffect(() => {
    if (!wallet.publicKey) return;
    onRefresh();
    loadJupiter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);

  const handleSwap=()=>{
    let TempDecimal=OutputDecimal
    setOutputDecimal(InputDecimal)
    setInputDecimal(TempDecimal)

    let tempToken=OutputToken;
    setOutputToken(InputToken)
    setInputToken(tempToken)


    let tempGet=youGet;
    setYouGet(youPay)
    setYouPay(tempGet)

    let TempAmount=outputAmount;
    setInputAmount(TempAmount)
   }
  const handleModalSelection=(obj:any)=>{
    showModal === "pay" ? setYouPay({...obj}) : setYouGet({...obj})
  }
    const handleMaxBalance=(type:string,balance:number,amount:string)=>{
        if(type==='pay'){
            amount==='half'? setInputAmount(balance/2): setInputAmount(balance)
        }
        if(type==='get'){
            setOutputAmount(balance)
        }
    }

    // const getPayImageIndex=()=> DropDown.findIndex((elem) => elem.id === youPay.id) + 1
    // const getGetImageIndex=()=> DropDown.findIndex((elem) => elem.id === youGet.id) + 1

  return (
    <>
 {showSettingModal &&  <SettingModal />}
 <div className="bg-black w-screen h-screen     ">
  <div
    className="w-7/12 my-0 mx-auto pt-20 lg:pt-24 md:pt-20 lg:w-11/12 md:w-12/12"
    style={{ maxWidth: "1000px" }}
  >
    <div className="flex justify-center py-8 mt-10  w-8/12 2xl:w-8/12 xl:w-8/12 lg:w-8/12 md:w-12/12 sm:w-full mx-auto">
      {/* <MdRefresh className="text-2xl" />
      <GoSettings className="ml-3 text-2xl" /> */}
        <Text size='20px' weight className="block"  >
          SB Swap
        </Text>
    </div>
    <div
      className="bg-gray-300  w-8/12 2xl:w-8/12 xl:w-8/12 lg:w-8/12 md:w-12/12 sm:w-full  rounded-3xl mx-auto   border-green-100"
      style={{ maxWidth: "500px" ,borderWidth:'1px'}}
    >

      <div className="rounded-3xl flex justify-center md:flex-wrap ">
        <div className="flex flex-col w-12/12 2xl:w-11/12 xl:w-11/12 md:w-8/12 sm:w-12/12 py-5 px-4 md:my-4 md:mx-0 mt-2 sm:py-0 sm:px-0 md:mb-1">
          <div className="p-1 rounded-3xl">
            <div className="bg-gray-200 text-center bg-gray-400 py-3 px-3 border rounded-2xl mt-3">
              <div className="flex justify-end px-3">
                {/* <Text className="block"  >
                  Enter Amount
                </Text> */}
                <div className="flex gap-2">
                    <Text className="block"  >
                        Balance: {InputBalance}
                    </Text>
                    <button onClick={()=>handleMaxBalance('pay',InputBalance,'half')} className="bg-green-100 py-0.1 px-1 rounded-md text-black font-semibold text-xs">
                        HALF
                    </button>
                    <button onClick={()=>handleMaxBalance('pay',InputBalance,'max')} className="bg-green-100 py-0.1 px-1 rounded-md text-black font-semibold text-xs">
                        MAX
                    </button>
                </div>

              </div>

              <InputWrapper className="bg-transparent rounded-md flex justify-between items-center mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal("pay")}
                  className="py-2 px-2 rounded-lg flex items-center hover:bg-gray-200"
                >
                  <div className="w-6 h-6 text-xs flex items-center justify-center rounded-full">
                    <span className="span1">
                      <span className="span2">
                        {/* <img alt="logo" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2724%27%20height=%2724%27/%3e" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"> */}
                        <img
                          className="rounded-full"
                          src={require(`../../assets/coinType/logo${
                            youPay.id
                          }.jpg`)}
                          alt="..."
                        />
                      </span>
                      {/* <img alt="USDC" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"> */}
                    </span>
                  </div>
                  <div className="ml-4 mr-2 font-semibold" translate="no">
                    {youPay.label}
                  </div>
                  <div className="text-white fill-current">
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="inherit"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z"
                        fill="inherit"
                      ></path>
                    </svg>
                  </div>
                </button>
                <input
                  maxLength={20}
                  style={{ textAlign: "right" }}
                  onKeyDown={numOnly}
                  type='number'
                  onKeyPress={noSpecial}
                  onChange={onChangeInputAmount}
                  value={inputAmount}
                  className="w-full py-2 px-2 h-10 rounded-md bg-gray-400  bg-gray-400
                  focus:outline-none  focus:ring-1 focus:ring-green-100 border-transparent font-bold border-transparent text-green-100 placeholder-green-100"
                  placeholder="Enter Amount"
                />
              </InputWrapper>
            </div>
            <div className="flex text-center justify-center mt-3 py-4">
              {/* <MdSwapVert className="icon-swap text-green-100 rounded-full cursor-pointer text-3xl border-2 border-solid border-green-100 hover:" onClick={()=>handleSwap()}/> */}
              <BsArrowDownCircleFill className="text-green-100 rounded-full cursor-pointer text-3xl border-2 border-solid border-green-100 hover:"/>
            </div>

            <div className="bg-gray-200 bg-gray-400 py-3 px-3 border rounded-2xl mt-3">
              <div className="flex justify-end px-3">
                {/* <Text className="block" >
                  Amount You Get
                </Text> */}
                <Text className="block"  >
                  Balance: {OutputBalance}
                </Text>
              </div>
              <InputWrapper className="bg-transparent hover:bg-transparent  rounded-md flex justify-between items-center">
                <button
                  disabled
                  type="button"
                  onClick={() => setShowModal("get")}
                  className="py-2 px-2 pr-10 rounded-lg flex items-center hover:bg-gray-200"
                >
                  <div className="w-6 h-6 text-xs flex items-center justify-center rounded-full">
                    <span className="span1">
                      <span className="span2">
                        {/* <img alt="logo" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2724%27%20height=%2724%27/%3e" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"> */}
                        <img
                          className="rounded-full"
                          src={require(`../../assets/coinType/logo${
                            youGet.id
                          }.jpg`)}
                          alt="..."
                        />
                      </span>
                      {/* <img alt="USDC" srcset="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&amp;w=48&amp;q=75" decoding="async" data-nimg="intrinsic" className="rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"> */}
                    </span>
                  </div>
                  <div className="ml-4 mr-2 font-semibold" translate="no">
                    {youGet.label}
                  </div>
                  {/* <div className="text-white fill-current">
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="inherit"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z"
                        fill="inherit"
                      ></path>
                    </svg>
                  </div> */}
                </button>
                <input
                  maxLength={20}
                  style={{ textAlign: "right" }}
                  onKeyDown={numOnly}
                  onKeyPress={noSpecial}
                  readOnly
                  value={outputAmount}
                  className="w-full py-2 px-2 h-10 rounded-md bg-gray-400  bg-gray-400
                  focus:outline-none  font-bold border-transparent text-green-100 placeholder-green-100"
                  placeholder="Amount You Get"
                />
              </InputWrapper>
            </div>
          </div>
          {/* <Text opacity={"50%"}>Fees:0.5%+500SB</Text> */}
          <div className="grid grid-cols-1 gap-2 mt-3">
            <div className="flex justify-center">
              <button
                onClick={onSwap}
                className="rounded-sm mt-4 text-center bg-green-100 py-2 w-12/12 transform transition hover:scale-105"
              >
                <ButtonText  color={"#000000"}  transform weight>
                  Swap
                </ButtonText>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <GlobalStyle />
  <Modal
    setShowModal={setShowModal}
    showModal={showModal}
    setInputState={showModal === "pay" ? setYouPay : setYouGet}
    handleModalSelection={handleModalSelection}
  />
</div>

    </>
    )
}
