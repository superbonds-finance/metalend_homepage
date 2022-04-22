/* eslint-disable eqeqeq */
import React, { useEffect, useCallback, useState } from "react";
import { notify } from "../../utils/notifications";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection, sendTransaction } from "../../contexts/connection";
import {
  SUPERBONDS_PROGRAM_ID,
  USDC_MINT_ADDRESS,
  SUPERB_MINT_ADDRESS,
  PLATFORM_DATA_ACCOUNT,
  LP_TOKEN_30_MINT_ADDRESS,
  LP_TOKEN_90_MINT_ADDRESS,
  POOL_30_ADDRESS,
  POOL_90_ADDRESS,
  USDC_DECIMALS,
  SUPERB_DECIMALS,
  LP_TOKEN_DECIMALS,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
} from "../../utils/ids";
import { findAssociatedTokenAddress } from "../../contexts/accounts";
// import { useUserBalance } from "../../hooks";
import { POOL_DATA_LAYOUT, PoolDataLayout } from "../../utils/pool_data_layout";
import { PLATFORM_DATA_LAYOUT, PlatformDataLayout } from "../../utils/platform_data_layout";
import BN from "bn.js";
import {
  Numberu64, getTokenBalance,
  numberFormatter, delay,
  formatInputNumber, unformatInputNumber,formatNumberWithoutRounding,
  numOnly, noSpecial } from "../../utils/utils";
import { ButtonText, Text ,HeroText, HoverToolTip} from "./liquidity.styled"
import {
  Account,
  // Connection,
  PublicKey,
  // LAMPORTS_PER_SOL,
  // SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
  // Transaction,
} from '@solana/web3.js';
import Swal from 'sweetalert2';
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import '../../styles/trade.css'
import { StakeViewComponent } from "../stake/stake-component";
import { HeaderCard } from "../../components/HeaderCard";
import { Tooltip } from "antd";
import { ImInfo } from "react-icons/im";

import axios from 'axios';
import {AxiosResponse} from 'axios';

