/* eslint-disable eqeqeq */
import { Row, Col, Input, Form, Card, Button } from 'antd';
import React, { useEffect, useState, useCallback } from "react";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { notify } from "../../utils/notifications";
import { ConnectButton } from "./../../components/ConnectButton";
import { SUPERBONDS_PROGRAM_ID,
         USDC_MINT_ADDRESS,
         SUPERB_MINT_ADDRESS,
         PLATFORM_DATA_ACCOUNT,
         TREASURY_ADDRESS,
         TREASURY_SUPERB_ADDRESS,
         SUPERB_POOL_ADDRESS,
         SUPERB_REWARDS_POOL_ADDRESS,
         LP_TOKEN_30_MINT_ADDRESS,
         LP_TOKEN_90_MINT_ADDRESS,
         POOL_30_ADDRESS,
         POOL_90_ADDRESS,
         USDC_DECIMALS,
         SUPERB_DECIMALS,
       } from "../../utils/ids";
import { Numberu32,Numberu64,convertTimeStamp,delay,getTokenSupply } from "../../utils/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import {POOL_DATA_LAYOUT,PoolDataLayout} from "../../utils/pool_data_layout";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {
  Account,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { AccountLayout, Token, TOKEN_PROGRAM_ID,MintLayout } from "@solana/spl-token";
import BN from "bn.js";
import { findAssociatedTokenAddress } from "../../contexts/accounts";

