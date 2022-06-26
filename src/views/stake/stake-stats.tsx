/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { notify } from "../../utils/notifications";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { SUPERBONDS_PROGRAM_ID,
         STAKING_DATA_ACCOUNT,
         SUPERB_MINT_ADDRESS,
         LP_TOKEN_30_MINT_ADDRESS,
         LP_TOKEN_90_MINT_ADDRESS,
         POOL_30_ADDRESS,
         POOL_90_ADDRESS,
         SUPERB_DECIMALS,
         LP_TOKEN_DECIMALS,
         PLATFORM_DATA_ACCOUNT,
         SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
         SUNNY_MINT_ADDRESS, SABER_MINT_ADDRESS, ORCA_MINT_ADDRESS,
         USDC_MINT_ADDRESS
       } from "../../utils/ids";
import { findAssociatedTokenAddress } from "../../contexts/accounts";
import { useInterval } from "../../hooks";
import {POOL_DATA_LAYOUT,PoolDataLayout} from "../../utils/pool_data_layout";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {STAKING_DATA_LAYOUT,StakingDataLayout} from "../../utils/staking_data_layout";
import {TRADER_LAYOUT} from "../../utils/trader_layout";
import {FARMING_REWARD_LAYOUT} from "../../utils/farming_reward_layout";
import {FARMING_REWARD_REQUEST_LAYOUT} from "../../utils/farming_reward_request_layout";
import axios from 'axios';
import {AxiosResponse} from 'axios';

import {ButtonText,Text,HoverToolTip} from "./stake.styled";
import BN from "bn.js";
import { Numberu64,numberFormatter,getTokenBalance,delay ,formatNumberWithoutRounding} from "../../utils/utils";
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
import Swal from 'sweetalert2';
import { Tooltip } from "antd";
import { ImInfo } from "react-icons/im";

interface ParamTypes {
  trade_account: string
}
let sunny_reward_accounts:any = [];
let saber_reward_accounts:any = [];

