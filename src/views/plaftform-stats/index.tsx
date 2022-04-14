/* eslint-disable eqeqeq */
import React, { useEffect,useState } from "react";
import { useConnection,sendTransaction } from "../../contexts/connection";
// import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {STAKING_DATA_LAYOUT,StakingDataLayout} from "../../utils/staking_data_layout";
import { notify } from "../../utils/notifications";
import {
  USDC_MINT_ADDRESS,
  SUPERB_MINT_ADDRESS,
  STAKING_DATA_ACCOUNT,
  LP_TOKEN_30_MINT_ADDRESS,
  LP_TOKEN_90_MINT_ADDRESS,
  SUPERBONDS_PROGRAM_ID,
  USDC_DECIMALS,
  LP_TOKEN_DECIMALS,
  SUPERB_DECIMALS,
  FREE_TOKEN_PROGRAM_ID,
  FREE_USDC_ADDRESS,
  FREE_SUPERB_ADDRESS,
  FREE_TOKEN_DATA_ADDRESS,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  // PLATFORM_DATA_ACCOUNT,
  SUPERB_REWARDS_POOL_ADDRESS
  } from "../../utils/ids";
import { useWallet } from "@solana/wallet-adapter-react";
import { findAssociatedTokenAddress } from "../../contexts/accounts";
import { numberFormatter/* ,getTokenBalance */,delay } from "../../utils/utils";
import {  AccountLayout,
          Token
 } from "@solana/spl-token";
 import {
   PublicKey,
   LAMPORTS_PER_SOL,
   TransactionInstruction,
 } from '@solana/web3.js';
import BN from "bn.js";
import {Text} from "./platform-stats.styled";