export const PoolManagementView = () => {
  const connection = useConnection();
  const wallet = useWallet();
  const [Treasury_Balance,setTreasury_Balance] = useState(0);
  const [Treasury_SuperB_Balance,setTreasury_SuperB_Balance] = useState(0);
  const [SuperB_Pool_Balance,setSuperB_Pool_Balance] = useState(0);
  const [data30pool,setData30pool] = useState<any>();
  const [data90pool,setData90pool] = useState<any>();
  const [bond_yield,setBond_Yield] = useState(0);

  const [lp_30_supply,setLP_30_Supply] = useState(0);
  const [lp_90_supply,setLP_90_Supply] = useState(0);

  const [stakingPool, setStakingPool] = useState<any>();

  const [LP_Pool_30_Balance,setLP_Pool_30_Balance] = useState(0);
  const [Traders_Pool_30_Balance,setTraders_Pool_30_Balance] = useState(0);
  const [SuperB_Pool_30_Balance] = useState(0);
  const [SuperBonds_Rewards_Pool_30_Balance,setSuperBonds_Rewards_Pool_30_Balance] = useState(0);
  // const [Treasury_30_Balance,setTreasury_30_Balance] = useState(0);


  const [LP_Pool_90_Balance,setLP_Pool_90_Balance] = useState(0);
  const [Traders_Pool_90_Balance,setTraders_Pool_90_Balance] = useState(0);
  const [SuperB_Pool_90_Balance] = useState(0);
  const [SuperBonds_Rewards_Pool_90_Balance,setSuperBonds_Rewards_Pool_90_Balance] = useState(0);
  // const [Treasury_90_Balance,setTreasury_90_Balance] = useState(0);

  const onChangeYield = useCallback( (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setBond_Yield(value);
    }
  },[]);

  useEffect(() => {
    if (!wallet.publicKey) return;
    onRefresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);

  const onUpdateYield = async (pool:any) => {
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

    if (decodedStakingDataState.governance_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Governance Account allowed',
        type: "error",
      });
      return;
    }
    if (bond_yield <= 0 || bond_yield > 100){
      notify({
        message: 'Please enter yield from 0.01 to 100',
        type: "error",
      });
      return;
    }
    let bond_yield_to_program = Math.round(Math.abs(bond_yield) * 100);
    if (bond_yield_to_program != Math.abs(bond_yield*100) )
    {
      notify({
        message: 'Please enter up to 2 decimals',
        type: "error",
      });
      return;
    }

    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;

    const buffers = [
      Buffer.from(Uint8Array.of(7,25,...new Numberu64(bond_yield_to_program).toBuffer())),

    ];

    const setYieldIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: pool_address, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: true }
        ],
        data: Buffer.concat(buffers)
    });
    let transactions = [
      setYieldIx
    ];

    let txid = await sendTransaction(connection,wallet,transactions,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Updated successfully',
        type: "success",
      });
      await delay(3000);
      onRefresh();
    }
    ////console.log(txid);
  }
  const onCreate = async (pool:any) => {

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
      //
      const programInfo = await connection.getAccountInfo(SUPERBONDS_PROGRAM_ID);
      if (programInfo == null) {
        notify({
          message: 'Cannot connect to SuperBonds Program',
          type: "error",
        });
        return;
      }
      const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
      const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

      if (decodedStakingDataState.governance_account.toString() != publicKey.toString()){
        notify({
          message: 'Only Governance Account allowed',
          type: "error",
        });
        return;
      }

      //
      const pool_state_account = new Account();
      //console.log('pool_state_account',pool_state_account.publicKey.toString());
      const createPoolStateAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: POOL_DATA_LAYOUT.span,
          lamports: await connection.getMinimumBalanceForRentExemption(POOL_DATA_LAYOUT.span),
          fromPubkey: publicKey,
          newAccountPubkey: pool_state_account.publicKey
      });
      //
      //Create USDC Token Account to hold Liquidity from Provider
      const LP_Pool_Account = new Account();
      //console.log('LP_Pool_Account',LP_Pool_Account.publicKey.toBase58());
      const createLP_Pool_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: LP_Pool_Account.publicKey
      });
      const initLP_Pool_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, USDC_MINT_ADDRESS, LP_Pool_Account.publicKey, publicKey);

      //Create Token Account to hold USDC from Trader
      const Trader_Pool_Account = new Account();
      //console.log('Trader_Pool_Account',Trader_Pool_Account.publicKey.toBase58());
      const createTrader_Pool_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: Trader_Pool_Account.publicKey
      });
      const initTrader_Pool_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, USDC_MINT_ADDRESS, Trader_Pool_Account.publicKey, publicKey);


      //Create Token Account to hold SuperBonds Pool USDC
      const SuperBonds_Pool_Account = new Account();
      //console.log('SuperBonds_Pool_Account',SuperBonds_Pool_Account.publicKey.toBase58());
      const createSuperBonds_Pool_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: SuperBonds_Pool_Account.publicKey
      });
      const initSuperBonds_Pool_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, USDC_MINT_ADDRESS, SuperBonds_Pool_Account.publicKey, publicKey);

      const buffers = [
        Buffer.from(Uint8Array.of(0, ...new Numberu32(pool).toBuffer()))
      ];
      //console.log(Buffer.concat(buffers));
      const LP_Mint_Account = new Account();
      //console.log('LP_Mint_Account',LP_Mint_Account.publicKey.toString());
      let [LP_TOKEN_PDA/* , LP_TOKEN_NONCE */] = await PublicKey.findProgramAddress([LP_Mint_Account.publicKey.toBuffer()], SUPERBONDS_PROGRAM_ID);

      const createLP_Mint_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: MintLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(MintLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: LP_Mint_Account.publicKey
      });
      const initLP_Mint_AccountIx = Token.createInitMintInstruction(TOKEN_PROGRAM_ID, LP_Mint_Account.publicKey, 6, new PublicKey(LP_TOKEN_PDA.toString()) , publicKey);

      //Create Token Account to hold Staked LP Token
      const Staked_LP_Token_Account = new Account();
      //console.log('Staked_LP_Token_Account',Staked_LP_Token_Account.publicKey.toBase58());
      const createStaked_LP_Token_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: Staked_LP_Token_Account.publicKey
      });
      const initStaked_LP_Token_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, LP_Mint_Account.publicKey, Staked_LP_Token_Account.publicKey, publicKey);



      const initPoolIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: pool_state_account.publicKey, isSigner: false, isWritable: true },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: LP_Mint_Account.publicKey, isSigner: false, isWritable: false },
              { pubkey: LP_Pool_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: Trader_Pool_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: SuperBonds_Pool_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: Staked_LP_Token_Account.publicKey, isSigner: false, isWritable: true },

              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          ],
          data: Buffer.concat(buffers)
      });

      let txid1 = await sendTransaction(connection,wallet,
          [
            createPoolStateAccountIx,
            createLP_Pool_AccountIx,initLP_Pool_AccountIx,
            createTrader_Pool_AccountIx,initTrader_Pool_AccountIx,
            createSuperBonds_Pool_AccountIx,initSuperBonds_Pool_AccountIx
        ]
        ,[pool_state_account,LP_Pool_Account,Trader_Pool_Account,SuperBonds_Pool_Account]);
      if (!txid1){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
        return;
      }
      let txid = await sendTransaction(connection,wallet,
          [
            createLP_Mint_AccountIx,initLP_Mint_AccountIx,
            createStaked_LP_Token_AccountIx,initStaked_LP_Token_AccountIx,
            initPoolIx],
        [pool_state_account,LP_Pool_Account,Trader_Pool_Account,SuperBonds_Pool_Account,LP_Mint_Account,Staked_LP_Token_Account]);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        notify({
          message: 'Created Pool successfully',
          type: "success",
        });
        await delay(3000);
        onRefresh();
      }

  }

  const onFarm = async (pool:number) => {
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
    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    if (decodedStakingDataState.operator_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Operator Account allowed',
        type: "error",
      });
      return;
    }

    const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    let [TRADER_POOL_TOKEN_PDA/* , TRADER_POOL_TOKEN_NONCE */] = await PublicKey.findProgramAddress([new PublicKey(decodedPoolDataState.Traders_Pool).toBuffer()], SUPERBONDS_PROGRAM_ID);

    const buffers = [
      Buffer.from(Uint8Array.of(31))
    ];

    const farmIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: false },
            { pubkey: pool_address, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: true },
            { pubkey: new PublicKey(decodedStakingDataState.farming_account), isSigner: false, isWritable: true },
            { pubkey: new PublicKey(decodedPoolDataState.Traders_Pool), isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            { pubkey: TRADER_POOL_TOKEN_PDA, isSigner: false, isWritable: false }
        ],
        data: Buffer.concat(buffers)
    });

    let txid = await sendTransaction(connection,wallet,
        [farmIx]
      ,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'External Farming Request Sent',
        type: "success",
      });
      await delay(3000);
      onRefresh();
    }
  }

  const readPoolData_30 = async () => {
    if ( !wallet){
      notify({
        message: 'Please connect to Solana network',
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

    const encodedPoolDataState = (await connection.getAccountInfo(POOL_30_ADDRESS, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
    //console.log(decodedPoolDataState);
    setData30pool(decodedPoolDataState);

    const encodeUSDC_LP_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.LP_Pool), 'singleGossip'))!.data;
    const decodeUSDC_LP_Pool_Account_ADDRESS = AccountLayout.decode(encodeUSDC_LP_Pool_Account_ADDRESS);
    let LP_Pool_Balance = new BN(decodeUSDC_LP_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setLP_Pool_30_Balance(LP_Pool_Balance);

    const encodeTraders_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.Traders_Pool), 'singleGossip'))!.data;
    const decodeTraders_Pool_Account_ADDRESS = AccountLayout.decode(encodeTraders_Pool_Account_ADDRESS);
    let Traders_Pool_Balance = new BN(decodeTraders_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setTraders_Pool_30_Balance(Traders_Pool_Balance);

    // const encodeSuperB_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.SuperB_Pool), 'singleGossip'))!.data;
    // const decodeSuperB_Pool_Account_ADDRESS = AccountLayout.decode(encodeSuperB_Pool_Account_ADDRESS);
    // let SuperB_Pool_Balance = new BN(decodeSuperB_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**SUPERB_DECIMALS);
    // setSuperB_Pool_30_Balance(SuperB_Pool_Balance);

    const encodeSuperBonds_Rewards_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.SuperBonds_Rewards_Pool), 'singleGossip'))!.data;
    const decodeSuperBonds_Rewards_Pool_Account_ADDRESS = AccountLayout.decode(encodeSuperBonds_Rewards_Pool_Account_ADDRESS);
    let SuperBonds_Rewards_Pool_Balance = new BN(decodeSuperBonds_Rewards_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setSuperBonds_Rewards_Pool_30_Balance(SuperBonds_Rewards_Pool_Balance);

    // const encodeTreasury_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.Treasury), 'singleGossip'))!.data;
    // const decodeTreasury_Account_ADDRESS = AccountLayout.decode(encodeTreasury_Account_ADDRESS);
    // let Treasury_Balance = new BN(decodeTreasury_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    // setTreasury_30_Balance(Treasury_Balance);

  }
  const readPoolData_90 = async () => {
    if ( !wallet){
      notify({
        message: 'Please connect to Solana network',
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

    const encodedPoolDataState = (await connection.getAccountInfo(POOL_90_ADDRESS, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
    //console.log(decodedPoolDataState);
    setData90pool(decodedPoolDataState);

    const encodeUSDC_LP_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.LP_Pool), 'singleGossip'))!.data;
    const decodeUSDC_LP_Pool_Account_ADDRESS = AccountLayout.decode(encodeUSDC_LP_Pool_Account_ADDRESS);
    let LP_Pool_Balance = new BN(decodeUSDC_LP_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setLP_Pool_90_Balance(LP_Pool_Balance);

    const encodeTraders_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.Traders_Pool), 'singleGossip'))!.data;
    const decodeTraders_Pool_Account_ADDRESS = AccountLayout.decode(encodeTraders_Pool_Account_ADDRESS);
    let Traders_Pool_Balance = new BN(decodeTraders_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setTraders_Pool_90_Balance(Traders_Pool_Balance);

    // const encodeSuperB_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.SuperB_Pool), 'singleGossip'))!.data;
    // const decodeSuperB_Pool_Account_ADDRESS = AccountLayout.decode(encodeSuperB_Pool_Account_ADDRESS);
    // let SuperB_Pool_Balance = new BN(decodeSuperB_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**SUPERB_DECIMALS);
    // setSuperB_Pool_90_Balance(SuperB_Pool_Balance);

    const encodeSuperBonds_Rewards_Pool_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.SuperBonds_Rewards_Pool), 'singleGossip'))!.data;
    const decodeSuperBonds_Rewards_Pool_Account_ADDRESS = AccountLayout.decode(encodeSuperBonds_Rewards_Pool_Account_ADDRESS);
    let SuperBonds_Rewards_Pool_Balance = new BN(decodeSuperBonds_Rewards_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setSuperBonds_Rewards_Pool_90_Balance(SuperBonds_Rewards_Pool_Balance);

    // const encodeTreasury_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(decodedPoolDataState.Treasury), 'singleGossip'))!.data;
    // const decodeTreasury_Account_ADDRESS = AccountLayout.decode(encodeTreasury_Account_ADDRESS);
    // let Treasury_Balance = new BN(decodeTreasury_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    // setTreasury_90_Balance(Treasury_Balance);
  }

  const onRefresh = async() => {
    setLP_30_Supply(await getTokenSupply(connection,LP_TOKEN_30_MINT_ADDRESS));
    setLP_90_Supply(await getTokenSupply(connection,LP_TOKEN_90_MINT_ADDRESS));

    readPoolData_30();
    readPoolData_90();
    const encodeUSDC_Treasury_Account_ADDRESS = (await connection.getAccountInfo(TREASURY_ADDRESS, 'singleGossip'))!.data;
    const decodeUSDC_Treasury_Account_ADDRESS = AccountLayout.decode(encodeUSDC_Treasury_Account_ADDRESS);
    let Treasury_Balance = new BN(decodeUSDC_Treasury_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setTreasury_Balance(Treasury_Balance);

    const encodeTreasury_SuperB_Account_ADDRESS = (await connection.getAccountInfo(TREASURY_SUPERB_ADDRESS, 'singleGossip'))!.data;
    const decodeSuperB_Treasury_Account_ADDRESS = AccountLayout.decode(encodeTreasury_SuperB_Account_ADDRESS);
    let Treasury_SuperB_Balance = new BN(decodeSuperB_Treasury_Account_ADDRESS.amount, 10, "le").toNumber() / (10**SUPERB_DECIMALS);
    setTreasury_SuperB_Balance(Treasury_SuperB_Balance);

    const encodeUSDC_SuperB_Pool_Account_ADDRESS = (await connection.getAccountInfo(SUPERB_POOL_ADDRESS, 'singleGossip'))!.data;
    const decodeUSDC_SuperB_Pool_Account_ADDRESS = AccountLayout.decode(encodeUSDC_SuperB_Pool_Account_ADDRESS);
    let SuperB_Pool_Balance = new BN(decodeUSDC_SuperB_Pool_Account_ADDRESS.amount, 10, "le").toNumber() / (10**USDC_DECIMALS);
    setSuperB_Pool_Balance(SuperB_Pool_Balance);

    const encodedPoolDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedPoolDataState = PLATFORM_DATA_LAYOUT.decode(encodedPoolDataState) as PlatformDataLayout;
    //console.log(decodedPoolDataState);
    setStakingPool(decodedPoolDataState);

  }

  const findPDA = async () =>{
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

    let [PDA/* , nonce */] = await PublicKey.findProgramAddress([LP_TOKEN_30_MINT_ADDRESS.toBuffer()], SUPERBONDS_PROGRAM_ID);
    //console.log('LP Token 30 PDA:','spl-token authorize',LP_TOKEN_30_MINT_ADDRESS.toString(),'mint',PDA.toString());
    [PDA/* , nonce */] = await PublicKey.findProgramAddress([LP_TOKEN_90_MINT_ADDRESS.toBuffer()], SUPERBONDS_PROGRAM_ID);
    //console.log('LP Token 90 PDA:','spl-token authorize',LP_TOKEN_90_MINT_ADDRESS.toString(),'mint',PDA.toString());

  }

  const claimTreasury = async () => {
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
    if (!stakingPool){
      notify({
        message: 'Please try again. Loading pool information not completed.',
        type: "error",
      });
      return;
    }
    const encodeSuperB_Rewards_Account_ADDRESS = (await connection.getAccountInfo(new PublicKey(SUPERB_REWARDS_POOL_ADDRESS), 'singleGossip'))!.data;
    const decodeSuperB_Rewards_Account_ADDRESS = AccountLayout.decode(encodeSuperB_Rewards_Account_ADDRESS);
    let SuperB_Rewards_Balance = new BN(decodeSuperB_Rewards_Account_ADDRESS.amount, 10, "le").toNumber() / (10**SUPERB_DECIMALS);

    if (SuperB_Rewards_Balance==0){
      notify({
        message: 'No SuperB available. Reward Pool depleted.',
        type: "error",
      });
      return;
    }
    const buffers = [
      Buffer.from(Uint8Array.of(5))
    ];
    let [superB_rewards_pda_address/* ,superB_rewards_pda_NONCE */] = await PublicKey.findProgramAddress([SUPERB_REWARDS_POOL_ADDRESS.toBuffer()], SUPERBONDS_PROGRAM_ID);

    const claimSuperBTreasuryIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: new PublicKey(stakingPool.Treasury_SuperB), isSigner: false, isWritable: true },
            { pubkey: SUPERB_REWARDS_POOL_ADDRESS, isSigner: false, isWritable: true },
            { pubkey: superB_rewards_pda_address, isSigner: false, isWritable: true},
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            //{ pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false }
        ],
        data: Buffer.concat(buffers)
    });

    let txid = await sendTransaction(connection,wallet,
        [claimSuperBTreasuryIx]
      ,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Claim Request Sent',
        type: "success",
      });
      await delay(3000);
      onRefresh();
    }
  }

  const [deposit_amount,setDepositAmount] = useState(0);

  const onChangeDepositAmount = useCallback( (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setDepositAmount(value);
    }
  },[]);

  const onDepositTraderPool = async (pool:any) => {
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
    //console.log(deposit_amount);

    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;
    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    if (decodedStakingDataState.operator_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Operator Account allowed',
        type: "error",
      });
      return;
    }

    const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const buffers = [
      Buffer.from(Uint8Array.of(33, ...new Numberu64(deposit_amount*(10**USDC_DECIMALS)).toBuffer()))
    ];
    ////console.log(Buffer.concat(buffers));
    const depositIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: pool_address, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: new PublicKey(decodedStakingDataState.farming_account), isSigner: false, isWritable: true },
            { pubkey: new PublicKey(decodedPoolDataState.Traders_Pool), isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        data: Buffer.concat(buffers)
    });
    let transactions = [
      depositIx
    ];

    let txid = await sendTransaction(connection,wallet,transactions,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Deposit Request sent successfully',
        type: "success",
      });
      await delay(3000);
      onRefresh();
    }
    ////console.log(txid);
  }

  const setSuperBonds = async (pool:number,status:number) => {
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
    //console.log(deposit_amount);

    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;
    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    if (decodedStakingDataState.operator_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Operator Account allowed',
        type: "error",
      });
      return;
    }

    // const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    // const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const buffers = [
      Buffer.from(Uint8Array.of(9,status))
    ];
    ////console.log(Buffer.concat(buffers));
    const setSuperBondsIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: pool_address, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false }
        ],
        data: Buffer.concat(buffers)
    });
    let transactions = [
      setSuperBondsIx
    ];

    let txid = await sendTransaction(connection,wallet,transactions,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Set SuperBonds Status Request sent successfully',
        type: "success",
      });
      await delay(3000);
      onRefresh();
    }
    ////console.log(txid);
  }

  const withdrawFund = async (_type: number, amount: number) =>{
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

    if (decodedStakingDataState.governance_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Governance Account allowed',
        type: "error",
      });
      return;
    }

    let msg = "";
    let decimals = 6;
    let token_account = null;
    let associated_token_account = null;
    if (_type == 1){
        msg = 'Withdrawing ' + amount + ' USDC from Treasury';
        token_account = decodedStakingDataState.Treasury;
        decimals = USDC_DECIMALS;
        associated_token_account = await findAssociatedTokenAddress(publicKey,USDC_MINT_ADDRESS);
    }
    else if (_type == 2){
        msg = 'Withdrawing ' + amount + ' SuperB from Treasury';
        token_account = decodedStakingDataState.Treasury_SuperB;
        decimals = SUPERB_DECIMALS;
        associated_token_account = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
    }
    else if (_type == 3){
        msg = 'Withdrawing ' + amount + ' SuperB from Fee Pool';
        token_account = decodedStakingDataState.SuperB_Pool;
        decimals = SUPERB_DECIMALS;
        associated_token_account = await findAssociatedTokenAddress(publicKey,SUPERB_MINT_ADDRESS);
    }
    if (!token_account || !associated_token_account){
      notify({
        message: 'Invalid Data',
        type: "error",
      });
      return;
    }

    notify({
      message: msg,
      type: "info",
    });

    // let staking_pool_info = next_account_info(account_info_iter)?;
    // let governance_account_info = next_account_info(account_info_iter)?;
    // let token_pda_info = next_account_info(account_info_iter)?;
    // //token accounts: Treasury, SuperB Treasury and SuperB Fee Account
    // let token_account_info = next_account_info(account_info_iter)?;
    // let receiver_token_account_info = next_account_info(account_info_iter)?;
    // let token_program_info = next_account_info(account_info_iter)?;

    let [pda_account/* , pda_nonce */] = await PublicKey.findProgramAddress([(new PublicKey(token_account)).toBuffer()], SUPERBONDS_PROGRAM_ID);

    const buffers = [
      Buffer.from(Uint8Array.of(41,...new Numberu64(amount*(10**decimals)).toBuffer()))
    ];
    ////console.log(Buffer.concat(buffers));
    const withdrawFundIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: pda_account, isSigner: false, isWritable: false },
            { pubkey: new PublicKey(token_account), isSigner: false, isWritable: true },
            { pubkey: associated_token_account, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        data: Buffer.concat(buffers)
    });
    let transactions = [
      withdrawFundIx
    ];

    let txid = await sendTransaction(connection,wallet,transactions,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Withdraw Request sent successfully',
        type: "success",
      });
      await delay(3000);
      onRefresh();
    }
  }

  const updateLP_Price = async (pool:number) =>{
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
    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;
    let lp_token_mint_address = pool == 30 ? LP_TOKEN_30_MINT_ADDRESS : LP_TOKEN_90_MINT_ADDRESS;

    const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    if (decodedStakingDataState.operator_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Operator Account allowed',
        type: "error",
      });
      return;
    }

    // const encodedPoolDataState = (await connection.getAccountInfo(pool_address, 'singleGossip'))!.data;
    // const decodedPoolDataState = POOL_DATA_LAYOUT.decode(encodedPoolDataState) as PoolDataLayout;
    // let platform_account_info = next_account_info(account_info_iter)?;
    // let state_pool_info = next_account_info(account_info_iter)?;
    // let lp_pool_account_info = next_account_info(account_info_iter)?;
    // let lp_token_mint_account_info = next_account_info(account_info_iter)?;
    // let operator_account_info = next_account_info(account_info_iter)?;
    // let token_program_info = next_account_info(account_info_iter)?;

    const buffers = [
      Buffer.from(Uint8Array.of(43))
    ];
    ////console.log(Buffer.concat(buffers));
    const updateLPPriceIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: pool_address, isSigner: false, isWritable: true },
            { pubkey: new PublicKey(decodedPoolDataState.LP_Pool), isSigner: false, isWritable: false },
            { pubkey: lp_token_mint_address, isSigner: false, isWritable: false },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        data: Buffer.concat(buffers)
    });
    let transactions = [
      updateLPPriceIx
    ];

    let txid = await sendTransaction(connection,wallet,transactions,[]);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'update LP Price request sent successfully',
        type: "success",
      });
      await delay(3000);
      onRefresh();
    }
  }
  return (
    <div>
      <br/>
      <h2>Pool Management</h2>
      <Row>
        <Col flex="1 1 45%" style={{margin:"10px"}}>
          <h3>Create new Pool</h3>
          <ConnectButton type="primary" onClick={()=>onCreate(30)} style={{marginRight:"10px"}}>
            CREATE 30-DAY POOL
          </ConnectButton>
          <ConnectButton type="primary" onClick={()=>onCreate(90)}>
            CREATE 90-DAY POOL
          </ConnectButton>
          <br/><br/>
          <Button type="primary" htmlType="submit" onClick={() => onRefresh()} style={{marginRight:"10px"}}>
            Refresh
          </Button>
          <Button type="primary" htmlType="submit" onClick={() => findPDA()} style={{marginRight:"10px"}}>
            Show PDA
          </Button>
          <Button type="primary" htmlType="submit" onClick={() => claimTreasury()} style={{marginRight:"10px"}}>
            Claim SuperB Treasury
          </Button>
          <br/><br/>
          <p>USDC Treasury Balance: <br/><span><strong>{Treasury_Balance} USDC</strong></span></p>
          <p>SuperB Treasury Balance: <br/><span><strong>{Treasury_SuperB_Balance} SuperB</strong></span></p>
          <p>SuperB Treasury last Update: <br/><span><strong>{stakingPool ? convertTimeStamp(1000 * new BN(stakingPool.last_update_treasury, 10, "le").toNumber()) : null}</strong></span></p>
          <p>SuperB Pool Balance (fee collected): <br/><span><strong>{SuperB_Pool_Balance} SB</strong></span></p>
          <br/>
          <p>Note: Withdraw to Governance Associated Token Account, if Governance is Contract address, the code needs to be changed.</p>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => withdrawFund(1,10)}>
            Withdraw USDC Treasury
          </Button>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => withdrawFund(2,100)}>
            Withdraw SuperB Treasury
          </Button>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => withdrawFund(3,100)}>
            Withdraw SuperB Fee
          </Button>
          <br/><br/><br/>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => setSuperBonds(30,1)}>
            Turn on SuperBonds 30-day Pool
          </Button>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => setSuperBonds(30,0)}>
            Turn off SuperBonds 30-day Pool
          </Button><br/><br/>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => setSuperBonds(90,1)}>
            Turn on SuperBonds 90-day Pool
          </Button>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => setSuperBonds(90,0)}>
            Turn off SuperBonds 90-day Pool
          </Button>
          <br/><br/>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => updateLP_Price(30)}>
            Update LP Price 30-day pool
          </Button>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => updateLP_Price(90)}>
            Update LP Price 90-day pool
          </Button>
        </Col>

        <Col flex="auto" style={{margin:"10px"}}>
          <h3>Update Yield</h3>
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              label="Yield"
              name="yield"
              rules={[{ required: true, message: 'Please enter yield!' }]}
            >
              <Input
              onChange={onChangeYield}
              type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onUpdateYield(30)}>
                Set 30-day Yield
              </Button>
              <Button type="primary" htmlType="submit" onClick={() => onUpdateYield(90)}>
                Set 90-day Yield
              </Button>
            </Form.Item>
          </Form>
          <h3>30-day Pool External Farming</h3>
          <p>Traders Pool: <span><strong>{Traders_Pool_30_Balance} USDC</strong></span></p>
          <p>farming_amount: <span><strong>{data30pool ? new BN(data30pool.farming_amount, 10, "le").toNumber()/1000000 : ""} USDC</strong></span></p>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onFarm(30)}>
            Farm 30-day pool
          </Button>
          <br/>
          <br/>
          <h3>90-day Pool External Farming</h3>
          <p>Traders Pool: <span><strong>{Traders_Pool_90_Balance} USDC</strong></span></p>
          <p>farming_amount: <span><strong>{data90pool ? new BN(data90pool.farming_amount, 10, "le").toNumber()/1000000 : ""} USDC</strong></span></p>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onFarm(90)}>
            Farm 90-day pool
          </Button>
        </Col>
        <Col flex="auto" style={{margin:"10px"}}>
          <h3>Deposit USDC to Trader Pools</h3>
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              label="Amount"
              name="yield"
              rules={[{ required: true, message: 'Please enter USDC amount!' }]}
            >
              <Input
              onChange={onChangeDepositAmount}
              type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onDepositTraderPool(30)}>
                Deposit to 30-day Trader Pool
              </Button>
              <Button type="primary" htmlType="submit" onClick={() => onDepositTraderPool(90)}>
                Deposit to 90-day Trader Pool
              </Button><br/>
              <p>operator_account: <br/><span><strong>{!stakingPool ? null :new PublicKey(stakingPool.operator_account).toBase58()}</strong></span></p>
              <p>usdc farming_account: <br/><span><strong>{!stakingPool ? null :new PublicKey(stakingPool.farming_account).toBase58()}</strong></span></p>
              <p>30-day farming_amount: <br/><span><strong>{!data30pool ? null :new BN(data30pool.farming_amount, 10, "le").toNumber()/1000000}</strong></span></p>
              <p>90-day farming_amount: <br/><span><strong>{!data90pool ? null :new BN(data90pool.farming_amount, 10, "le").toNumber()/1000000}</strong></span></p>
            </Form.Item>
          </Form>

        </Col>
      </Row>
      <br/>
      <br/>
      <Row>
        <Col flex="1 1 45%" style={{marginRight:"10px"}}>
          {data30pool ?
          <Card title="30-day Pool Settings">
            <p>Staking_Pool_Account: <br/><span><strong>{new PublicKey(data30pool.Staking_Pool_Account).toBase58()}</strong></span></p>
            <p>LP_Mint_Account: <br/><span><strong>{new PublicKey(data30pool.LP_Mint_Account).toBase58()}</strong></span></p>
            <p>LP Token Current Supply: <br/><span><strong>{lp_30_supply}</strong></span></p>
            <p>LP_Pool: <br/><span><strong>{new PublicKey(data30pool.LP_Pool).toBase58()}</strong></span></p>
            <p>Traders_Pool: <br/><span><strong>{new PublicKey(data30pool.Traders_Pool).toBase58()}</strong></span></p>
            <p>SuperBonds_Rewards_Pool: <br/><span><strong>{new PublicKey(data30pool.SuperBonds_Rewards_Pool).toBase58()}</strong></span></p>
            <p>Staked_LP_Token_Account: <br/><span><strong>{new PublicKey(data30pool.Staked_LP_Token_Account).toBase58()}</strong></span></p>


            <p>pool_number: <br/><span><strong>{parseInt(data30pool.pool_number.toString())}</strong></span></p>
            <p>pool_status: <br/><span><strong>{!stakingPool ? null : stakingPool.pool_status_vector[data30pool.pool_number] ? "ACTIVE" : "INACTIVE"}</strong></span></p>
            <p>pool_length: <br/><span><strong>{!stakingPool ? null : stakingPool.pool_length_vector[data30pool.pool_number]}</strong></span></p>
            <p>pool_yield: <br/><span><strong>{!stakingPool ? null :  stakingPool.pool_yield_vector[data30pool.pool_number]/100}%</strong></span></p>
            <p>Risk Factor Ratio: <br/><span><strong>{!stakingPool ? null : stakingPool.pool_risk_factor_vector[data30pool.pool_number]/1000000 }</strong></span></p>

            <p>transaction_fee_SuperB: <br/><span><strong>{new BN(data30pool.transaction_fee_SuperB, 10, "le").toNumber()/1000000}</strong></span></p>
            <p>superB_fee_burn_portion: <br/><span><strong>{parseInt(data30pool.superB_fee_burn_portion.toString())/100}%</strong></span></p>
            <p>add_liquidity_fee_USDC: <br/><span><strong>{parseInt(data30pool.add_liquidity_fee_USDC.toString())/100}%</strong></span></p>
            <p>remove_liquidity_fee_USDC: <br/><span><strong>{parseInt(data30pool.remove_liquidity_fee_USDC.toString())/100}%</strong></span></p>
            <p>stake_LP_fee: <br/><span><strong>{parseInt(data30pool.stake_LP_fee.toString())/100}%</strong></span></p>
            <p>unstake_LP_fee: <br/><span><strong>{parseInt(data30pool.unstake_LP_fee.toString())/100}%</strong></span></p>
            <p>trade_fee_USDC: <br/><span><strong>{parseInt(data30pool.trade_fee_USDC.toString())/100}%</strong></span></p>
            <p>early_redemption_fee_USDC: <br/><span><strong>{parseInt(data30pool.early_redemption_fee_USDC.toString())/100}%</strong></span></p>
            <p>mature_redemption_fee_USDC: <br/><span><strong>{parseInt(data30pool.mature_redemption_fee_USDC.toString())/100}%</strong></span></p>
            <p>external_farming_ratio: <br/><span><strong>{parseInt(data30pool.external_farming_ratio.toString())/100}%</strong></span></p>
            <p>superBonds_rate: <br/><span><strong>{parseInt(data30pool.superBonds_rate.toString())/100}x</strong></span></p>
            <p>superBonds_income_ratio: <br/><span><strong>{parseInt(data30pool.superBonds_income_ratio.toString())/100}%</strong></span></p>
            <p>treasury_income_ratio: <br/><span><strong>{parseInt(data30pool.treasury_income_ratio.toString())/100}%</strong></span></p>
            <p>reserved_multiplier_LP_Pool: <br/><span><strong>{parseInt(data30pool.reserved_multiplier_LP_Pool.toString())/100}x</strong></span></p>
            <p>trade_liquidity_availability: <br/><span><strong>{parseInt(data30pool.trade_liquidity_availability.toString())/100}%</strong></span></p>

            <p>lp_price: <br/><span><strong>{parseFloat(data30pool.lp_price.toString())/1000000}</strong></span></p>
            <p>totalLongAmount: <br/><span><strong>{new BN(data30pool.totalLongAmount, 10, "le").toNumber()/1000000}</strong></span></p>

            <p>longInterest_At_Maturity: <br/><span><strong>{new BN(data30pool.longInterest_At_Maturity, 10, "le").toNumber()/1000000}</strong></span></p>

            <p>adjustedLiquidity: <br/><span><strong>{new BN(data30pool.adjustedLiquidity, 10, "le").toNumber()/1000000}</strong></span></p>
            <p>LP Pool: <br/><span><strong>{LP_Pool_30_Balance} USDC</strong></span></p>
            <p>Traders Pool: <br/><span><strong>{Traders_Pool_30_Balance} USDC</strong></span></p>
            <p>SUPERB Pool: <br/><span><strong>{SuperB_Pool_30_Balance}</strong></span></p>
            <p>SuperBonds Rewards Pool: <br/><span><strong>{SuperBonds_Rewards_Pool_30_Balance} USDC</strong></span></p>

            <p>is_superbonds_time: <br/><span><strong>{data30pool.is_superbonds_time ? "ACTIVE" : "INACTIVE"}</strong></span></p><br/>

            <p>farming_amount: <br/><span><strong>{new BN(data30pool.farming_amount, 10, "le").toNumber()/1000000}</strong></span></p>

          </Card>
          :
          null
          }
        </Col>

        <Col flex="auto" style={{marginRight:"10px"}}>
          {data90pool ?
          <Card title="90-day Pool Settings">
            <p>Staking_Pool_Account: <br/><span><strong>{new PublicKey(data90pool.Staking_Pool_Account).toBase58()}</strong></span></p>
            <p>LP_Mint_Account: <br/><span><strong>{new PublicKey(data90pool.LP_Mint_Account).toBase58()}</strong></span></p>
            <p>LP Token Current Supply: <br/><span><strong>{lp_90_supply}</strong></span></p>
            <p>LP_Pool: <br/><span><strong>{new PublicKey(data90pool.LP_Pool).toBase58()}</strong></span></p>
            <p>Traders_Pool: <br/><span><strong>{new PublicKey(data90pool.Traders_Pool).toBase58()}</strong></span></p>
            <p>SuperBonds_Rewards_Pool: <br/><span><strong>{new PublicKey(data90pool.SuperBonds_Rewards_Pool).toBase58()}</strong></span></p>
            <p>Staked_LP_Token_Account: <br/><span><strong>{new PublicKey(data90pool.Staked_LP_Token_Account).toBase58()}</strong></span></p>


            <p>pool_number: <br/><span><strong>{parseInt(data90pool.pool_number.toString())}</strong></span></p>
            <p>pool_status: <br/><span><strong>{!stakingPool ? null : stakingPool.pool_status_vector[data90pool.pool_number] ? "ACTIVE" : "INACTIVE"}</strong></span></p>
            <p>pool_length: <br/><span><strong>{!stakingPool ? null : stakingPool.pool_length_vector[data90pool.pool_number]}</strong></span></p>
            <p>pool_yield: <br/><span><strong>{!stakingPool ? null :  stakingPool.pool_yield_vector[data90pool.pool_number]/100 }%</strong></span></p>
            <p>Risk Factor Ratio: <br/><span><strong>{!stakingPool ? null : stakingPool.pool_risk_factor_vector[data90pool.pool_number]/1000000 }</strong></span></p>

            <p>transaction_fee_SuperB: <br/><span><strong>{new BN(data90pool.transaction_fee_SuperB, 10, "le").toNumber()/1000000}</strong></span></p>
            <p>superB_fee_burn_portion: <br/><span><strong>{parseInt(data90pool.superB_fee_burn_portion.toString())/100}%</strong></span></p>
            <p>add_liquidity_fee_USDC: <br/><span><strong>{parseInt(data90pool.add_liquidity_fee_USDC.toString())/100}%</strong></span></p>
            <p>remove_liquidity_fee_USDC: <br/><span><strong>{parseInt(data90pool.remove_liquidity_fee_USDC.toString())/100}%</strong></span></p>
            <p>stake_LP_fee: <br/><span><strong>{parseInt(data90pool.stake_LP_fee.toString())/100}%</strong></span></p>
            <p>unstake_LP_fee: <br/><span><strong>{parseInt(data90pool.unstake_LP_fee.toString())/100}%</strong></span></p>
            <p>trade_fee_USDC: <br/><span><strong>{parseInt(data90pool.trade_fee_USDC.toString())/100}%</strong></span></p>
            <p>early_redemption_fee_USDC: <br/><span><strong>{parseInt(data90pool.early_redemption_fee_USDC.toString())/100}%</strong></span></p>
            <p>mature_redemption_fee_USDC: <br/><span><strong>{parseInt(data90pool.mature_redemption_fee_USDC.toString())/100}%</strong></span></p>
            <p>external_farming_ratio: <br/><span><strong>{parseInt(data90pool.external_farming_ratio.toString())/100}%</strong></span></p>
            <p>superBonds_rate: <br/><span><strong>{parseInt(data90pool.superBonds_rate.toString())/100}x</strong></span></p>
            <p>superBonds_income_ratio: <br/><span><strong>{parseInt(data90pool.superBonds_income_ratio.toString())/100}%</strong></span></p>
            <p>treasury_income_ratio: <br/><span><strong>{parseInt(data90pool.treasury_income_ratio.toString())/100}%</strong></span></p>
            <p>reserved_multiplier_LP_Pool: <br/><span><strong>{parseInt(data90pool.reserved_multiplier_LP_Pool.toString())/100}x</strong></span></p>
            <p>trade_liquidity_availability: <br/><span><strong>{parseInt(data90pool.trade_liquidity_availability.toString())/100}%</strong></span></p>

            <p>lp_price: <br/><span><strong>{parseFloat(data90pool.lp_price.toString())/1000000}</strong></span></p>
            <p>totalLongAmount: <br/><span><strong>{new BN(data90pool.totalLongAmount, 10, "le").toNumber()/1000000}</strong></span></p>

            <p>longInterest_At_Maturity: <br/><span><strong>{new BN(data90pool.longInterest_At_Maturity, 10, "le").toNumber()/1000000}</strong></span></p>

            <p>adjustedLiquidity: <br/><span><strong>{new BN(data90pool.adjustedLiquidity, 10, "le").toNumber()/1000000}</strong></span></p>

            <p>LP Pool: <br/><span><strong>{LP_Pool_90_Balance} USDC</strong></span></p>
            <p>Traders Pool: <br/><span><strong>{Traders_Pool_90_Balance} USDC</strong></span></p>
            <p>SUPERB Pool: <br/><span><strong>{SuperB_Pool_90_Balance}</strong></span></p>
            <p>SuperBonds Rewards Pool: <br/><span><strong>{SuperBonds_Rewards_Pool_90_Balance} USDC</strong></span></p>
            <p>is_superbonds_time: <br/><span><strong>{data90pool.is_superbonds_time ? "ACTIVE" : "INACTIVE"}</strong></span></p><br/>

            <p>farming_amount: <br/><span><strong>{new BN(data90pool.farming_amount, 10, "le").toNumber()/1000000}</strong></span></p>

          </Card>
          :
          null
          }
        </Col>

      </Row>
    </div>
  );
};
