import { Row, Col, Input, Form, Card, Button } from 'antd';
import React, { useEffect, useState, useCallback } from "react";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { notify } from "../../utils/notifications";
import { ConnectButton } from "./../../components/ConnectButton";
import { SUPERBONDS_PROGRAM_ID,
         PLATFORM_DATA_ACCOUNT,
         STAKING_DATA_ACCOUNT,
         SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
         SUNNY_MINT_ADDRESS,
         SABER_MINT_ADDRESS,
         ORCA_MINT_ADDRESS,
         SUNNY_TOKEN_DECIMALS,
         SABER_TOKEN_DECIMALS,
         ORCA_TOKEN_DECIMALS,
         USDC_MINT_ADDRESS,
         USDC_DECIMALS
       } from "../../utils/ids";
import { Numberu32,Numberu64 } from "../../utils/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {FARMING_REWARD_REQUEST_LAYOUT} from "../../utils/farming_reward_request_layout";
import {
  Account,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_CLOCK_PUBKEY,
  SystemProgram,
  TransactionInstruction,
  Transaction,
} from '@solana/web3.js';
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import BN from "bn.js";
import { numberFormatter,truncateStr,convertTimeStamp,getTokenBalance,delay } from "../../utils/utils";
import { findAssociatedTokenAddress } from "../../contexts/accounts";