export function PlatformStatsView() {

    const connection = useConnection();
    const wallet = useWallet();

    // const [SOLbalance,setSOLbalance] = useState(0);
    // const [USDCbalance,setUSDCbalance] = useState<any>(0);
    // const [SuperBbalance,setSuperBbalance] = useState<any>(0);
    // const [LP30balance,setLP30balance] = useState<any>(0);
    // const [LP90balance,setLP90balance] = useState<any>(0);
    // const [SOL_SB_LPbalance,setSOL_SB_LPbalance] = useState<any>(0);
    // const [PlatformData, setPlatformData] = useState<any>();
    const [StakingData, setStakingData] = useState<any>();
    const [SuperB_Rewards_Balance,setSuperB_Rewards_Balance] = useState(0);

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
      // setSOLbalance(await connection.getBalance(wallet.publicKey)/(10**9));
      // setUSDCbalance(await getTokenBalance(connection,wallet.publicKey,USDC_MINT_ADDRESS,USDC_DECIMALS));
      // setLP30balance(await getTokenBalance(connection,wallet.publicKey,LP_TOKEN_30_MINT_ADDRESS,LP_TOKEN_DECIMALS));
      // setLP90balance(await getTokenBalance(connection,wallet.publicKey,LP_TOKEN_90_MINT_ADDRESS,LP_TOKEN_DECIMALS));
      // setSuperBbalance(await getTokenBalance(connection,wallet.publicKey,SUPERB_MINT_ADDRESS,SUPERB_DECIMALS));
      // setSOL_SB_LPbalance(await getTokenBalance(connection,wallet.publicKey,SOL_SB_LP_MINT_ADDRESS,SOL_SB_LP_TOKEN_DECIMALS));
    }

    useEffect( () => {
      //if (!wallet.publicKey) return;
      getPlatformData()
      getAllBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet]);


    const onGetFreeSol = async () => {
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
      try {

        await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
        notify({
          message: "Airdrop 1 SOL request Sent",
          type: "success",
        });
        await delay(5000);
        // setSOLbalance(await connection.getBalance(publicKey)/(10**9));
      } catch (error) {
        notify({
          message: "Something wrong with your request",
          type: "error",
        });

      }
    }
    const getPlatformData = async () => {

        // const encodedPoolDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
        // const decodedPoolDataState = PLATFORM_DATA_LAYOUT.decode(encodedPoolDataState) as PlatformDataLayout;
        // //console.log(decodedPoolDataState);
        // setPlatformData(decodedPoolDataState);

        const encodedStakingDataState = (await connection.getAccountInfo(STAKING_DATA_ACCOUNT, 'singleGossip'))!.data;
        const decodedStakingDataState = STAKING_DATA_LAYOUT.decode(encodedStakingDataState) as StakingDataLayout;
        //console.log(decodedStakingDataState);
        setStakingData(decodedStakingDataState);

        const encodeSuperB_Rewards_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(SUPERB_REWARDS_POOL_ADDRESS), 'singleGossip'))!.data;
        const decodeSuperB_Rewards_Account_ADDRESS = AccountLayout.decode(encodeSuperB_Rewards_Account_ADDRESS);
        let SuperB_Rewards_Balance = new BN(decodeSuperB_Rewards_Account_ADDRESS.amount, 10, "le").toNumber() / (10**SUPERB_DECIMALS);
        setSuperB_Rewards_Balance(SuperB_Rewards_Balance);
      }
    const onGetFreeToken = async (_type:number) => {
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
      const buffers = [
        Buffer.from(Uint8Array.of(_type))
      ];
      // let data_account_info = next_account_info(account_info_iter)?;
      // let caller_account_info = next_account_info(account_info_iter)?;
      // //to send from
      // let token_account_info = next_account_info(account_info_iter)?;
      // //to receive tokens
      // let receiver_token_account_info = next_account_info(account_info_iter)?;
      // let token_program_info = next_account_info(account_info_iter)?;
      // let token_pda_info = next_account_info(account_info_iter)?;
      let token_account = FREE_USDC_ADDRESS;
      let mint_account = USDC_MINT_ADDRESS;
      let associated_token_account_address = null;

      if (_type == 3){
         token_account = FREE_USDC_ADDRESS;
         mint_account = USDC_MINT_ADDRESS;
         associated_token_account_address = await findAssociatedTokenAddress(publicKey,USDC_MINT_ADDRESS);

      }
      else if (_type == 1){
        token_account = FREE_SUPERB_ADDRESS;
        mint_account = SUPERB_MINT_ADDRESS;
        associated_token_account_address = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
      }
      let [token_pda_address/* ,token_pda_NONCE */] = await PublicKey.findProgramAddress([token_account.toBuffer()], FREE_TOKEN_PROGRAM_ID);

      if (!associated_token_account_address) return;
      let associated_token_account_address_info = await connection.getAccountInfo(associated_token_account_address);
        //check if lp token is initialized or not
      if (!associated_token_account_address_info) {
          //console.log("Create associated_token_account_address");
          let associated_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              mint_account,
              associated_token_account_address,
              publicKey,
              publicKey
          );
          let txid = await sendTransaction(connection,wallet,
              [associated_token_account_address_creationIx
              ],
            [],false);
          if (!txid){
            notify({
              message: 'Something wrong with your request!',
              type: "error",
            });
            return;
          }else{
            notify({
              message: 'Initialize Associated USDC Token Account successfully',
              type: "success",
            });
          }
      }
      const getFreeTokensIx = new TransactionInstruction({
          programId: FREE_TOKEN_PROGRAM_ID,
          keys: [
              { pubkey: FREE_TOKEN_DATA_ADDRESS, isSigner: false, isWritable: false },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: token_account, isSigner: false, isWritable: true },
              { pubkey: associated_token_account_address, isSigner: false, isWritable: true },
              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
              { pubkey: new PublicKey(token_pda_address), isSigner: false, isWritable: false }
          ],
          data: Buffer.concat(buffers)
      });
      let txid1 = await sendTransaction(connection,wallet,
          [
            getFreeTokensIx
        ]
        ,[],false);
      if (!txid1){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
        return;
      }else{
        notify({
          message: 'Request for Free Tokens sent!',
          type: "info",
        });
        await delay(5000);
        // setUSDCbalance(await getTokenBalance(connection,publicKey,USDC_MINT_ADDRESS,USDC_DECIMALS));
        // setSuperBbalance(await getTokenBalance(connection,publicKey,SUPERB_MINT_ADDRESS,SUPERB_DECIMALS));
        return;
      }
    }


  return (
    <div className="w-screen h-screen bg-black ">
        <div className="w-11/12 my-0 mx-auto pt-28 " style={{maxWidth:"1540px"}}>

           {/*<div className="flex pt-6 justify-between flex-wrap ">
                <div className="flex flex-col w-full my-0 mx-auto 2xxl:mt-3 mb-3">
                    <div className="flex w-7/12 mx-auto md:w-full my-0 flex-wrap justify-evenly sm:flex-col sm:w-9/12">
                        <button className="border-2 rounded-md border-green-100 px-6 py-1.5 inline-block sm:mb-5"  onClick={() => onGetFreeSol()}>
                            Get Free SOL
                        </button>
                        <button className="border-2 rounded-md border-green-100 px-6 py-1.5 inline-block sm:mb-5"    onClick={() => onGetFreeToken(1)}>
                            Get Free SB
                        </button>
                        <button className="border-2 rounded-md border-green-100 px-6 py-1.5"   onClick={() => onGetFreeToken(3)}>
                            Get Free USDC
                        </button>
                    </div>
                </div>
            </div>*/}

            <div className="flex flex-col w-7/12 mx-auto my-0 mt-5 md:w-full  bg-gray-300 py-5 px-7 xl:px-3 rounded-md X">
                <div className="text-center">
                    <Text size ={"18px"} transform={"true"}>Platform's stats</Text>
                </div>

                <div className="bg-gray-200 py-3 pl-3 pr-3  mt-2 rounded-md">
                    <table className="w-full">
                        <tr className='bg-gray-300 py-1'>
                            <th className="float-left py-2 px-2"><Text opacity={"50%"} >Staked 30-Day Pool LP Token:</Text></th>
                            <td className='text-right py-2 px-2'><Text>{StakingData ? numberFormatter.format(StakingData.totalProductivity_LP_Token[0]/1000000): null}</Text></td>
                        </tr>
                        <tr>
                            <th className="float-left  py-2  px-2">  <Text opacity={"0.5"}>Staked 90-Day Pool LP Token:</Text></th>
                            <td className='text-right  py-2 px-2'><Text>{StakingData ? numberFormatter.format(StakingData.totalProductivity_LP_Token[1]/1000000): null}</Text></td>
                        </tr>
                        {/* <tr className='bg-gray-300 py-1'>
                            <th className="float-left"><Text opacity={"0.5"}>Total SOL-SB Token Staked:</Text></th>
                            <td className='text-right'><Text>{StakingData ? numberFormatter.format(new BN(StakingData.totalProductivity_SOL_SB, 10, "le").toNumber()/1000000): null}</Text></td>
                        </tr> */}
                        <tr className='bg-gray-300 py-1'>
                            <th className="float-left py-2 px-2"><Text opacity={"0.5"}>Total SB Staked:</Text></th>
                            <td className='text-right py-2 px-2'><Text>{StakingData ? numberFormatter.format(new BN(StakingData.totalProductivity_SuperB, 10, "le").toNumber()/1000000): null}</Text></td>
                        </tr>
                        <tr>
                            <th className="float-left py-2 px-2"><Text opacity={"0.5"}>Total Active Trades Amount:</Text></th>
                            <td className='text-right py-2 px-2'><Text>{StakingData ? numberFormatter.format(new BN(StakingData.totalProductivity_Trades, 10, "le").toNumber()/1000000): null}</Text></td>
                        </tr>
                        <tr className='bg-gray-300 py-1'>
                            <th className="float-left py-2 px-2"><Text opacity={"0.5"}>SB Rewards Pool:</Text></th>
                            <td className='text-right py-2 px-2'><Text>{numberFormatter.format(SuperB_Rewards_Balance)}</Text></td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    </div>
    )
}
