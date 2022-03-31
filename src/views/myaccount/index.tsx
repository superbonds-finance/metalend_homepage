import React, { useEffect,useCallback,useState } from "react";
import {HeaderText,Text} from "./myaccount.styled";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { notify } from "../../utils/notifications";
import { Link } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {AxiosResponse} from 'axios';

import {
  USDC_MINT_ADDRESS,
  SUPERB_MINT_ADDRESS,
  SUPERB_DECIMALS,
  SUPERBONDS_PROGRAM_ID,
  USDC_DECIMALS,
  } from "../../utils/ids";
import { useWallet } from "@solana/wallet-adapter-react";
import {truncateStr, getTokenBalance } from "../../utils/utils";
import axios from 'axios';
import { StakeStats } from '../stake/stake-stats';
import { ClaimNFTView } from '../claimNFT';
import { HeaderCard } from "../../components/HeaderCard";

export  function MyAccountView() {
  const connection = useConnection();
  const wallet = useWallet();
  const [nftData,setNftData]=useState<any>([]);
  const [USDCbalance,setUSDCbalance] = useState<any>(0);
  const [SuperBbalance,setSuperBbalance] = useState<any>(0);
  const [offset,setOffset] = useState(0);

  const getAllBalances = async () => {
    if ( !wallet){
      notify({
        message: 'Please connect to Sol network',
        type: "error",
      });
      return;
    }
    if (!wallet.publicKey){
      notify({
        message: 'Please connect to Solana network',
        type: "error",
      });
      return;
    }
    setUSDCbalance(await getTokenBalance(connection,wallet.publicKey,USDC_MINT_ADDRESS,USDC_DECIMALS));
    setSuperBbalance(await getTokenBalance(connection,wallet.publicKey,SUPERB_MINT_ADDRESS,SUPERB_DECIMALS));

  }
  const [MyNFT_dataSource,setMyNFT_dataSource] = useState<any>([]);


  useEffect( () => {
    let publicKey = wallet.publicKey;
    if (!wallet.publicKey) return;
    getAssocisates();
    getTraderDataAccount();
    getAllBalances();

    if(wallet && publicKey) fetchPrivateAPI(10,0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);
  const getTraderDataAccount = async () => {
    if ( !wallet){
      notify({
        message: 'Please connect to Sol network',
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
    // let trader_Data_account = null;
    let filters = [
          {
            "dataSize":560
          },
          {
            "memcmp": {
              "offset": 0,
              "bytes": publicKey.toBase58()
            }
          }];
    const resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    });

    if (resp.length == 0) return;

  }

  const getAssocisates = async () => {
    let publicKey = wallet.publicKey;
    if (!publicKey) return;

  }

  const CopyAction=()=>{
    notify({
      message: 'Copied Successfully!',
      type: "success",
    });
  }

  const fetchPrivateAPI=async (limit:Number,offset:Number)=>{
    let publicKey = wallet.publicKey;
    if(publicKey){
      try {
        const data = {limit,offset,trade_owner:publicKey.toString()};
        const response:AxiosResponse<any> = await axios.post('https://api.superbonds.finance/getTrades',data);
        if(response.data.trades.length===0 && offset>0) {
          fetchPrivateAPI(10,0)
          setOffset(0)
          return;
        }
        setNftData(response?.data?.trades)
      } catch (error) {
        console.error(error);
      }
    }
  }
  const handlePagination=(limit:number,x_paginationcursor:number)=>{
    if(x_paginationcursor>0) {
      setOffset(offset+x_paginationcursor);
      fetchPrivateAPI(limit,offset+x_paginationcursor);
    }
    else if(x_paginationcursor<0 && offset+x_paginationcursor>(-1)) {
      setOffset(offset+x_paginationcursor);
    fetchPrivateAPI(limit,offset+x_paginationcursor);
    }
    else{
      setOffset(offset+0);
      fetchPrivateAPI(limit,x_paginationcursor);
    }
  }


  return (
      <div className="w-screen h-screen bg-black ">
        <div className="w-11/12 my-0 mx-auto pt-16 lg:pt-24 md:pt-16" style={{maxWidth:"1540px"}}>
        <HeaderCard
          isHover=''
          text=''
          USDCbalance={USDCbalance}
          SuperBbalance={SuperBbalance}
          divStyle=' 3xl:justify-end 2xxl:justify-end 2xl:justify-end xl:justify-end lg:justify-end md:justify-end sm:justify-end '
        />

        <div className="flex justify-between md:flex-col mb-3 mt-3 flex-wrap">
          <StakeStats />


          {/* <div className="flex pt-6 justify-between flex-wrap "> */}

            <div className="flex flex-col w-7/12 xl:w-7/12 2xl:w-7/12 lg:w-full lg:mt-4 md:w-full sm:w-full">
              <div className="flex justify-between">
                <div>
                  <button className="border-2 rounded-md border-green-100 px-6 py-1.5 inline-block">
                    <Text >My Bond NFTs</Text>
                  </button>
                </div>

                <div className="bg-gray-300 items-center align-middle py-2 px-5 rounded-md">
                  <i onClick={()=>handlePagination(10,offset>0?-10:0)}  className="fas fa-chevron-left mr-4 inline-block cursor-pointer text-green-100 transform transition hover:scale-150"></i>
                  <i onClick={()=>handlePagination(10,10)} className="fas fa-chevron-right inline-block ml-4 cursor-pointer text-green-100  transform transition hover:scale-150"></i>
                </div>
              </div>

              <div className="w-full block overflow-x-auto mt-2 table-nft" style={{"borderRadius":"1.2em","maxHeight":"530px"}}>
                <table className="w-full" style={{"borderCollapse":"separate","borderSpacing":nftData && nftData?.length>0?'0px 4px':'0px 0px' ,"borderRadius":"1.1em"}}>

                  <tr className="bg-gray-300 ">
                    <th className="sticky-header py-2 px-4 my-2">Trade Account</th>
                    <th className="sticky-header py-2 px-4 my-2">Pool</th>
                    <th className="sticky-header py-2 px-4 my-2">Trade Owner</th>
                    <th className="sticky-header py-2 px-4 my-2">NFT</th>
                    <th className="sticky-header py-2 px-4 my-2">Yield</th>
                    <th className="sticky-header py-2 px-4 my-2">Current Value</th>
                    <th className="sticky-header py-2 px-4 my-2">Action</th>
                  </tr>

                  {nftData && nftData.length>0 && nftData.map((value:any,key:any)=>{
                    return <>
                      <tr className="bg-gray-200 my-2">
                        <td className="py-2 text-center">
                          <a className='text-blue-100 hover:text-blue-100' href={"#/redeem/"+value.trade_account}>{truncateStr(value.trade_account,3)}</a>
                          <CopyToClipboard onCopy={CopyAction}  text={value.trade_account}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>
                        <td className="py-2 px-2 text-blue-100 text-center "><Text  size='13px'>{value.pool}</Text></td>
                        <td className="py-2 text-center">
                          <a className='text-blue-100 hover:text-blue-100' target="_blank" href={"https://explorer.solana.com/address/"+value.trade_owner+"?cluster=devnet"}>{truncateStr(value.trade_owner,3)}</a>
                          <CopyToClipboard onCopy={CopyAction}  text={value.trade_owner}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>
                        <td className="py-2 text-center">
                          <a className='text-blue-100 hover:text-blue-100' target="_blank" href={"https://explorer.solana.com/address/"+value.nft+"?cluster=devnet"}>{truncateStr(value.nft,3)}</a>
                          <CopyToClipboard onCopy={CopyAction}  text={value.nft}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>

                        <td className="py-2 text-center">{parseFloat(value.yield) < 0 ? <span style={{color:"red"}}>{parseFloat(value.yield).toFixed(2)}%</span> : <span style={{color:"green"}}>{parseFloat(value.yield).toFixed(2)}%</span>}</td>
                        <td className="py-2 text-center">{parseFloat(value.current_bond_value).toFixed(3)}</td>
                        <td className="py-2 text-center">
                          <Link to={"/redeem/"+value.trade_account}>
                            <button className="bg-green-100 rounded-md py-1 px-5"><Text color='black' transform='true' weight='true' size='11px'>Reedeem</Text></button>
                           </Link>
                        </td>
                      </tr>
                      </>
                    })

                  }

                  {nftData && nftData.length==0 &&
                    <tr className="bg-gray-200 my-2" >
                      <td className="text-center font-medium text-green-100 font-bold" colSpan={7}>
                        No Data Found
                      </td>
                    </tr>
                  }

                </table>
              </div>
            </div>
          </div>
          {/* </div> */}
          <ClaimNFTView />
      </div>
    </div>
  )
}