export const FarmingRewardsView = () => {
  const connection = useConnection();
  const wallet = useWallet();

  const [Sunnybalance,setSunnybalance] = useState<any>(0);
  const [Saberbalance,setSaberbalance] = useState<any>(0);
  const [Orcabalance,setOrcabalance] = useState<any>(0);
  const [Usdcbalance,setUsdcbalance] = useState<any>(0);

  const [Sunnybalance_contract,setSunnybalance_contract] = useState<any>(0);
  const [Saberbalance_contract,setSaberbalance_contract] = useState<any>(0);
  const [Orcabalance_contract,setOrcabalance_contract] = useState<any>(0);
  const [Usdcbalance_contract,setUsdcbalance_contract] = useState<any>(0);

  const getAllBalances = async () => {
    if ( !wallet){
      // notify({
      //   message: 'Please connect to Sol network',
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

    setSunnybalance(await getTokenBalance(connection,wallet.publicKey,SUNNY_MINT_ADDRESS,SUNNY_TOKEN_DECIMALS));
    setSaberbalance(await getTokenBalance(connection,wallet.publicKey,SABER_MINT_ADDRESS,SABER_TOKEN_DECIMALS));
    setOrcabalance(await getTokenBalance(connection,wallet.publicKey,ORCA_MINT_ADDRESS,ORCA_TOKEN_DECIMALS));
    setUsdcbalance(await getTokenBalance(connection,wallet.publicKey,USDC_MINT_ADDRESS,USDC_DECIMALS));
    const encodedPoolDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedPoolDataState = PLATFORM_DATA_LAYOUT.decode(encodedPoolDataState) as PlatformDataLayout;
    ////console.log(decodedPoolDataState);
    setStakingPool(decodedPoolDataState);
    let sunny_reward_account = decodedPoolDataState.reserved_token_accounts[0];
    let saber_reward_account = decodedPoolDataState.reserved_token_accounts[1];
    let orca_reward_account = decodedPoolDataState.reserved_token_accounts[2];
    let usdc_reward_account = decodedPoolDataState.reserved_token_accounts[3];

    const encodeSunnyReward_ADDRESS = (await connection.getAccountInfo(new PublicKey(sunny_reward_account), 'singleGossip'))!.data;
    const decodeSunnyReward_ADDRESS = AccountLayout.decode(encodeSunnyReward_ADDRESS);
    let Sunny_Balance = new BN(decodeSunnyReward_ADDRESS.amount, 10, "le").toNumber() / (10**SUNNY_TOKEN_DECIMALS);
    setSunnybalance_contract(Sunny_Balance);

    const encodeSaberReward_ADDRESS = (await connection.getAccountInfo(new PublicKey(saber_reward_account), 'singleGossip'))!.data;
    const decodeSaberReward_ADDRESS = AccountLayout.decode(encodeSaberReward_ADDRESS);
    let Saber_Balance = new BN(decodeSaberReward_ADDRESS.amount, 10, "le").toNumber() / (10**SABER_TOKEN_DECIMALS);
    setSaberbalance_contract(Saber_Balance);

    const encodeOrcaReward_ADDRESS = (await connection.getAccountInfo(new PublicKey(orca_reward_account), 'singleGossip'))!.data;
    const decodeOrcaReward_ADDRESS = AccountLayout.decode(encodeOrcaReward_ADDRESS);
    let Orca_Balance = new BN(decodeOrcaReward_ADDRESS.amount, 10, "le").toNumber() / (10**ORCA_TOKEN_DECIMALS);
    setOrcabalance_contract(Orca_Balance);

    const encodeUSDCReward_ADDRESS = (await connection.getAccountInfo(new PublicKey(usdc_reward_account), 'singleGossip'))!.data;
    const decodeUSDCReward_ADDRESS = AccountLayout.decode(encodeUSDCReward_ADDRESS);
    let USDC_Balance = new BN(decodeUSDCReward_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setUsdcbalance_contract(USDC_Balance);

  }
  const [reward_request_data,setReward_Request_Data] = useState<any>([]);
  // const [reward_data,setReward_Data] = useState<any>([]);
  // const getRewardDataAccount = async () => {
  //   if ( !wallet){
  //     notify({
  //       message: 'Please connect to Sol network',
  //       type: "error",
  //     });
  //     return;
  //   }
  //   let publicKey = wallet.publicKey;
  //   if (!publicKey){
  //     notify({
  //       message: 'Please connect to Solana network',
  //       type: "error",
  //     });
  //     return;
  //   }
  //   let trader_Data_account = null;
  //   let filters = [
  //         {
  //           "dataSize":176
  //         }];
  //   const resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
  //     commitment: connection.commitment,
  //     filters,
  //     encoding: 'base64',
  //   });
  //
  //   if (resp.length == 0) return;
  //   //console.log('resp',resp);
  //   let array:any = [];
  //   resp.forEach(element => {
  //     let farming_reward = FARMING_REWARD_LAYOUT.decode(element.account.data);
  //     //console.log('farming_reward',farming_reward);
  //     let total_reward = new BN(farming_reward.total_reward, 10, "le").toNumber() / 1000000;
  //     let lp_staked_30 = farming_reward.total_lp_token_staked[0] / 1000000;
  //     let lp_staked_90 = farming_reward.total_lp_token_staked[1] / 1000000;
  //     //console.log('total_reward',total_reward,lp_staked_30,lp_staked_90);
  //     //if (total_reward>0 && (lp_staked_30 > 0 || lp_staked_90 > 0 ))
  //       array.push(farming_reward)
  //   });
  //   //new BN(value.received_at, 10, "le").toNumber() * 1000)
  //   //array.sort((a,b) => (new BN(a.received_at, 10, "le").toNumber() < new BN(b.received_at, 10, "le").toNumber()) ? 1 : ((new BN(b.received_at, 10, "le").toNumber() < new BN(a.received_at, 10, "le").toNumber()) ? -1 : 0))
  //   //console.log(array);
  //   setReward_Data(array);
  // }
  const getRewardRequestAccount = async () => {
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
    let trader_Data_account = null;
    let filters = [
          {
            "dataSize":160
          }];
    const resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    });

    if (resp.length == 0) {
      setReward_Request_Data([]);
      return;
    }
    //console.log('resp',resp);
    let array:any = [];
    resp.forEach(element => {
        let farming_reward_request = FARMING_REWARD_REQUEST_LAYOUT.decode(element.account.data);
        ////console.log('farming_reward_request',farming_reward_request);
        var obj = {
          data: farming_reward_request,
          account: element.pubkey,
        }
        array.push(obj)
    });
    //new BN(value.received_at, 10, "le").toNumber() * 1000)
    //array.sort((a,b) => (new BN(a.received_at, 10, "le").toNumber() < new BN(b.received_at, 10, "le").toNumber()) ? 1 : ((new BN(b.received_at, 10, "le").toNumber() < new BN(a.received_at, 10, "le").toNumber()) ? -1 : 0))
    ////console.log(array);
    setReward_Request_Data(array);
  }

  const [stakingPool, setStakingPool] = useState<any>();

  useEffect(() => {
    if (!wallet.publicKey) return;
    getAllBalances();
    getRewardRequestAccount();

  }, [wallet.publicKey]);

  const onProcessRequest = async (farm_id:number,request_account:string, claimer_account:string) => {
      if (!wallet){
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
      notify({
        message: 'Claim SUNNY (TEST only), transfer 0.1 SUNNY to user token account',
        type: "info",
      });
      const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
      const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

      if (decodedStakingDataState.operator_account.toString() != publicKey.toString()){
        notify({
          message: 'Only Operator Account allowed',
          type: "error",
        });
        return;
      }

      let claim_account_pk = new PublicKey(claimer_account);
      let reward_token_account = decodedStakingDataState.reserved_token_accounts[farm_id];
      let token_decimals = SUNNY_TOKEN_DECIMALS;
      let token_mint_address = SUNNY_MINT_ADDRESS;
      let associated_token_account_address = await findAssociatedTokenAddress(claim_account_pk,SUNNY_MINT_ADDRESS);
      let [TOKEN_PDA, TOKEN_NONCE] = await PublicKey.findProgramAddress([(new PublicKey(reward_token_account)).toBuffer()], SUPERBONDS_PROGRAM_ID);

      if (farm_id == 1){
        token_decimals = SABER_TOKEN_DECIMALS;
        token_mint_address = SABER_MINT_ADDRESS;
        associated_token_account_address = await findAssociatedTokenAddress(claim_account_pk,SABER_MINT_ADDRESS);
      }
      else if (farm_id == 2){
        token_decimals = ORCA_TOKEN_DECIMALS;
        token_mint_address = ORCA_MINT_ADDRESS;
        associated_token_account_address = await findAssociatedTokenAddress(claim_account_pk,ORCA_MINT_ADDRESS);
      }

      //console.log('associated_token_account_address',associated_token_account_address.toBase58());
      //check if associated_token_account_address is is_initialized
      let associated_token_account_address_info = await connection.getAccountInfo(associated_token_account_address);
        //check if associated token is initialized or not
      if (!associated_token_account_address_info) {
          //console.log("Create associated_token_account_address");
          let associated_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              token_mint_address,
              associated_token_account_address,
              claim_account_pk,
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
              message: 'Initialize Associated Token Account successfully',
              type: "success",
            });
          }
      }

      //Look for Trader Data Account
      let filters = [
            {
              "dataSize":560
            },
            {
              "memcmp": {
                "offset": 0,
                "bytes": (new PublicKey(request_account)).toString()
              }
            }];
      const resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
        commitment: connection.commitment,
        filters,
        encoding: 'base64',
      });
      ////console.log('resp',resp);
      if (resp.length == 0) return;

      const buffers = [
        Buffer.from(Uint8Array.of(37,farm_id,...new Numberu64(Math.round(0.1 * (10**token_decimals))).toBuffer()))
      ];

      const processIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: false },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: new PublicKey(request_account), isSigner: false, isWritable: true },
              { pubkey: resp[0].pubkey, isSigner: false, isWritable: true },  //trader data account
              { pubkey: new PublicKey(reward_token_account), isSigner: false, isWritable: true },
              { pubkey: associated_token_account_address, isSigner: false, isWritable: true },
              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
              { pubkey: TOKEN_PDA, isSigner: false, isWritable: false}
          ],
          data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection,wallet,
          [processIx]
        ,[],false);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        notify({
          message: '3rd Party Rewards Request proceeded',
          type: "success",
        });
        await delay(10000);
        getAllBalances();
        getRewardRequestAccount();
      }
  }

  const onCleanupRequest = async (request_account:string) =>{
    if (!wallet){
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
    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    if (decodedStakingDataState.operator_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Operator Account allowed',
        type: "error",
      });
      return;
    }
    const buffers = [
      Buffer.from(Uint8Array.of(38))
    ];

    const processIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: false },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: new PublicKey(request_account), isSigner: false, isWritable: true },
        ],
        data: Buffer.concat(buffers)
    });

    let txid = await sendTransaction(connection,wallet,
        [processIx]
      ,[],false);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Cleanup Request proceeded',
        type: "success",
      });
      await delay(10000);
      getAllBalances();
      getRewardRequestAccount();
    }
  }
  return (
    <div>
      <br/>
      <h2>Farming Rewards</h2>
      <Row>
        <br /><br />
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{paddingLeft:"10px"}}>
          <br /><br />
          <h2>Your Account:</h2>
          <p>Sunny Balance: <br/><span><strong>{Sunnybalance}</strong></span></p>
          <p>Saber Balance: <br/><span><strong>{Saberbalance}</strong></span></p>
          <p>Orca Balance: <br/><span><strong>{Orcabalance}</strong></span></p>
          <p>USDC Balance: <br/><span><strong>{Usdcbalance}</strong></span></p>

          <h2>List of 3rd party Reward Request</h2>
          <table className="w-full md:block overflow-x-auto " style={{"borderCollapse":"separate","borderSpacing":" 0 10px","borderRadius":"1.5em"}}>

            <tr className="bg-gray-300 ">
              <th className="py-4 px-10 my-2">request account</th>
              <th className="py-4 px-10 my-2">user_account</th>
              <th className="py-4 px-10 my-2">30-day Staked Amount</th>
              <th className="py-4 px-10 my-2">30-day Staked Amount</th>
              <th className="py-4 px-10 my-2">request_at</th>
              <th className="py-4 px-10 my-2">Action</th>
            </tr>

            {reward_request_data && reward_request_data.length>0 && reward_request_data.map((value:any,key:any)=>{
              return <>
                <tr className="bg-gray-200 my-2">
                  <td className="py-4 px-10">{truncateStr(value.account.toString(),5)}</td>
                  <td className="py-4 px-10">{truncateStr(value.data.user_account.toString(),5)}</td>
                  <td className="py-4 px-10">{value.data.user_lp_token_staked[0]/1000000}</td>
                  <td className="py-4 px-10">{value.data.user_lp_token_staked[1]/1000000}</td>
                  <td className="py-4 px-10">{convertTimeStamp(new BN(value.data.request_at, 10, "le").toNumber() * 1000)}</td>
                  <td className="py-4 px-10">
                  <button onClick={()=>onProcessRequest(0,value.account.toString(),value.data.user_account.toString())} className="border-2 hover:bg-green-100 hover:text-black rounded-md w-full border-green-100 px-6 py-1.5 inline-block">
                    Process
                  </button>
                  </td>
                </tr>
                </>
              })

            }

            {reward_request_data && reward_request_data.length==0 &&
              <tr className="bg-gray-200 my-2" >
                <td className="text-center font-medium" colSpan={5}>
                  No Data Found
                </td>
              </tr>
            }

          </table>

        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{paddingLeft:"10px"}}>
          <br /><br />
          <h2>Accounts that hold the rewards and under SuperBonds contract management</h2>
          <p><strong>Sunny Account: {!stakingPool ? null : stakingPool.reserved_token_accounts[0].toBase58()}</strong></p>
          <p><strong>Saber Account: {!stakingPool ? null : stakingPool.reserved_token_accounts[1].toBase58()}</strong></p>
          <p><strong>Orca Account: {!stakingPool ? null : stakingPool.reserved_token_accounts[2].toBase58()}</strong></p>
          <p><strong>USDC Account: {!stakingPool ? null : stakingPool.reserved_token_accounts[3].toBase58()}</strong></p>

          <h2>Total active Farming Reward Account:</h2>
          <p><strong>{!stakingPool ? null : stakingPool.active_farming_rewards_count}</strong></p>
          <h2>Balance in SuperBonds Contracts:</h2>
          <p>Sunny Balance: <br/><span><strong>{Sunnybalance_contract}</strong></span></p>
          <p>Saber Balance: <br/><span><strong>{Saberbalance_contract}</strong></span></p>
          <p>Orca Balance: <br/><span><strong>{Orcabalance_contract}</strong></span></p>
          <p>Usdc Balance: <br/><span><strong>{Usdcbalance_contract}</strong></span></p>
        </Col>
      </Row>


    </div>
  );
};
