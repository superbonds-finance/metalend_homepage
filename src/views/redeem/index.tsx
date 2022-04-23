/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import { notify } from "../../utils/notifications";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { SUPERBONDS_PROGRAM_ID,
         USDC_MINT_ADDRESS,
         SUPERB_MINT_ADDRESS,
         POOL_30_ADDRESS,
         USDC_DECIMALS,
         SUPERB_DECIMALS,
         PLATFORM_DATA_ACCOUNT,
         STAKING_DATA_ACCOUNT
       } from "../../utils/ids";
import { findAssociatedTokenAddress } from "../../contexts/accounts";
import {POOL_DATA_LAYOUT,PoolDataLayout} from "../../utils/pool_data_layout";
import {TRADE_DATA_LAYOUT} from "../../utils/trade_data_layout";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {REDEEM_DATA_LAYOUT} from "../../utils/redeem_data_layout";
import BN from "bn.js";
import { truncateStr,convertTimeStamp,delay,getTokenBalance,formatNumberWithoutRounding,formatInputNumber} from "../../utils/utils";
import {
  Account,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {
          Token,
          TOKEN_PROGRAM_ID,
 } from "@solana/spl-token";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {GlobalStyle,Text} from "./redeem.styled"
import Swal from 'sweetalert2';

interface ParamTypes {
  trade_account: string
}

export const RedeemView = () => {
  const connection = useConnection();
  const wallet = useWallet();
  const { trade_account } = useParams<ParamTypes>();
  const history = useHistory();

  const [USDCbalance,setUSDCbalance] = useState<any>(0);
  const [SuperBbalance,setSuperBbalance] = useState<any>(0);

  const getAllBalances = async () => {
    if ( !wallet){
      // notify({
      //   message: 'Please connect to Solana network',
      //   type: "error",
      // });
      return;
    }
    if (!wallet.publicKey){
      // notify({
      //   message: 'Please connect to Solana network',
      //   type: "error",
      // });
      return;
    }
    setUSDCbalance(await getTokenBalance(connection,wallet.publicKey,USDC_MINT_ADDRESS,USDC_DECIMALS));
    setSuperBbalance(await getTokenBalance(connection,wallet.publicKey,SUPERB_MINT_ADDRESS,SUPERB_DECIMALS));

  }

  const [Trade_dataSource,setTrade_dataSource] = useState<any>([]);

  const [isMyTrade,setIsMytrade] = useState(false);
  const [tradeData,setTradeData] = useState<any>(null);

  useEffect(() => {
    if (!wallet.publicKey) return;
    //console.log('Here');
    onShowTradeInformation();
    getAllBalances();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);
  const onShowTradeInformation = async () => {
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
    let trade_data_info = (await connection.getAccountInfo(new PublicKey(trade_account), 'singleGossip'));
    if (!trade_data_info) {
      notify({
        message: 'Cannot retrieve Trade Account',
        type: "error",
      });
      return;
    }
    const encodedTradeDataState = trade_data_info.data;
    const decodedTradeDataState = TRADE_DATA_LAYOUT.decode(encodedTradeDataState);
    //console.log(decodedTradeDataState);
    setTradeData(decodedTradeDataState);

    const NFT_info = await connection.getAccountInfo(decodedTradeDataState.NFT);
    if (!NFT_info) return;
    // const NFT_data = MintLayout.decode(NFT_info.data);
    let pool = decodedTradeDataState.pool;

    if (decodedTradeDataState.current_owner.toBase58() == publicKey.toBase58()) setIsMytrade(true);

    let entrance_yield = decodedTradeDataState.bond_yield/10000;

    let bond_value = new BN(decodedTradeDataState.bond_value, 10, "le").toNumber()/(10**USDC_DECIMALS);
    let Bond_at_maturity = new BN(decodedTradeDataState.bond_value_at_maturity, 10, "le").toNumber()/(10**USDC_DECIMALS);

    var maturity_at = 1000* new BN(decodedTradeDataState.maturity_date, 10, "le").toNumber();
    var now = new Date();
    const diffDays = Math.round(Math.abs((maturity_at - now.getTime()) / (1000)));
    //console.log(maturity_at,now,diffDays);
    let current_bond_value = 0;
    if (maturity_at<now.getTime()) current_bond_value = Bond_at_maturity;
    else
      current_bond_value = Bond_at_maturity / ((1 + entrance_yield)**(diffDays/(365*24*60*60)));
    let tableData:any[] = [];
    tableData.push(
      {
        key: 0,
        pool: pool.toBase58() == POOL_30_ADDRESS.toBase58() ? "30-day" : "90-day",
        nft: decodedTradeDataState.NFT.toBase58(),
        trade_owner: decodedTradeDataState.current_owner.toBase58(),
        trade_account: trade_account,
        yield: entrance_yield * 100,
        issued_at: 1000* new BN(decodedTradeDataState.issued_date, 10, "le").toNumber(),
        maturity_at:1000* new BN(decodedTradeDataState.maturity_date, 10, "le").toNumber(),
        bond_value: bond_value,
        bond_value_maturity: Bond_at_maturity,
        current_bond_value: current_bond_value,
        profit_loss_maturity: Bond_at_maturity-bond_value,
        current_profit_loss: current_bond_value-bond_value,

      }
    )
    setTrade_dataSource(tableData);
  }
  const onRedeem = async () => {
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
        type: "info",
      });
      return;
    }
    if (!tradeData) return;

    const encodedPoolDataState = (await connection.getAccountInfo(tradeData.pool, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;


    let superB_fee = new BN(decodedPoolDataState.transaction_fee_SuperB, 10, "le").toNumber();
    if (SuperBbalance*(10**SUPERB_DECIMALS)  < superB_fee)
    {
      notify({
        message: 'You dont have enough SuperB to pay for transaction fee',
        type: "error",
      });
      return;
    }
    let Proceed = false;

    var now = new Date();
    let isAtMaturity = now.getTime()/1000 > tradeData.maturity_date ? true : false;
    let USDC_fee_rate = isAtMaturity ? parseInt(decodedPoolDataState.mature_redemption_fee_USDC.toString())/ 100 : parseInt(decodedPoolDataState.early_redemption_fee_USDC.toString())/ 100;

    // let message =
    // 'USDC fee: <strong>' + USDC_fee_rate + '%</strong><br/>' +
    // 'SuperB fee: <strong>' + superB_fee / (10**SUPERB_DECIMALS) + '</strong>';
    const message = `
    <div class="bg-gray-200 py-3 p-4 mt-3 sm:p-1 rounded-md">
      <div class="table2">
        <table class="w-full">
            <tr>
              <th class="text-left">
                <span class="th_span small_font_td_span">
                Redemption Fees: </span>
              </th>
              <td class="text-right">
                <span class="td_span small_font_td_span">
                <b>${USDC_fee_rate}</b>%</span>
              </td>
            </tr>

            <tr>
              <th class="text-left">
                <span class="th_span small_font_td_span">
                  Platform Fees: </span>
              </th>
              <td class="text-right">
                <span class="td_span small_font_td_span">
                <b> ${superB_fee / (10**SUPERB_DECIMALS)}</b> SB</span>
              </td>
            </tr>
        </table>
      </div>
    </div>
    `

    await Swal.fire({
      title: 'Redeem Confirmation',
      html:message,
      showCancelButton: true,
      confirmButtonText: 'Redeem'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Proceed = true;
        //console.log(Proceed);
      }
    })
    //console.log('here',Proceed);
    if (!Proceed) return;

    notify({
      message: 'Preparing...',
      type: "info",
    });

    //Create new SuperB token Account and transfer fee amount to it
    let superB_associated_token_account_address = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
    let usdc_associated_token_account_address = await findAssociatedTokenAddress(publicKey,USDC_MINT_ADDRESS);


    let [LP_POOL_TOKEN_PDA] = await PublicKey.findProgramAddress([new PublicKey(decodedPoolDataState.LP_Pool).toBuffer()], SUPERBONDS_PROGRAM_ID);
    let [TRADER_POOL_TOKEN_PDA] = await PublicKey.findProgramAddress([new PublicKey(decodedPoolDataState.Traders_Pool).toBuffer()], SUPERBONDS_PROGRAM_ID);
    let [SuperB_pda_address] = await PublicKey.findProgramAddress([new PublicKey(decodedStakingDataState.SuperB_Account).toBuffer()], SUPERBONDS_PROGRAM_ID);

    const buffers = [
      Buffer.from(Uint8Array.of(17))
    ];
    //console.log('pool',tradeData.pool.toBase58(),'trade_account',trade_account,'NFT',tradeData.NFT.toBase58());
    //console.log('usdc_associated_token_account_address',usdc_associated_token_account_address.toBase58());
    //console.log('superB_associated_token_account_address',superB_associated_token_account_address.toBase58());

    const NFT_info = await connection.getAccountInfo(tradeData.NFT);
    if (!NFT_info) return;
    // const NFT_data = MintLayout.decode(NFT_info.data);
    ////console.log(new PublicKey(NFT_data.mint));
    //Check if current user has any NFT with this NFT Mint Account
    let NFT_Balance = await getTokenBalance(connection,publicKey,tradeData.NFT,0);
    if (NFT_Balance != 1 ){
      notify({
        message: 'Cannot claim! This NFT is not your asset.',
        type: "error",
      });
      return;
    }

    let nft_associated_token_account_address = await findAssociatedTokenAddress(publicKey,tradeData.NFT);
    //console.log('nft_associated_token_account_address',nft_associated_token_account_address.toBase58());
    const Burn_one_NFT_Ix = Token.createBurnInstruction(
      TOKEN_PROGRAM_ID,
      tradeData.NFT,
      nft_associated_token_account_address,
      publicKey,
      [],
      1
    );
    //Look for Trader Data Account
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
    //console.log('resp',resp);
    if (resp.length == 0 ){
      notify({
        message: 'Cannot find Trader Data Account',
        type: "error",
      });
      return;
    }

    let rentExemption = 0;
    try{
      rentExemption = await connection.getMinimumBalanceForRentExemption(REDEEM_DATA_LAYOUT.span);
      if (rentExemption == 0){
        notify({
          message: 'Please try again, connection to Solana blockchain was interrupted',
          type: "error",
        });
        return;
      }
    } catch(e){
      notify({
        message: 'Please try again, connection to Solana blockchain was interrupted',
        type: "error",
      });
      return;
    }

    const redeem_data_account = new Account();
    //console.log('redeem_data_account',redeem_data_account.publicKey.toString());
    const createRedeemDataAccountIx = SystemProgram.createAccount({
        programId: SUPERBONDS_PROGRAM_ID,
        space: REDEEM_DATA_LAYOUT.span,
        lamports: rentExemption,
        fromPubkey: publicKey,
        newAccountPubkey: redeem_data_account.publicKey
    });

    const RedeemIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
          { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
          { pubkey: STAKING_DATA_ACCOUNT, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(tradeData.pool), isSigner: false, isWritable: true },
          { pubkey: resp[0].pubkey, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
          { pubkey: new PublicKey(decodedStakingDataState.SuperB_Account), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(trade_account), isSigner: false, isWritable: true },
          { pubkey: nft_associated_token_account_address, isSigner: false, isWritable: true },
          { pubkey: superB_associated_token_account_address, isSigner: false, isWritable: true },
          { pubkey: usdc_associated_token_account_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedPoolDataState.LP_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedPoolDataState.Traders_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedPoolDataState.SuperBonds_Rewards_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.Treasury), isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true},
          { pubkey: new PublicKey(decodedPoolDataState.LP_Mint_Account), isSigner: false, isWritable: true },

          { pubkey: new PublicKey(LP_POOL_TOKEN_PDA.toString()), isSigner: false, isWritable: false},
          { pubkey: new PublicKey(TRADER_POOL_TOKEN_PDA.toString()), isSigner: false, isWritable: false},
          { pubkey: redeem_data_account.publicKey, isSigner: false, isWritable: false},
          { pubkey: SuperB_pda_address, isSigner: false, isWritable: true},
          { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
        ],
        data: Buffer.concat(buffers)
    });
    let txid = await sendTransaction(connection,wallet,
        [
          createRedeemDataAccountIx,
          RedeemIx,
          Burn_one_NFT_Ix
      ]
      ,[redeem_data_account]);

    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{

            notify({
              message: 'Redeemed successfully',
              type: "success",
            });
            await delay(3000);
            history.push("/trade");
            return;


    }
  }
  const handleCopy=()=>[
    notify({
        message: 'Copied successfully',
        type: "success",
      })
  ]
  return (
    <>
        <div className="w-screen h-screen bg-black">
            <div  className="w-6/12 my-0 mx-auto pt-20 2xl:w-9/12 lg:w-11/12 ">
                <div className='flex pt-6 justify-around flex-col items-center'>
                    <div className="flex w-6/12 md:w-full md:mt-3 flex-col bg-gray-300 py-3 px-7 mt-4  rounded-md md:ml-0 sm:py-3 sm:px-2">
                        <div className="text-center">
                            <Text weight={'true'} size ={"16px"} transform={"true"} color={"#7CFA4C"}>Redeem NFT Bond Trade Token</Text>
                        </div>
                        <div className="flex justify-between py-2 px-2  mt-3 ß rounded-md" style={{'background':' linear-gradient(89.52deg, rgba(124, 250, 76, 0.1) 15.18%, rgba(124, 250, 76, 0) 76.06%), #1F2933'}}>
                          <Text className='' weight size="14px" opacity="0.5">Trade Account:</Text>
                          <div>
                            <Text>  <strong>{truncateStr(trade_account.toString(),8)} </strong> </Text>
                            <CopyToClipboard onCopy={() => handleCopy()} text={trade_account.toString()}><i className="far fa-clone fa-lg mr-1 cursor-pointer" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                          </div>
                        </div>
                        {isMyTrade &&
                            <div className="bg-gray-200 py-3 p-4 mt-3 sm:p-1 rounded-md">
                                <div className="w-full p-4 rounded-md" style={{"background":'#263B31'}}>
                                    <table className="w-full">
                                        <tr>
                                            <th className="float-left"><Text opacity={"0.75"} >USDC Balance:</Text></th>
                                            <td  className="float-right"><Text size={"19px"} color={"#7CFA4C"}>{formatInputNumber(formatNumberWithoutRounding.format(USDCbalance))}</Text></td>
                                        </tr>
                                        <tr>
                                            <th className="float-left">  <Text opacity={"0.75"}>SB Balance:</Text></th>
                                            <td className="float-right" ><Text size={"19px"}color={'white'}>{formatInputNumber(String(SuperBbalance))}</Text></td>
                                        </tr>
                                    </table>
                                </div>
                                <button onClick={()=>onRedeem()} className="rounded-sm mt-4 text-center bg-green-100 py-2 w-full">
                                    <Text color={"#000000"} weight='true'>REDEEM</Text>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="w-11/12 my-0 mx-auto pt-20 xxl:flex xxl:flex-col xxl:items-center">
                <div className="mt-2">
                    <table className="w-full block overflow-x-auto " style={{"borderCollapse":"separate","borderSpacing":" 0 4px","borderRadius":"1.5em"}}>

                        <tr className="bg-gray-300 ">
                            <th className="py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Pool</Text></th>
                            <th className="py-2 px-4 text-center min-w-td" ><Text opacity='0.5' size='13px'>Trade Owner</Text></th>
                            <th className="py-2 px-4  text-center min-w-td"><Text opacity='0.5' size='13px'>NFT</Text></th>
                            <th className="py-2 px-4 text-center min-w-td"><Text opacity='0.5' size='13px'>Trade Account</Text></th>
                            <th className="py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Yield</Text></th>
                            <th className="py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Issued at</Text></th>
                            <th className="py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Maturity</Text></th>
                            <th className="py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Bond Value at Entrance</Text></th>
                            <th className="py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Bond Value at Maturity</Text></th>
                            <th className="py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Current Bond Value</Text></th>
                            <th className="py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Profit at Maturity</Text></th>
                            <th className="py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Current Profit</Text></th>
                        </tr>

                        {Trade_dataSource && Trade_dataSource.length>0 && Trade_dataSource.map((value:any,key:any)=>{
                            return <>
                                <tr className="bg-gray-200">
                                <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{value.pool}</Text></td>
                                <td className="py-2 px-2 text-blue-100 text-center">
                                  <a className='text-blue-100 hover:text-blue-100' target="_blank" href={"https://explorer.solana.com/address/"+value.trade_owner+"?cluster=devnet"}>{truncateStr(value.trade_owner,3)}</a>
                                  <CopyToClipboard onCopy={handleCopy}  text={value.trade_owner}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                                </td>
                                <td className="py-2 px-2 text-blue-100 text-center">
                                  <a className='text-blue-100 hover:text-blue-100'  target="_blank" href={"https://explorer.solana.com/address/"+value.nft+"?cluster=devnet"}>{truncateStr(value.nft,3)}</a>
                                  <CopyToClipboard onCopy={handleCopy}  text={value.nft}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                                </td>
                                <td className="py-2 px-2 text-blue-100 text-center">
                                  <a className='text-blue-100 hover:text-blue-100' href={"#/redeem/"+value.trade_account}>{truncateStr(value.trade_account,3)}</a>
                                  <CopyToClipboard onCopy={handleCopy}  text={value.trade_account}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                                </td>
                                <td className="py-2 px-2 text-blue-100 text-center"><Text color='#7CFA4C'  size='13px'>{parseFloat(value.yield) < 0 ? <span style={{color:"red"}}>{parseFloat(value.yield).toFixed(2)}%</span> : <span style={{color:"green"}}>{parseFloat(value.yield).toFixed(2)}%</span>}</Text></td>
                                <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{convertTimeStamp(value.issued_at)}</Text></td>
                                <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{convertTimeStamp(value.maturity_at)}</Text></td>
                                <td className="py-2 px-2 text-blue-10 text-center"><Text  size='13px'>{parseFloat(value.bond_value).toFixed(1)}</Text></td>
                                <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.bond_value_maturity).toFixed(1)}</Text></td>
                                <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.current_bond_value).toFixed(1)}</Text></td>
                                <td className="py-2 px-2 text-blue-100 text-center"><Text color='#7CFA4C'  size='13px'>{parseFloat(value.profit_loss_maturity) < 0 ? <span style={{color:"red"}}>{parseFloat(value.profit_loss_maturity).toFixed(1)}</span> : <span style={{color:"green"}}>{parseFloat(value.profit_loss_maturity).toFixed(1)}</span>}</Text></td>
                                <td className="py-2 px-2 text-blue-100 text-center"><Text color='#F23838'  size='13px'>{parseFloat(value.current_profit_loss) < 0 ? <span style={{color:"red"}}>{parseFloat(value.current_profit_loss).toFixed(1)}</span> : <span style={{color:"green"}}>{parseFloat(value.current_profit_loss).toFixed(1)}</span>}</Text></td>
                                </tr>
                            </>
                        })}
                    </table>
                </div>
            </div>
        </div>
        <GlobalStyle maxWidth='400px' />
    </>
  );
};