export function LiquidityView() {

  const connection = useConnection();
  const wallet = useWallet();

  // const [SOLbalance, setSOLbalance] = useState(0);
  const [USDCbalance, setUSDCbalance] = useState<any>(0);
  const [SuperBbalance, setSuperBbalance] = useState<any>(0);
  const [transactionFees,setTransactionFees] = useState<any>();
  const [LP30balance, setLP30balance] = useState<any>(0);
  const [LP90balance, setLP90balance] = useState<any>(0);
  const [refreshStakeBalance, setRefreshStakeBalance] = useState<any>(0);


  const getAllBalances = async () => {
    if (!wallet) {
      // notify({
      //   message: 'Please connect to Sol network',
      //   type: "error",
      // });
      return;
    }
    if (!wallet.publicKey) {
      // notify({
      //   message: 'Please connect to Solana network',
      //   type: "error",
      // });
      return;
    }
    //setSOLbalance(await connection.getBalance(wallet.publicKey)/(10**9));
    setUSDCbalance(await getTokenBalance(connection, wallet.publicKey, USDC_MINT_ADDRESS, USDC_DECIMALS));
    setLP30balance(await getTokenBalance(connection, wallet.publicKey, LP_TOKEN_30_MINT_ADDRESS, LP_TOKEN_DECIMALS));
    setLP90balance(await getTokenBalance(connection, wallet.publicKey, LP_TOKEN_90_MINT_ADDRESS, LP_TOKEN_DECIMALS));
    setSuperBbalance(await getTokenBalance(connection, wallet.publicKey, SUPERB_MINT_ADDRESS, SUPERB_DECIMALS));
  }

  const [lq_amount30, setLQ_Amount30] = useState<any>("");
  const [lq_amount90, setLQ_Amount90] = useState("");

  const [data30pool, setData30pool] = useState<any>();
  const [data90pool, setData90pool] = useState<any>();

  useEffect(() => {

    readPoolData_30();
    readPoolData_90();
    getAllBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);



  const readPoolData_30 = async () => {

    const data = {"pool":30};
    const response:AxiosResponse<any> = await axios.post('https://mainnet-api.superbonds.finance/getPoolData',data);
    console.log('api pool 30 data',response.data)
    // console.log(parseInt(response.data.transaction_fee_SuperB, 16))
    // const encodedPoolDataState = (await connection.getAccountInfo(POOL_30_ADDRESS, 'singleGossip'))!.data;
    // const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
    setData30pool(response.data);
    // //console.log(decodedPoolDataState)
    // let transactionFeeSuperB = new BN(decodedPoolDataState.transaction_fee_SuperB, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setTransactionFees(parseInt(response.data.transaction_fee_SuperB, 16)/ (10**USDC_DECIMALS))

  }
  const readPoolData_90 = async () => {
    const data = {"pool":90};
    const response:AxiosResponse<any> = await axios.post('https://mainnet-api.superbonds.finance/getPoolData',data);
    console.log('api pool 90 data',response.data)
    // const encodedPoolDataState = (await connection.getAccountInfo(POOL_90_ADDRESS, 'singleGossip'))!.data;
    // const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
    setData90pool(response.data);
  }

  const onChangeLQ_amount30 = useCallback((e) => {
    let { value } = e.target;
    setLQ_Amount30(formatInputNumber(value));

  }, []);

  const onChangeLQ_amount90 = useCallback((e) => {
    const { value } = e.target;
    setLQ_Amount90(formatInputNumber(value));
  }, []);
  const onRemoveLiquidity = async (pool: any) => {
    let RemoveLiquidityFees=pool===30?data30pool.remove_liquidity_fee_USDC/100:data90pool.remove_liquidity_fee_USDC/100;

    const message = `
     <div class="bg-gray-200 py-3 p-4 mt-3 sm:p-1 rounded-md">
       <div class="table2">
         <table class="w-full">
             <tr>
               <th class="text-left">
                 <span class="th_span small_font_td_span">
                 Remove Liquidity Fees</span>
               </th>
               <td class="text-right">
                 <span class="td_span small_font_td_span">
                 <b>${RemoveLiquidityFees}</b>%</span>
               </td>
             </tr>

             <tr>
               <th class="text-left">
                 <span class="th_span small_font_td_span">
                   Platform Fees: </span>
               </th>
               <td class="text-right">
                 <span class="td_span small_font_td_span">
                 <b>${transactionFees}</b> SB</span>
               </td>
             </tr>
         </table>
       </div>
     </div>
     `
    let ProceedForRemoveLiquidity=false
    await Swal.fire({
      title: 'Remove Liquidity Fees Confirmation',
      html:message,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor:'#7cfa4d'
    }).then((result) => {
      if (result.isConfirmed) {
        ProceedForRemoveLiquidity = true
      }
    })
    if (!ProceedForRemoveLiquidity) return;

    //console.log('remove Liquidity', pool, unformatInputNumber(lq_amount30), unformatInputNumber(lq_amount90));
    if (!wallet) {
      notify({
        message: 'Please connect to Solana network',
        type: "error",
      });
      return;
    }
    let publicKey = wallet.publicKey;
    if (!publicKey) {
      notify({
        message: 'Please connect to Solana network',
        type: "error",
      });
      return;
    }
    let SOL_balance = await connection.getBalance(publicKey)/(10**9);
    if (SOL_balance <= 0.001){
      notify({
        message: 'You have low Sol balance',
        type: "info",
      });
      return;
    }
    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;
    let lp_token_mint_address = pool == 30 ? LP_TOKEN_30_MINT_ADDRESS : LP_TOKEN_90_MINT_ADDRESS;
    let lp_token_amount = unformatInputNumber(pool == 30 ? lq_amount30 : lq_amount90);

    const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    // let USDC_fee = parseInt(decodedPoolDataState.remove_liquidity_fee_USDC.toString()) / 100; //percent
    let SuperB_fee = new BN(decodedPoolDataState.transaction_fee_SuperB, 10, "le").toNumber();

    if (SuperBbalance * (10 ** SUPERB_DECIMALS) < SuperB_fee) {
      notify({
        message: 'You dont have enough SuperB to pay for transaction fee',
        type: "error",
      });
      return;
    }
    //Check LP Price > 0
    let lp_token_price = parseFloat(decodedPoolDataState.lp_price.toString()) / 1000000
    if (lp_token_price <= 0) {
      notify({
        message: 'Invalid LP Price',
        type: "error",
      });
      return;
    }

    let associated_token_account_address = await findAssociatedTokenAddress(publicKey, lp_token_mint_address);
    //console.log('associated_token_account_address', associated_token_account_address.toBase58());
    let USDCassociated_token_account_address = await findAssociatedTokenAddress(publicKey, USDC_MINT_ADDRESS);
    let USDCassociated_token_account = await connection.getAccountInfo(USDCassociated_token_account_address);
    //console.log('USDCassociated_token_account_address', USDCassociated_token_account_address.toBase58());
    let associated_SUPERB_token_account_address = await findAssociatedTokenAddress(publicKey, SUPERB_MINT_ADDRESS);
    //console.log('associated_SUPERB_token_account_address', associated_SUPERB_token_account_address.toBase58());

    //Create new LP token Account and transfer  amount to it
    const lp_token_account = new Account();
    //console.log('lp_token_account', lp_token_account.publicKey.toBase58());
    const createLPTokenAccountIx = SystemProgram.createAccount({
      programId: TOKEN_PROGRAM_ID,
      space: AccountLayout.span,
      lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
      fromPubkey: publicKey,
      newAccountPubkey: lp_token_account.publicKey
    });
    const initLP_TOKENAccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, lp_token_mint_address, lp_token_account.publicKey, publicKey);
    const transferLPTokensToTempAccIx = Token
      .createTransferInstruction(TOKEN_PROGRAM_ID, associated_token_account_address, lp_token_account.publicKey, publicKey, [], parseFloat(lp_token_amount) * (10 ** LP_TOKEN_DECIMALS));
    //Calculte minimum to receive
    let withdraw_fees = (lp_token_amount * lp_token_price) * RemoveLiquidityFees/100;
    let min_receive_amount = ((lp_token_amount * lp_token_price) - withdraw_fees) * 0.95; //slippage is 5%

    //console.log("min_receive_amount",min_receive_amount.toFixed(6));
    const buffers = [
      Buffer.from(Uint8Array.of(11, 0,
         ...new Numberu64(parseFloat(lp_token_amount) * (10 ** LP_TOKEN_DECIMALS)).toBuffer(),
         ...new Numberu64(parseFloat(min_receive_amount.toFixed(6)) * (10 ** USDC_DECIMALS)).toBuffer()

       ))
    ];
    // let [LP_TOKEN_PDA, LP_TOKEN_NONCE] = await PublicKey.findProgramAddress([lp_token_mint_address.toBuffer()], SUPERBONDS_PROGRAM_ID);
    let [LP_POOL_TOKEN_PDA/* , LP_POOL_TOKEN_NONCE */] = await PublicKey.findProgramAddress([new PublicKey(decodedPoolDataState.LP_Pool).toBuffer()], SUPERBONDS_PROGRAM_ID);

    if (!USDCassociated_token_account) {
      //create transaction to initialize new Associated Token Account then transfer
      //console.log('Initialize Associated Account...');
      let usdc_associated_token_account_creationIx = Token.createAssociatedTokenAccountInstruction(
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        USDC_MINT_ADDRESS,
        USDCassociated_token_account_address,
        publicKey,
        publicKey
      );
      const removeLiquidityIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
          { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: false },
          { pubkey: pool_address, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
          { pubkey: new PublicKey(USDCassociated_token_account_address), isSigner: false, isWritable: true },
          { pubkey: lp_token_account.publicKey, isSigner: false, isWritable: true },
          { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedPoolDataState.LP_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.Treasury), isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true },
          { pubkey: lp_token_mint_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(LP_POOL_TOKEN_PDA.toString()), isSigner: false, isWritable: false },
        ],
        data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection, wallet,
        [createLPTokenAccountIx, initLP_TOKENAccountIx, transferLPTokensToTempAccIx,
          usdc_associated_token_account_creationIx, removeLiquidityIx]
        , [lp_token_account]);
      if (!txid) {
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      } else {
        notify({
          message: 'Removed Liquidity successfully',
          type: "success",
        });
        await delay(3000);
        await readPoolData_30();
        await readPoolData_90();
        await getAllBalances();
        setRefreshStakeBalance((prev: number)=> prev + 1)

      }
    }
    else if (USDCassociated_token_account_address) {
      const removeLiquidityIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
          { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: false },
          { pubkey: pool_address, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
          { pubkey: new PublicKey(USDCassociated_token_account_address), isSigner: false, isWritable: true },
          { pubkey: lp_token_account.publicKey, isSigner: false, isWritable: true },
          { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedPoolDataState.LP_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.Treasury), isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true },
          { pubkey: lp_token_mint_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(LP_POOL_TOKEN_PDA.toString()), isSigner: false, isWritable: false },
        ],
        data: Buffer.concat(buffers)
      });
      let txid = await sendTransaction(connection, wallet,
        [createLPTokenAccountIx, initLP_TOKENAccountIx, transferLPTokensToTempAccIx,
          removeLiquidityIx]
        , [lp_token_account]);
      if (!txid) {
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      } else {
        notify({
          message: 'Removed Liquidity successfully',
          type: "success",
        });
        await delay(3000);
        await readPoolData_30();
        await readPoolData_90();
        await getAllBalances();
        setRefreshStakeBalance((prev: number)=> prev + 1)
      }
    }

  }
  const onAddLiquidity = async (pool: any) => {

    let AddLiquidityFees=pool===30?data30pool.add_liquidity_fee_USDC/100:data90pool.add_liquidity_fee_USDC/100;

    const message = `
     <div class="bg-gray-200 py-3 p-4 mt-3 sm:p-1 rounded-md">
       <div class="table2">
         <table class="w-full">
             <tr>
               <th class="text-left">
                 <span class="th_span small_font_td_span">
                 Add Liquidity Fees</span>
               </th>
               <td class="text-right">
                 <span class="td_span small_font_td_span">
                 <b>${AddLiquidityFees}</b>%</span>
               </td>
             </tr>

             <tr>
               <th class="text-left">
                 <span class="th_span small_font_td_span">
                   Platform Fees: </span>
               </th>
               <td class="text-right">
                 <span class="td_span small_font_td_span">
                 <b>${transactionFees}</b> SB</span>
               </td>
             </tr>
         </table>
       </div>
     </div>
     `
    let ProceedForAddLiquidity=false
    await Swal.fire({
      title: 'Add Liquidity Fees Confirmation',
      html:message,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor:'#7cfa4d'
    }).then((result) => {
      if (result.isConfirmed) {
        ProceedForAddLiquidity = true
      }
    })
    if (!ProceedForAddLiquidity) return;

    if (!wallet) {
      notify({
        message: 'Please connect to Solana network',
        type: "error",
      });
      return;
    }
    let publicKey = wallet.publicKey;
    if (!publicKey) {
      notify({
        message: 'Please connect to Solana network',
        type: "error",
      });
      return;
    }
    let SOL_balance = await connection.getBalance(publicKey)/(10**9);
    if (SOL_balance <= 0.001){
      notify({
        message: 'You have low Sol balance',
        type: "info",
      });
      return;
    }
    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;
    let lp_token_mint_address = pool == 30 ? LP_TOKEN_30_MINT_ADDRESS : LP_TOKEN_90_MINT_ADDRESS;

    const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    let USDC_fee = parseInt(decodedPoolDataState.add_liquidity_fee_USDC.toString()) / 100; //percent
    let SuperB_fee = new BN(decodedPoolDataState.transaction_fee_SuperB, 10, "le").toNumber();

    let total_USDC = pool == 30 ? parseFloat(unformatInputNumber(lq_amount30)) * (1 + USDC_fee) : parseFloat(unformatInputNumber(lq_amount90)) * (1 + USDC_fee);
    ////console.log(total_USDC, SuperB_fee, SuperBbalance);
    //Check if user has enough balance
    if (USDCbalance < total_USDC) {
      notify({
        message: 'You dont have enough USDC',
        type: "error",
      });
      return;
    }
    if (SuperBbalance * (10 ** SUPERB_DECIMALS) < SuperB_fee) {
      notify({
        message: 'You dont have enough SuperB to pay for transaction fee',
        type: "error",
      });
      return;
    }
    //Check LP Price > 0
    let lp_token_price = parseFloat(decodedPoolDataState.lp_price.toString()) / 1000000
    if (lp_token_price <= 0) {
      notify({
        message: 'Invalid LP Price',
        type: "error",
      });
      return;
    }

    const buffers = [
      Buffer.from(Uint8Array.of(11, 1, ...new Numberu64(total_USDC * (10 ** USDC_DECIMALS)).toBuffer(), ...new Numberu64(0).toBuffer()))
    ];

    let associated_token_account_address = await findAssociatedTokenAddress(publicKey, USDC_MINT_ADDRESS);
    ////console.log('associated_token_account_address', associated_token_account_address.toBase58());
    let associated_SUPERB_token_account_address = await findAssociatedTokenAddress(publicKey, SUPERB_MINT_ADDRESS);
    ////console.log('associated_SUPERB_token_account_address', associated_SUPERB_token_account_address.toBase58());
    ////console.log('SUPERB_MINT_ADDRESS', SUPERB_MINT_ADDRESS.toBase58());
    ////console.log('publicKey', publicKey.toBase58());
    //Create new SUPERB token Account and transfer FEE amount to it

    let lp_associated_token_account_address = await findAssociatedTokenAddress(publicKey, lp_token_mint_address);
    let lp_associated_token_account = await connection.getAccountInfo(lp_associated_token_account_address);
    let lp_associated_token_account_creationIx = null;

    let [LP_TOKEN_PDA/* , LP_TOKEN_NONCE */] = await PublicKey.findProgramAddress([lp_token_mint_address.toBuffer()], SUPERBONDS_PROGRAM_ID);

    if (!lp_associated_token_account) {
      //create transaction to initialize new Associated Token Account then transfer
      //console.log('Initialize Associated Account...');
      lp_associated_token_account_creationIx = Token.createAssociatedTokenAccountInstruction(
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        lp_token_mint_address,
        lp_associated_token_account_address,
        publicKey,
        publicKey
      );
      const addLiquidityIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
          { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: false },
          { pubkey: pool_address, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
          { pubkey: associated_token_account_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(lp_associated_token_account_address), isSigner: false, isWritable: true },
          { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedPoolDataState.LP_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.Treasury), isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true },
          { pubkey: lp_token_mint_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(LP_TOKEN_PDA.toString()), isSigner: false, isWritable: false },
        ],
        data: Buffer.concat(buffers)
      });

      let txid = await sendTransaction(connection, wallet,
        [lp_associated_token_account_creationIx, addLiquidityIx]
        , []);
      if (!txid) {
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
        await getAllBalances();
      } else {
        notify({
          message: 'Added Liquidity successfully',
          type: "success",
        });
        await delay(3000);
        await readPoolData_30();
        await readPoolData_90();
        await getAllBalances();
        setRefreshStakeBalance((prev: number)=> prev + 1)
      }
    }
    else if (lp_associated_token_account) {
      const addLiquidityIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
          { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: false },
          { pubkey: pool_address, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
          { pubkey: associated_token_account_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(lp_associated_token_account_address), isSigner: false, isWritable: true },
          { pubkey: associated_SUPERB_token_account_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedPoolDataState.LP_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.SuperB_Pool), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(decodedStakingDataState.Treasury), isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: true },
          { pubkey: lp_token_mint_address, isSigner: false, isWritable: true },
          { pubkey: new PublicKey(LP_TOKEN_PDA.toString()), isSigner: false, isWritable: false },
        ],
        data: Buffer.concat(buffers)
      });
      let txid = await sendTransaction(connection, wallet,
        [addLiquidityIx]
        , []);
      if (!txid) {
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      } else {
        notify({
          message: 'Added Liquidity successfully',
          type: "success",
        });
        await delay(3000);
        await readPoolData_30();
        await readPoolData_90();
        await getAllBalances();
        setRefreshStakeBalance((prev: number)=> prev + 1)
      }
    }


  }

  return (
    <div className="w-screen h-screen bg-black">
      <div className="w-8/12 my-0 mx-auto pt-28 2xl:w-9/12 xl:w-11/12 pb-5" style={{ maxWidth: "1000px" }}>
        {/* <HeaderText className="text-left">Add/Remove liquidity</HeaderText> */}
        <HeaderCard
          isHover='true'
          text='Liquidity  Providers'
          USDCbalance={USDCbalance}
          SuperBbalance={SuperBbalance}
          divStyle=''
        />
        <div className="mt-8 sm:pt-0 bg-gray-300 neon-bottom-card selected-box-neon rounded-md">
          <div className="w-full bg-green-100 py-2 rounded-t-md text-center">
            <HeroText size={"16px"} transform={"true"} weight={'true'} color='black' style={{ fontFamily:"Archivo"}}>30-day pool</HeroText>
          </div>
          <div className="flex  justify-between  md:justify-center  md:flex-wrap  pt-6">
          <div className="flex flex-col w-6/12 2xl:w-6/12 xl:w-11/12 lg:w-11/12 sm:w-12/12 md:w-10/12  py-4 px-7 sm:px-0">
            <div className="text-center">
              <Text size={"16px"} transform={"true"}>Add/Remove Liquidity</Text>
            </div>
            <div className="bg-gray-200 py-3 pl-3 py-7 px-2 mt-5 rounded-md">
              <div className='grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"} >USDC Balance</Text>
                <Text className='cursor-pointer break-all' onClick={()=>setLQ_Amount30(formatNumberWithoutRounding.format((USDCbalance)))}>{formatNumberWithoutRounding.format((USDCbalance))}</Text>
              </div>

              <div className='grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"} >LP Pool Token Balance</Text>
                <Text className='cursor-pointer break-all' onClick={()=>setLQ_Amount30(formatInputNumber(String(LP30balance)))}>{numberFormatter.format(LP30balance)}</Text>
              </div>

              <HoverToolTip className='text-grid  cursor-pointer grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"}>Add Liquidity Price
                  <Tooltip placement="rightTop" title={'The value of 1 LP token when adding USDC as liquidity to LP Pool'}> <ImInfo className='info-circle'/></Tooltip>
                </Text>
                <Text className='break-all'>{1.000000} </Text>
              </HoverToolTip>

              <HoverToolTip className='text-grid  cursor-pointer grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"}>Remove Liquidity Price
                  <Tooltip placement="rightTop" title={'The amount of USDC redeemable for 1 LP token'}> <ImInfo className='info-circle '/></Tooltip>
                </Text>
                <Text className='break-all'>{data30pool ? (data30pool.lp_price / 1000000).toFixed(6) : "..."} </Text>
              </HoverToolTip>

            </div>
            <div className="text-center bg-gray-200 py-3 px-3 border rounded-md mt-3">
              <Text className="block" opacity={"0.5"}>ADD = USDC / REMOVE = LP TOKEN</Text>
              <input
                placeholder='Add USDC , Remove LP Token'
                onChange={onChangeLQ_amount30}
                value={lq_amount30}
                maxLength={20}
                onKeyDown={numOnly}
                onKeyPress={noSpecial}
                type='tel'
                className="w-full py-2 px-2 h-10 mt-3 rounded-md bg-gray-400 ring-2 ring-green-100 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent placeholder-green-100" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <button onClick={() => onAddLiquidity(30)} className="border-2 hover:bg-green-100 hover:text-black rounded-md w-full border-green-100 px-6 py-1.5 inline-block">
                  <ButtonText transform weight>ADD</ButtonText >
                </button>
              </div>
              <div>
                <button onClick={() => onRemoveLiquidity(30)} className="border-2 hover:bg-white hover:text-black  rounded-md w-full border-white px-6 py-1.5 inline-block">
                  <ButtonText transform weight>REMOVE</ButtonText >
                </button>
              </div>
            </div>
          </div>

          {/* stake connect */}
          <StakeViewComponent poolType='30' getAllLiquidityBalances={getAllBalances} refreshStakeBalance={refreshStakeBalance} />
          </div>
        </div>

        <div className="sm:pt-0 bg-gray-300 neon-bottom-card selected-box-neon rounded-md" style={{marginTop:'5rem'}}>
          <div className="w-full bg-green-100 py-2 rounded-t-md text-center">
            <HeroText  size={"16px"} transform={"true"} weight={'true'} color='black' style={{ fontFamily:"Archivo"}}>90-day pool</HeroText>
          </div>
          <div className="flex  justify-between  md:justify-center  md:flex-wrap  pt-6">
          <div className="flex w-6/12 flex-col 2xl:w-6/12 xl:w-11/12 lg:w-11/12 sm:w-12/12 md:w-10/12   py-4 px-7 sm:px-0">
            <div className="text-center">
              <Text size={"16px"} transform={"true"}>Add/Remove Liquidity</Text>
            </div>
            <div className="bg-gray-200 py-3 pl-3 py-7 px-2 mt-5 rounded-md">
              <div className='grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"}>USDC Balance</Text>
                <Text className='cursor-pointer break-all' onClick={()=>setLQ_Amount90(formatNumberWithoutRounding.format((USDCbalance)))}>{formatNumberWithoutRounding.format((USDCbalance))}</Text>
              </div>

              <div className='grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"}>LP Pool Token Balance</Text>
                <Text className='cursor-pointer break-all' onClick={()=>setLQ_Amount90(formatInputNumber(String(LP90balance)))}>{numberFormatter.format(LP90balance)}</Text>
              </div>

              <HoverToolTip className='text-grid  cursor-pointer grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"}>Add Liquidity Price
                  <Tooltip placement="rightTop" title={'The value of 1 LP token when adding USDC as liquidity to LP Pool'}> <ImInfo className='info-circle'/></Tooltip>
                </Text>
                <Text className='break-all'>{1.000000} </Text>
              </HoverToolTip>

              <HoverToolTip className='text-grid  cursor-pointer grid grid-cols-3'>
                <Text weight='true' className="col-span-2" opacity={"0.75"}>Remove Liquidity Price
                  <Tooltip placement="rightTop" title={'The amount of USDC redeemable for 1 LP token'}> <ImInfo className='info-circle'/></Tooltip>
                </Text>
                <Text className='break-all'>{data90pool ? (data90pool.lp_price / 1000000).toFixed(6) : "..."} </Text>
              </HoverToolTip>

            </div>
            <div className="text-center bg-gray-200 py-3 px-3 border rounded-md mt-3">
              <Text className="block" opacity={"0.5"}>ADD = USDC / REMOVE = LP TOKEN</Text>
              <input
                placeholder='Add USDC , Remove LP Token'
                value={lq_amount90}
                maxLength={20}
                onKeyDown={numOnly}
                onKeyPress={noSpecial}
                type='tel'
                onChange={onChangeLQ_amount90}
                className="w-full py-2 px-2 h-10 mt-3 rounded-md bg-gray-400 ring-2 ring-green-100 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent placeholder-green-100" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <button onClick={() => onAddLiquidity(90)} className="border-2 hover:bg-green-100 hover:text-black rounded-md w-full border-green-100 px-6 py-1.5 inline-block">
                  <ButtonText transform weight>ADD</ButtonText>
                </button>
              </div>
              <div>
                <button onClick={() => onRemoveLiquidity(90)} className="border-2 hover:bg-white hover:text-black  rounded-md w-full border-white px-6 py-1.5 inline-block">
                  <ButtonText transform weight >REMOVE</ButtonText>
                </button>
              </div>
            </div>
          </div>

          {/* stake connect */}
          <StakeViewComponent poolType='90' getAllLiquidityBalances={getAllBalances} refreshStakeBalance={refreshStakeBalance} />
          </div>
        </div>
      </div>
    </div>
  )
}