export function StakeStats() {

  const connection = useConnection();
  const wallet = useWallet();

  const [lq_amount30] = useState("");
  const [lq_amount90] = useState("");
  const [sb_amount] = useState("");
  const [sol_sb_lp_amount] = useState("");

  const [SuperBbalance,setSuperBbalance] = useState<any>(0);
  const [LP30balance,setLP30balance] = useState<any>(0);
  const [LP90balance,setLP90balance] = useState<any>(0);

  const [traderData,setTraderData] = useState<any>(null);
  const [PlatformData, setPlatformData] = useState<any>();
  const [StakingData, setStakingData] = useState<any>();

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
    //setSOLbalance(await connection.getBalance(wallet.publicKey)/(10**9));
    //setUSDCbalance(await getTokenBalance(connection,wallet.publicKey,USDC_MINT_ADDRESS,USDC_DECIMALS));
    setLP30balance(await getTokenBalance(connection,wallet.publicKey,LP_TOKEN_30_MINT_ADDRESS,LP_TOKEN_DECIMALS));
    setLP90balance(await getTokenBalance(connection,wallet.publicKey,LP_TOKEN_90_MINT_ADDRESS,LP_TOKEN_DECIMALS));
    setSuperBbalance(await getTokenBalance(connection,wallet.publicKey,SUPERB_MINT_ADDRESS,SUPERB_DECIMALS));

  }

  useEffect(() => {
    if (!wallet.publicKey) return;
    onRefresh();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);

  useEffect(() => {
    if (!wallet.publicKey) return;
    getRewardDataAccount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traderData,PlatformData]);

  useInterval(() => {
    let publicKey = wallet.publicKey;
    if(wallet && publicKey){
      onCheckReward();
      getRewardDataAccount();
    }
  }, 2000);

  const getTraderDataAccount = async () => {
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
    if (resp.length > 0){
      let decodedData = TRADER_LAYOUT.decode(resp[0].account.data);
      //console.log(decodedData);
      setTraderData(decodedData);
    }

  }
  const getPlatformData = async () => {
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
    const encodedPoolDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedPoolDataState = PLATFORM_DATA_LAYOUT.decode(encodedPoolDataState) as PlatformDataLayout;
    ////console.log(decodedPoolDataState);
    setPlatformData(decodedPoolDataState);

    const encodedStakingDataState = (await connection.getAccountInfo(STAKING_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = STAKING_DATA_LAYOUT.decode(encodedStakingDataState) as StakingDataLayout;
    ////console.log(decodedStakingDataState);
    setStakingData(decodedStakingDataState);

    // const encodeSuperB_Rewards_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(SUPERB_REWARDS_POOL_ADDRESS), 'singleGossip'))!.data;
    // const decodeSuperB_Rewards_Account_ADDRESS = AccountLayout.decode(encodeSuperB_Rewards_Account_ADDRESS);
    // let SuperB_Rewards_Balance = new BN(decodeSuperB_Rewards_Account_ADDRESS.amount, 10, "le").toNumber() / (10**SUPERB_DECIMALS);
    // setSuperB_Rewards_Balance(SuperB_Rewards_Balance);
  }

  const [sunny_unclaimed_rewards,setSunny_Unclaimed_Rewards] = useState(0);
  const [saber_unclaimed_rewards,setSaber_Unclaimed_Rewards] = useState(0);
  const [orca_unclaimed_rewards,setOrca_Unclaimed_Rewards] = useState(0);
  const [usdc_unclaimed_rewards,setUSDC_Unclaimed_Rewards] = useState(0);

  const getRewardDataAccount = async () => {
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
    try {
      const data = {userAccount:publicKey.toString()};
      const response:AxiosResponse<any> = await axios.post('https://mainnet-api.superbonds.finance/getRewards',data);

      ////console.log(response?.data.rewards.data.rewards);
      setSunny_Unclaimed_Rewards(response?.data.rewards.data.rewards.sunny);
      setSaber_Unclaimed_Rewards(response?.data.rewards.data.rewards.saber);
      setOrca_Unclaimed_Rewards(response?.data.rewards.data.rewards.orca);
      setUSDC_Unclaimed_Rewards(response?.data.rewards.data.rewards.usdc);
    } catch (error) {
      console.error(error);
    }

  }

  const onClaimExternalReward = async(farm_id:number) => {

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

    if (farm_id==0 && sunny_unclaimed_rewards==0){
      notify({
        message: 'No Sunny Reward available.',
        type: "error",
      });
      return;
    }
    else if (farm_id==1 && saber_unclaimed_rewards==0){
      notify({
        message: 'No Saber Reward available.',
        type: "error",
      });
      return;
    }
    else if (farm_id==2 && orca_unclaimed_rewards==0){
      notify({
        message: 'No Orca Reward available.',
        type: "error",
      });
      return;
    }

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    let mint_account = SUNNY_MINT_ADDRESS;
    let reward_accounts = sunny_reward_accounts;
    let account_length = reward_accounts.length;

    if (farm_id==1){
      mint_account = SABER_MINT_ADDRESS;
      reward_accounts = saber_reward_accounts;
      account_length = reward_accounts.length;
    }
    else if (farm_id==2){
      mint_account = ORCA_MINT_ADDRESS;
    }
    if (account_length > 50) account_length = 50;
    else if (account_length == 0) return;

    //console.log('account_length',account_length);

    let associated_token_account_address = await findAssociatedTokenAddress(publicKey,mint_account);
    //console.log('associated_token_account_address',associated_token_account_address.toBase58());
    //check if associated_USDC_token_account_address is is_initialized
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
          []);
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

    const buffers = [
      Buffer.from(Uint8Array.of(37,farm_id,account_length))
    ];
    let reward_pool = new PublicKey(decodedStakingDataState.reserved_token_accounts[farm_id]);
    let [rewards_pda_address/*,rewards_pda_NONCE*/] = await PublicKey.findProgramAddress([reward_pool.toBuffer()], SUPERBONDS_PROGRAM_ID);
    let keys_accounts = [
        { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
        { pubkey: publicKey, isSigner: true, isWritable: false },
        { pubkey: new PublicKey(decodedStakingDataState.operator_account), isSigner: false, isWritable: true },
        //Trader Data Account
        { pubkey: resp[0].pubkey, isSigner: false, isWritable: true },
        { pubkey: reward_pool, isSigner: false, isWritable: true },
        { pubkey: associated_token_account_address, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: rewards_pda_address, isSigner: false, isWritable: false},
        //{ pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false }
    ];

    for (let i = 0;i<account_length;i++){
      keys_accounts.push({ pubkey: reward_accounts[i], isSigner: false, isWritable: true });
    }

    const claimIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: keys_accounts,
        data: Buffer.concat(buffers)
    });

    let txid = await sendTransaction(connection,wallet,
        [claimIx]
      ,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: '3rd Party Rewards Claim Request Sent',
        type: "success",
      });
      notify({
        message: 'Updating balance...',
        type: "success",
      });
      await delay(5000);
      onRefresh();
      getRewardDataAccount();
    }
  }

  const onStake = async (pool:number,isClaim=false) => {
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

    let Proceed = false;
    if ((sunny_unclaimed_rewards != 0 || orca_unclaimed_rewards != 0 || saber_unclaimed_rewards !=0) && !isClaim)
    {
      let message =
      '<strong>You have SUNNY/SABER/ORCA rewards. These need to be claimed or will be dismissed after staking/unstaking LP Tokens</strong><br/>';
      await Swal.fire({
        title: 'Confirmation',
        html:message,
        showCancelButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor:'#7cfa4d'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Proceed = true;
          ////console.log(Proceed);
        }
      })
      if (!Proceed) return;
    }

    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;
    let lp_token_mint_address = pool == 30 ? LP_TOKEN_30_MINT_ADDRESS : LP_TOKEN_90_MINT_ADDRESS;
    let lp_token_amount = pool == 30 ? lq_amount30 : lq_amount90;
    let lp_token_balance  = pool == 30 ? LP30balance : LP90balance;

    const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    let SuperB_fee = new BN(decodedPoolDataState.transaction_fee_SuperB, 10, "le").toNumber();
    if (!isClaim){
      if (SuperBbalance*(10**SUPERB_DECIMALS)  < SuperB_fee)
      {
        notify({
          message: 'You dont have enough SuperB to pay for transaction fee',
          type: "error",
        });
        return;
      }
    }
    if (lp_token_balance < parseFloat(lp_token_amount))
    {
      notify({
        message: 'You dont have enough LP Token',
        type: "error",
      });
      return;
    }
    let associated_SUPERB_token_account_address = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
    //console.log('associated_SUPERB_token_account_address',associated_SUPERB_token_account_address.toBase58());

    let associated_LP_Token_token_account_address = await findAssociatedTokenAddress(publicKey,lp_token_mint_address);
    //console.log('associated_LP_Token_token_account_address',associated_LP_Token_token_account_address.toBase58());
    let buffers = null;
    if (!isClaim){
       buffers = [
        Buffer.from(Uint8Array.of(19,0, ...new Numberu64(parseFloat(lp_token_amount) * (10**LP_TOKEN_DECIMALS)).toBuffer()))
      ];
    }
    else {
       buffers = [
        Buffer.from(Uint8Array.of(19,0, ...new Numberu64(0).toBuffer()))
      ];
    }

    //Look for Trader Data Account
    let trader_Data_account = null;
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
    //return;
    let [SuperB_pda_address/*,SuperB_pda_NONCE*/] = await PublicKey.findProgramAddress([new PublicKey(decodedStakingDataState.SuperB_Account).toBuffer()], SUPERBONDS_PROGRAM_ID);

    if (resp.length == 0){
      //console.log('Initializing Trader Data Account and Stake...');
      trader_Data_account = new Account();
      //console.log('trader_Data_account',trader_Data_account.publicKey.toBase58());
      let rentExemption = 0;
      try{
        rentExemption = await connection.getMinimumBalanceForRentExemption(TRADER_LAYOUT.span);
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

      const createTraderDataAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: TRADER_LAYOUT.span,
          lamports: rentExemption,
          fromPubkey: publicKey,
          newAccountPubkey: trader_Data_account.publicKey
      });
      const stakeLP_TokenIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: STAKING_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: pool_address, isSigner: false, isWritable: true },
              //Trader Data Account
              { pubkey: trader_Data_account.publicKey, isSigner: false, isWritable: true },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: new PublicKey(decodedStakingDataState.SuperB_Account), isSigner: false, isWritable: true },
              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
              { pubkey: SuperB_pda_address, isSigner: false, isWritable: true},
              { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
              { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
              { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true},
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
              { pubkey: associated_LP_Token_token_account_address, isSigner: false, isWritable: true },
              { pubkey: new PublicKey(decodedPoolDataState.Staked_LP_Token_Account), isSigner: false, isWritable: true },
              { pubkey: lp_token_mint_address, isSigner: false, isWritable: true},

          ],
          data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection,wallet,
          [createTraderDataAccountIx,stakeLP_TokenIx]
        ,[trader_Data_account]);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        //await delay(10000);

        if (!isClaim){
          notify({
            message: 'Staking Request Sent',
            type: "success",
          });
        }
        else{
          notify({
            message: 'Claim SuperB Rewards from ' + pool+'-days Pool LP Staking Sent',
            type: "success",
          });
        }
        notify({
          message: 'Updating balance...',
          type: "success",
        });
        await delay(5000);
        onRefresh();
        return;


      }
    }
    else{
      //console.log('Stake...');
      const stakeLP_TokenIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: STAKING_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: pool_address, isSigner: false, isWritable: true },
            //Trader Data Account
            { pubkey: resp[0].pubkey, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: new PublicKey(decodedStakingDataState.SuperB_Account), isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: SuperB_pda_address, isSigner: false, isWritable: true},
            { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
            { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
            { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true},
            { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
            { pubkey: associated_LP_Token_token_account_address, isSigner: false, isWritable: true },
            { pubkey: new PublicKey(decodedPoolDataState.Staked_LP_Token_Account), isSigner: false, isWritable: true },
            { pubkey: lp_token_mint_address, isSigner: false, isWritable: true},
          ],
          data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection,wallet,
          [stakeLP_TokenIx]
        ,[]);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        if (!isClaim){
          notify({
            message: 'Staking Request Sent',
            type: "success",
          });
        }
        else{
          notify({
            message: 'Claim SuperB Rewards from Pool LP Staking Sent',
            type: "success",
          });
        }
        notify({
          message: 'Updating balance...',
          type: "success",
        });
        await delay(5000);
        onRefresh();
      }
    }


  }

  const onStakeSB = async (isClaim=false) => {
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

    // let sb_token_balance  = SuperBbalance;

    const encodedPoolDataState = (await connection.getAccountInfo(POOL_30_ADDRESS, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    let SuperB_fee = new BN(decodedPoolDataState.transaction_fee_SuperB, 10, "le").toNumber();
    if (!isClaim){
      if (SuperBbalance*(10**SUPERB_DECIMALS)  < SuperB_fee + parseFloat(sb_amount)* (10**SUPERB_DECIMALS))
      {
        notify({
          message: 'You dont have enough SuperB to pay for transaction fee',
          type: "error",
        });
        return;
      }
    }

    let associated_SUPERB_token_account_address = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
    //console.log('associated_SUPERB_token_account_address',associated_SUPERB_token_account_address.toBase58());
    let buffers = null;
    if (!isClaim)
     buffers = [
       Buffer.from(Uint8Array.of(19,2, ...new Numberu64(parseFloat(sb_amount) * (10**SUPERB_DECIMALS)).toBuffer()))
      ];
    else
      buffers = [
        Buffer.from(Uint8Array.of(19,2, ...new Numberu64(0).toBuffer()))
       ];

    //Look for Trader Data Account
    let trader_Data_account = null;
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
    //return;
    let [SuperB_pda_address,/* SuperB_pda_NONCE */] = await PublicKey.findProgramAddress([new PublicKey(decodedStakingDataState.SuperB_Account).toBuffer()], SUPERBONDS_PROGRAM_ID);

    if (resp.length == 0){
      //console.log('Initializing Trader Data Account and Stake...');
      trader_Data_account = new Account();
      //console.log('trader_Data_account',trader_Data_account.publicKey.toBase58());
      let rentExemption = 0;
      try{
        rentExemption = await connection.getMinimumBalanceForRentExemption(TRADER_LAYOUT.span);
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

      const createTraderDataAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: TRADER_LAYOUT.span,
          lamports: rentExemption,
          fromPubkey: publicKey,
          newAccountPubkey: trader_Data_account.publicKey
      });

      const stakeSB_TokenIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: STAKING_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: POOL_30_ADDRESS, isSigner: false, isWritable: true },
              //Trader Data Account
              { pubkey: trader_Data_account.publicKey, isSigner: false, isWritable: true },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: new PublicKey(decodedStakingDataState.SuperB_Account), isSigner: false, isWritable: true },
              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
              { pubkey: SuperB_pda_address, isSigner: false, isWritable: true},
              { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
              { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
              { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true},
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
              { pubkey: new PublicKey(decodedStakingDataState.Staked_SB_Token_Account), isSigner: false, isWritable: true },
          ],
          data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection,wallet,
          [createTraderDataAccountIx,stakeSB_TokenIx]
        ,[trader_Data_account]);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        notify({
          message: 'Staking Request Sent',
          type: "success",
        });
        notify({
          message: 'Updating balance...',
          type: "success",
        });
        await delay(5000);
        onRefresh();
      }
    }
    else{
      ////console.log('Stake...');
      const stakeSB_TokenIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: STAKING_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: POOL_30_ADDRESS, isSigner: false, isWritable: true },
            //Trader Data Account
            { pubkey: resp[0].pubkey, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: new PublicKey(decodedStakingDataState.SuperB_Account), isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: SuperB_pda_address, isSigner: false, isWritable: true},
            { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
            { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
            { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true},
            { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
            { pubkey: new PublicKey(decodedStakingDataState.Staked_SB_Token_Account), isSigner: false, isWritable: true },
          ],
          data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection,wallet,
          [stakeSB_TokenIx]
        ,[]);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        if (!isClaim){
          notify({
            message: 'Staking Request Sent',
            type: "success",
          });
        }
        else{
          notify({
            message: 'Claim SuperB Rewards from SuperB Staking Sent',
            type: "success",
          });
        }
        notify({
          message: 'Updating balance...',
          type: "success",
        });
        await delay(5000);
        onRefresh();
      }
    }


  }
  const onRefresh = async () =>{
    await getTraderDataAccount();
    await getPlatformData();
    await getAllBalances();

  }
  const onClaim = async () => {
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
    // if (sunny_unclaimed_rewards!=0){
    //   await onClaimExternalReward(0)
    // }
    // if (saber_unclaimed_rewards!=0){
    //   await onClaimExternalReward(1)
    // }
    // if (orca_unclaimed_rewards!=0){
    //   await onClaimExternalReward(2)
    // }
    // if (usdc_unclaimed_rewards!=0){
    //   await onClaimExternalReward(3)
    // }
    if (unclaimed_SuperB_Staking !=0){
      notify({
        message: 'Claiming SB Staking Rewards....',
        type: "info",
      });
      await onStakeSB(true);
    }


    if (unclaimed_LP_30_Staking !=0){
      notify({
        message: 'Claiming 30-day Staking Rewards....',
        type: "info",
      });
      await onStake(30,true);
    }

    if (unclaimed_LP_90_Staking !=0){
      notify({
        message: 'Claiming 90-day Staking Rewards....',
        type: "info",
      });
      await onStake(90,true);
    }

    if (unclaimed_Trading_Rewards == 0 ){
      await delay(3000);
      onRefresh();
      return;
    }

    //Claim Trade Rewards
    // const encodedPoolDataState = (await connection.getAccountInfo(POOL_30_ADDRESS, 'singleGossip'))!.data;
    // const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
    notify({
      message: 'Claiming Trade Rewards....',
      type: "info",
    });
    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;


    let associated_SUPERB_token_account_address = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
    //console.log('associated_SUPERB_token_account_address',associated_SUPERB_token_account_address.toBase58());
    let buffers = [
        Buffer.from(Uint8Array.of(19,3, ...new Numberu64(0).toBuffer()))
       ];

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
    ////console.log('resp',resp);
    //return;
    let [SuperB_pda_address/* ,SuperB_pda_NONCE */] = await PublicKey.findProgramAddress([new PublicKey(decodedStakingDataState.SuperB_Account).toBuffer()], SUPERBONDS_PROGRAM_ID);

    if (resp.length > 0){
      ////console.log('Stake...');
      const stakeSB_TokenIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: STAKING_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: POOL_30_ADDRESS, isSigner: false, isWritable: true },
            //Trader Data Account
            { pubkey: resp[0].pubkey, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: new PublicKey(decodedStakingDataState.SuperB_Account), isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: SuperB_pda_address, isSigner: false, isWritable: true},
            { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
            { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
            { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true},
            { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
            { pubkey: new PublicKey(decodedStakingDataState.Staked_SB_Token_Account), isSigner: false, isWritable: true },
          ],
          data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection,wallet,
          [stakeSB_TokenIx]
        ,[]);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{

          notify({
            message: 'Claim SuperB Rewards from Trading Activities Sent',
            type: "success",
          });


        await delay(3000);
        onRefresh();
      }
    }
  }
  const onClaimExternal = async () => {
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
    if (sunny_unclaimed_rewards == 0 && saber_unclaimed_rewards == 0 && orca_unclaimed_rewards == 0 && usdc_unclaimed_rewards == 0){
      notify({
        message: 'You dont have any rewards to claim',
        type: "error",
      });
      return;
    }
    notify({
      message: 'Claiming 3rd party Rewards....',
      type: "info",
    });

      let trader_Data_account = null;
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
      let resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
        commitment: connection.commitment,
        filters,
        encoding: 'base64',
      });

      if (resp.length == 0) return;
      trader_Data_account = resp[0].pubkey;
      //Create associated_token_account_address for SUNNY/SABER if not created
      let associated_Sunny_account_address = await findAssociatedTokenAddress(publicKey,SUNNY_MINT_ADDRESS);
      ////console.log('associated_Sunny_account_address',associated_Sunny_account_address.toBase58());
      //check if associated_USDC_token_account_address is is_initialized
      let associated_Sunny_account_address_info = await connection.getAccountInfo(associated_Sunny_account_address);
        //check if lp token is initialized or not
      if (!associated_Sunny_account_address_info) {
          notify({
            message: 'Creating SUNNY reward account....',
            type: "info",
          });
          ////console.log("Create associated_Sunny_account_address");
          let associated_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              SUNNY_MINT_ADDRESS,
              associated_Sunny_account_address,
              publicKey,
              publicKey
          );
          let txid = await sendTransaction(connection,wallet,
              [associated_token_account_address_creationIx
              ],
            []);
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

      let associated_Saber_account_address = await findAssociatedTokenAddress(publicKey,SABER_MINT_ADDRESS);
      ////console.log('associated_Saber_account_address',associated_Saber_account_address.toBase58());
      //check if associated_USDC_token_account_address is is_initialized
      let associated_Saber_account_address_info = await connection.getAccountInfo(associated_Saber_account_address);
        //check if lp token is initialized or not
      if (!associated_Saber_account_address_info) {
          notify({
            message: 'Creating SABER reward account....',
            type: "info",
          });
          ////console.log("Create associated_Saber_account_address");
          let associated_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              SABER_MINT_ADDRESS,
              associated_Saber_account_address,
              publicKey,
              publicKey
          );
          let txid = await sendTransaction(connection,wallet,
              [associated_token_account_address_creationIx
              ],
            []);
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

      //Orca in mainnet to create associated token account
      let associated_Orca_account_address = await findAssociatedTokenAddress(publicKey,ORCA_MINT_ADDRESS);
      ////console.log('associated_Saber_account_address',associated_Saber_account_address.toBase58());
      //check if associated_USDC_token_account_address is is_initialized
      let associated_Orca_account_address_info = await connection.getAccountInfo(associated_Orca_account_address);
        //check if lp token is initialized or not
      if (!associated_Orca_account_address_info) {
          notify({
            message: 'Creating ORCA reward account....',
            type: "info",
          });
          ////console.log("Create associated_Saber_account_address");
          let associated_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              ORCA_MINT_ADDRESS,
              associated_Orca_account_address,
              publicKey,
              publicKey
          );
          let txid = await sendTransaction(connection,wallet,
              [associated_token_account_address_creationIx
              ],
            []);
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
      //USDC in mainnet to create associated token account
      let associated_USDC_account_address = await findAssociatedTokenAddress(publicKey,USDC_MINT_ADDRESS);
      ////console.log('associated_Saber_account_address',associated_Saber_account_address.toBase58());
      //check if associated_USDC_token_account_address is is_initialized
      let associated_USDC_account_address_info = await connection.getAccountInfo(associated_USDC_account_address);
        //check if lp token is initialized or not
      if (!associated_USDC_account_address_info) {
          notify({
            message: 'Creating USDC reward account....',
            type: "info",
          });
          ////console.log("Create associated_Saber_account_address");
          let associated_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              USDC_MINT_ADDRESS,
              associated_USDC_account_address,
              publicKey,
              publicKey
          );
          let txid = await sendTransaction(connection,wallet,
              [associated_token_account_address_creationIx
              ],
            []);
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

      filters = [
            {
              "dataSize":160
            },
            {
              "memcmp": {
                "offset": 0,
                "bytes": publicKey.toBase58()
              }
            }];
      resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
        commitment: connection.commitment,
        filters,
        encoding: 'base64',
      });

      if (resp.length > 0) {
        notify({
          message: 'You already have pending requests. Please wait until it finish.',
          type: "error",
        });
        return;
      }
      let rentExemption = 0;
      try{
        rentExemption = await connection.getMinimumBalanceForRentExemption(FARMING_REWARD_REQUEST_LAYOUT.span);
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
      //Create Request Account to save request information
      const request_state_account = new Account();
      ////console.log('trade_state_account',trade_state_account.publicKey.toString());
      const createRequestStateAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: FARMING_REWARD_REQUEST_LAYOUT.span,
          lamports: rentExemption,
          fromPubkey: publicKey,
          newAccountPubkey: request_state_account.publicKey
      });

      const buffers = [
        Buffer.from(Uint8Array.of(35))
      ];

      const requestIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              //Trader Data Account
              { pubkey: trader_Data_account, isSigner: false, isWritable: false },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: request_state_account.publicKey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }
          ],
          data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection,wallet,
          [createRequestStateAccountIx,requestIx]
        ,[request_state_account]);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{

          notify({
            message: '3rd Party Rewards Claim Request Sent. It might take up to 2 minutes to process.',
            type: "success",
          });
          onRefresh();
          getRewardDataAccount();
          return;


      }

  }

  const [unclaimed_SuperB_Staking,setUnclaimed_SuperB_Staking] = useState(0);
  const [unclaimed_SOL_SB_Staking,setUnclaimed_SOL_SB_Staking] = useState(0);
  const [unclaimed_LP_30_Staking,setUnclaimed_LP_30_Staking] = useState(0);
  const [unclaimed_LP_90_Staking,setUnclaimed_LP_90_Staking] = useState(0);
  const [unclaimed_Trading_Rewards,setUnclaimed_Trading_Rewards] = useState(0);

  const onCheckReward = async () =>{
    if (!traderData || !PlatformData || !StakingData) return;

    // UserInfo storage userInfo = users[msg.sender];
    //  uint _accAmountPerShare = accAmountPerShare;
    //  // uint256 lpSupply = totalProductivity;
    //  if (block.number > lastRewardBlock && totalProductivity != 0) {
    //      uint multiplier = block.number.sub(lastRewardBlock);
    //      uint reward = multiplier.mul(wasabiPerBlock);
    //      _accAmountPerShare = _accAmountPerShare.add(reward.mul(1e12).div(totalProductivity));
    //  }
    //  return userInfo.amount.mul(_accAmountPerShare).div(1e12).sub(userInfo.rewardDebt);
    let now = new Date();
    //Calculate current Rate
    //Every 90 days reduce 10% rewards
    let time_range = Math.round((now.getTime()/1000 - PlatformData.start_time) / (90*24*60*60));
    let power_factor = Math.pow((10000.0 - PlatformData.decrease_rate)/10000.0, time_range);
    let currentRate =  PlatformData.start_rate * power_factor / 100.0;
    // console.log('currentRate',currentRate);
    //Trading Rewards Calculation
    let _accAmountPerShare_Trades =  new BN(StakingData.accAmountPerShare_Trades, 10, "le").toNumber()/1000000;
    let lastRewardTime_Trades = new BN(StakingData.lastRewardTime_Trades, 10, "le").toNumber();
    let totalProductivity_Trades = new BN(StakingData.totalProductivity_Trades, 10, "le").toNumber()/1000000;

    if (now.getTime()/1000 > lastRewardTime_Trades && totalProductivity_Trades != 0) {
        let multiplier = now.getTime()/1000 - lastRewardTime_Trades;
        let reward = multiplier * currentRate * PlatformData.bond_traders_ratio / 10000;
        _accAmountPerShare_Trades += reward / totalProductivity_Trades;
    }
    let my_total_staked_Trades = new BN(traderData.total_active_trades, 10, "le").toNumber()/1000000;
    let my_rewardDebt_Trades = new BN(traderData.rewardDebt_Trades, 10, "le").toNumber()/1000000;
    // console.log('my_total_staked_Trades',my_total_staked_Trades,totalProductivity_Trades);
    // console.log('rewards',my_total_staked_Trades * _accAmountPerShare_Trades - my_rewardDebt_Trades);
    setUnclaimed_Trading_Rewards(my_total_staked_Trades * _accAmountPerShare_Trades - my_rewardDebt_Trades);

    //SuperB Staking Rewards Calculation
    let _accAmountPerShare_SuperB =  new BN(StakingData.accAmountPerShare_SuperB, 10, "le").toNumber()/1000000;
    let lastRewardTime_SuperB = new BN(StakingData.lastRewardTime_SuperB, 10, "le").toNumber();
    let totalProductivity_SuperB = new BN(StakingData.totalProductivity_SuperB, 10, "le").toNumber()/1000000;

    if (now.getTime()/1000 > lastRewardTime_SuperB && totalProductivity_SuperB != 0) {
        let multiplier = now.getTime()/1000 - lastRewardTime_SuperB;
        let reward = multiplier * currentRate * PlatformData.superb_staking_reward_ratio / 10000;
        _accAmountPerShare_SuperB += reward / totalProductivity_SuperB;
    }
    let my_total_staked_SuperB = new BN(traderData.total_SuperB_staked, 10, "le").toNumber()/1000000;
    let my_rewardDebt_SuperB = new BN(traderData.rewardDebt_SuperB, 10, "le").toNumber()/1000000;
    setUnclaimed_SuperB_Staking(my_total_staked_SuperB * _accAmountPerShare_SuperB - my_rewardDebt_SuperB);

    //30-day LP Staking Rewards Calculation
    let _accAmountPerShare_LP_Token30 =  StakingData.accAmountPerShare_LP_Token[0]/1000000;
    let lastRewardTime_LP_Token30 = StakingData.lastRewardTime_LP_Token[0];
    let totalProductivity_LP_Token30 = StakingData.totalProductivity_LP_Token[0]/1000000;
    let risk_factor_30 = PlatformData.pool_risk_factor_vector[0]/1000000;

    if (now.getTime()/1000 > lastRewardTime_LP_Token30 && totalProductivity_LP_Token30 != 0) {
        let multiplier = now.getTime()/1000 - lastRewardTime_LP_Token30;
        let reward = risk_factor_30 * multiplier * currentRate * PlatformData.lp_token_holders_ratio / 10000;
        _accAmountPerShare_LP_Token30 += (reward / totalProductivity_LP_Token30) * 100 / (parseFloat(PlatformData.risk_factor_x.toString()) + 100);
    }
    let my_total_staked_LP_Token30 = traderData.total_LP_Token_staked_vector[0]/1000000;
    let my_rewardDebt_LP_Token30 = traderData.rewardDebt_LP[0]/1000000;
    setUnclaimed_LP_30_Staking(my_total_staked_LP_Token30 * _accAmountPerShare_LP_Token30 - my_rewardDebt_LP_Token30);

    //90-day LP Staking Rewards Calculation
    let _accAmountPerShare_LP_Token90 =  StakingData.accAmountPerShare_LP_Token[1]/1000000;
    let lastRewardTime_LP_Token90 = StakingData.lastRewardTime_LP_Token[1];
    let totalProductivity_LP_Token90 = StakingData.totalProductivity_LP_Token[1]/1000000;
    let risk_factor_90 = PlatformData.pool_risk_factor_vector[1]/1000000;

    if (now.getTime()/1000 > lastRewardTime_LP_Token90 && totalProductivity_LP_Token90 != 0) {
        let multiplier = now.getTime()/1000 - lastRewardTime_LP_Token90;
        let reward = risk_factor_90 * multiplier * currentRate * PlatformData.lp_token_holders_ratio / 10000;
        _accAmountPerShare_LP_Token90 += (reward / totalProductivity_LP_Token90) * 100 / (parseFloat(PlatformData.risk_factor_x.toString()) + 100);
    }
    let my_total_staked_LP_Token90 = traderData.total_LP_Token_staked_vector[1]/1000000;
    let my_rewardDebt_LP_Token90 = traderData.rewardDebt_LP[1]/1000000;
    setUnclaimed_LP_90_Staking(my_total_staked_LP_Token90 * _accAmountPerShare_LP_Token90 - my_rewardDebt_LP_Token90);

  }

  return (
    // <div className="flex pt-6 justify-center md:flex-col mb-3">
        <div className='flex flex-col w-5/12  lg:w-full md:w-full sm:w-full md:self-center pr-3 lg:pr-0 lg:pt-0'>

            <div className="flex flex-col w-full md:w-full bg-gray-300 py-8 px-3 xl:px-3 rounded-md neon-bottom-card selected-box-neon">

                <div className="pb-6 pt-1 pl-1 pr-1 rounded-md ">
                  <div className='text-grid cursor-pointer grid grid-cols-1'>
                    <Text size='16px' weight color='#7cfa4d'>FD Purchaser Stats
                      <Tooltip placement="rightTop" title={'The live value of all your outstanding FDs and all attributable SB not claimed'}>
                      <ImInfo  className='info-circle ml-0.5'  style={{width:"13px", marginBottom:"2px"}} /></Tooltip>
                    </Text>
                  </div>
                  <div className='grid grid-cols-3 bg-gray-200 rounded-t-md px-3 mt-2 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Outstanding FD Value</Text>
                    <Text className='' size={"14px"}color={'white'}>{traderData ? formatNumberWithoutRounding.format(new BN(traderData.total_active_trades, 10, "le").toNumber()/1000000): "0.00"}</Text>
                  </div>

                  <div className='grid grid-cols-3 bg-gray-200 mt-0.5 rounded-b-md px-3 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Unclaimed SB Amount</Text>
                    <Text className='' size={"14px"}color={'white'}>{formatNumberWithoutRounding.format(unclaimed_Trading_Rewards)}</Text>
                  </div>

                  <div className='text-grid cursor-pointer grid grid-cols-1 mt-7'>
                    <Text size='16px' weight color='#7cfa4d'>FD LP Stats
                      <Tooltip placement="rightTop" title={'The number of staked LP tokens in each respective pool including all unclaimed rewards, consisting of SB and 3rd party tokens(Other Rewards)'}>
                      <ImInfo  className='info-circle ml-0.5'  style={{width:"13px", marginBottom:"2px"}} /></Tooltip>
                    </Text>
                  </div>
                  <div className='grid grid-cols-3 bg-gray-200 rounded-t-md px-3 mt-2 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Staked 30-Day Pool LP Token</Text>
                    <Text className='' size={"14px"}color={'white'}>{traderData ? formatNumberWithoutRounding.format(traderData.total_LP_Token_staked_vector[0]/1000000): null}</Text>
                  </div>

                  <div className='grid grid-cols-3 bg-gray-200 mt-0.5  px-3 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Unclaimed 30-Day Pool SB</Text>
                    <Text className='' size={"14px"}color={'white'}>{formatNumberWithoutRounding.format(unclaimed_LP_30_Staking)}</Text>
                  </div>


                  <div className='grid grid-cols-3 bg-gray-200 mt-0.5  px-3 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Staked 90-Day Pool LP Token</Text>
                    <Text className='' size={"14px"}color={'white'}>{traderData ? formatNumberWithoutRounding.format(traderData.total_LP_Token_staked_vector[1]/1000000): null}</Text>
                  </div>

                  <div className='grid grid-cols-3 bg-gray-200 mt-0.5  px-3 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Unclaimed 90-Day Pool SB</Text>
                    <Text className='' size={"14px"}color={'white'}>{formatNumberWithoutRounding.format(unclaimed_LP_90_Staking)}</Text>
                  </div>

                  <div className='grid grid-cols-3 bg-gray-200 mt-0.5 px-3 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Other Rewards</Text>
                    <Text className='' size={"14px"}color={'white'}>{sunny_unclaimed_rewards?formatNumberWithoutRounding.format(sunny_unclaimed_rewards):'0.00'} S1, {saber_unclaimed_rewards?formatNumberWithoutRounding.format(saber_unclaimed_rewards):'0.00'} S2,</Text>
                  </div>

                  <div className='grid grid-cols-3 bg-gray-200 rounded-b-md px-3 '>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}></Text>
                    <Text className='' size={"14px"}color={'white'}>{orca_unclaimed_rewards?formatNumberWithoutRounding.format(orca_unclaimed_rewards):'0.00'} O, {usdc_unclaimed_rewards?formatNumberWithoutRounding.format(usdc_unclaimed_rewards):'0.00'} U  </Text>
                  </div>

                  <div className='text-grid cursor-pointer grid grid-cols-1 mt-7 '>
                    <Text size='16px' weight color='#7cfa4d'>SB Staking Stats
                      <Tooltip placement="rightTop" title={'The number of SB staked and all attributable SB not claimed'}>
                      <ImInfo  className='info-circle ml-0.5'  style={{width:"13px", marginBottom:"2px"}} /></Tooltip>
                    </Text>
                  </div>
                  <div className='grid grid-cols-3 bg-gray-200 px-3 mt-2 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Total SB Staked</Text>
                    <Text className='' size={"14px"}color={'white'}>{traderData ? formatNumberWithoutRounding.format(new BN(traderData.total_SuperB_staked, 10, "le").toNumber()/1000000): null}</Text>
                  </div>

                  <div className='grid grid-cols-3 mt-0.5 bg-gray-200 rounded-b-md px-3 py-1'>
                    <Text  size={"14px"} className="col-span-2" opacity={"50%"}>Unclaimed SB Amount</Text>
                    <Text className='' size={"14px"}color={'white'}>{formatNumberWithoutRounding.format(unclaimed_SuperB_Staking)}</Text>
                  </div>


                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">

                    <div>
                        <button onClick={()=>onClaim()} className="border-2 hover:bg-green-100 hover:text-black rounded-md w-full border-green-100 px-6 py-1.5 inline-block">
                          <ButtonText transform weight>Claim SB Rewards</ButtonText>
                        </button>
                    </div>
                    <div>
                        <button onClick={()=>onClaimExternal()} className="border-2 hover:bg-green-100 hover:text-black rounded-md w-full border-green-100 px-6 py-1.5 inline-block">
                          <ButtonText transform weight>Claim Other Rewards</ButtonText>
                        </button>
                    </div>
                    <div>
                        {/*<button onClick={()=>onCheckReward()} className="border-2 hover:bg-green-100 hover:text-black rounded-md w-full border-green-100 px-6 py-1.5 inline-block">
                          <ButtonText transform weight>Check Rewards</ButtonText>
                        </button>*/}
                    </div>
                </div>
            </div>
        </div>
    // </div>
    )
}
