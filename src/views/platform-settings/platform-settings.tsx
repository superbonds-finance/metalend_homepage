/* eslint-disable eqeqeq */
import { Row, Col, Input, Form, Card, Button } from 'antd';
import React, { useEffect, useState, useCallback } from "react";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { notify } from "../../utils/notifications";
import { ConnectButton } from "./../../components/ConnectButton";
import { SUPERBONDS_PROGRAM_ID,
         SUPERB_MINT_ADDRESS,
         PLATFORM_DATA_ACCOUNT,
         USDC_MINT_ADDRESS,
         SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
         SUNNY_MINT_ADDRESS,
         SABER_MINT_ADDRESS,
         ORCA_MINT_ADDRESS,
         POOL_30_ADDRESS,
         STAKING_DATA_ACCOUNT,
         FREE_TOKEN_PROGRAM_ID
       } from "../../utils/ids";
import { Numberu64 } from "../../utils/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {STAKING_DATA_LAYOUT,StakingDataLayout} from "../../utils/staking_data_layout";
import {MULTISIG_LAYOUT} from "../../utils/multisig_data";
import {FREETOKEN_DATA_LAYOUT} from "../../utils/free_token_data_layout";
import {
  Account,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import BN from "bn.js";
import { numberFormatter,truncateStr,convertTimeStamp,delay } from "../../utils/utils";
import { findAssociatedTokenAddress } from "../../contexts/accounts";

export const StakingManagementView = () => {
  const connection = useConnection();
  const wallet = useWallet();

  const [PlatformData, setPlatformData] = useState<any>();
  const [StakingData, setStakingData] = useState<any>();

  useEffect(() => {
    if (!wallet.publicKey) return;
    readPlatformData();
    readAllMultiSig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);

  const onCreate = async () => {

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
      const programInfo = await connection.getAccountInfo(SUPERBONDS_PROGRAM_ID);
      if (programInfo == null) {
        notify({
          message: 'Cannot connect to SuperBonds Program',
          type: "error",
        });
        return;
      }
      //Staking State Account
      const staking_state_account = new Account();
      console.log('staking_state_account',staking_state_account.publicKey.toString());
      const createStakingStateAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: STAKING_DATA_LAYOUT.span,
          lamports: await connection.getMinimumBalanceForRentExemption(STAKING_DATA_LAYOUT.span),
          fromPubkey: publicKey,
          newAccountPubkey: staking_state_account.publicKey
      });

      //Platform State Account
      const platform_state_account = new Account();
      console.log('platform_state_account',platform_state_account.publicKey.toString());
      const createPlatformStateAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: PLATFORM_DATA_LAYOUT.span,
          lamports: await connection.getMinimumBalanceForRentExemption(PLATFORM_DATA_LAYOUT.span),
          fromPubkey: publicKey,
          newAccountPubkey: platform_state_account.publicKey
      });

      //Create Token Account to hold 6B SuperB
      const SuperB_Account = new Account();
      console.log('SuperB_Account',SuperB_Account.publicKey.toBase58());
      const createSuperB_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: SuperB_Account.publicKey
      });
      const initSuperB_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, SUPERB_MINT_ADDRESS, SuperB_Account.publicKey, publicKey);

      //Create Token Account to hold Treasury USDC
      const Treasury_Account = new Account();
      console.log('Treasury_Account',Treasury_Account.publicKey.toBase58());
      const createTreasury_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: Treasury_Account.publicKey
      });
      const initTreasury_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, USDC_MINT_ADDRESS, Treasury_Account.publicKey, publicKey);

      //Create Token Account to hold Treasury SuperB
      const Treasury_SuperB_Account = new Account();
      console.log('Treasury_SuperB_Account',Treasury_SuperB_Account.publicKey.toBase58());
      const createTreasury_SuperB_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: Treasury_SuperB_Account.publicKey
      });
      const initTreasury_SuperB_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, SUPERB_MINT_ADDRESS, Treasury_SuperB_Account.publicKey, publicKey);

      //Create Token Account to hold SuperB fee
      const SuperB_Pool_Account = new Account();
      console.log('SuperB_Pool_Account',SuperB_Pool_Account.publicKey.toBase58());
      const createSuperB_Pool_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: SuperB_Pool_Account.publicKey
      });
      const initSuperB_Pool_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, SUPERB_MINT_ADDRESS, SuperB_Pool_Account.publicKey, publicKey);

      //Create Token Account to hold Staked SB Token
      const Staked_SB_Token_Account = new Account();
      console.log('Staked_SB_Token_Account',Staked_SB_Token_Account.publicKey.toBase58());
      const createStaked_SB_Token_AccountIx = SystemProgram.createAccount({
          programId: TOKEN_PROGRAM_ID,
          space: AccountLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
          fromPubkey: publicKey,
          newAccountPubkey: Staked_SB_Token_Account.publicKey
      });
      const initStaked_SB_Token_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, SUPERB_MINT_ADDRESS, Staked_SB_Token_Account.publicKey, publicKey);

      const buffers = [
        Buffer.from(Uint8Array.of(3))
      ];
      console.log(Buffer.concat(buffers));

      let associated_USDC_token_account_address = await findAssociatedTokenAddress(publicKey,USDC_MINT_ADDRESS);

      //check if associated_USDC_token_account_address is is_initialized
      let associated_USDC_token_account_address_info = await connection.getAccountInfo(associated_USDC_token_account_address);
        //check if lp token is initialized or not
      if (!associated_USDC_token_account_address_info) {
          console.log("Create saber_usdc_usdc_lp_token_account");
          let associated_USDC_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              USDC_MINT_ADDRESS,
              associated_USDC_token_account_address,
              publicKey,
              publicKey
          );
          let txid = await sendTransaction(connection,wallet,
              [associated_USDC_token_account_address_creationIx
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

      const initPoolIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: staking_state_account.publicKey, isSigner: false, isWritable: true },
              { pubkey: platform_state_account.publicKey, isSigner: false, isWritable: true },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: new PublicKey("D9HYvgsYPwUwFPX6U91X51xcZU8xT9T5vPKtdKwZEsF"), isSigner: false, isWritable: false },
              { pubkey: new PublicKey("ZmdFb6UVnNdgfHQNhFkmL4VudLDBhVwBGe3uAMhLfXs"), isSigner: false, isWritable: false },
              { pubkey: SUPERB_MINT_ADDRESS, isSigner: false, isWritable: false },
              { pubkey: USDC_MINT_ADDRESS, isSigner: false, isWritable: false },
              { pubkey: SuperB_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: Treasury_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: Treasury_SuperB_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: SuperB_Pool_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: Staked_SB_Token_Account.publicKey, isSigner: false, isWritable: true },
              { pubkey: associated_USDC_token_account_address, isSigner: false, isWritable: false },
              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
          ],
          data: Buffer.concat(buffers)
      });

      let txid1 = await sendTransaction(connection,wallet,
          [
            createStakingStateAccountIx,
            createPlatformStateAccountIx,
            createSuperB_AccountIx,initSuperB_AccountIx,
            createTreasury_AccountIx,initTreasury_AccountIx,
            createSuperB_Pool_AccountIx,initSuperB_Pool_AccountIx,

        ]
        ,[staking_state_account,platform_state_account,SuperB_Account,Treasury_Account,SuperB_Pool_Account],false);
      if (!txid1){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
        return;
      }else{
        let txid2 = await sendTransaction(connection,wallet,
            [
              createStaked_SB_Token_AccountIx,initStaked_SB_Token_AccountIx,
              createTreasury_SuperB_AccountIx,initTreasury_SuperB_AccountIx,
              initPoolIx
          ]
          ,[Staked_SB_Token_Account,Treasury_SuperB_Account],false);
          if (!txid2){
            notify({
              message: 'Something wrong with your request!',
              type: "error",
            });
            return;
          }
          else{

              notify({
                message: 'Created Staking Pool successfully',
                type: "success",
              });

          }

      }

  }

  const readPlatformData = async () => {
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

    const encodedPoolDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedPoolDataState = PLATFORM_DATA_LAYOUT.decode(encodedPoolDataState) as PlatformDataLayout;
    console.log(decodedPoolDataState);
    setPlatformData(decodedPoolDataState);

    const encodedStakingDataState = (await connection.getAccountInfo(STAKING_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = STAKING_DATA_LAYOUT.decode(encodedStakingDataState) as StakingDataLayout;
    console.log(decodedStakingDataState);
    setStakingData(decodedStakingDataState);


  }

  const [multisigs,setMultiSigs] = useState<any>();
  const [multisig_accounts,setMultiSig_Accounts] = useState<any>();

  const readAllMultiSig = async () => {
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

    let filters = [{"dataSize":268}];
    const resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    });
    console.log('multisig',resp);

    let tableData:any[] = [];
    let accountData:any[] = [];
    for (var index=0;index<resp.length;index++) {
      const encodedPoolDataState = resp[index].account.data;
      const decodedPoolDataState = MULTISIG_LAYOUT.decode(encodedPoolDataState);// as TradeLayout;
      tableData.push(decodedPoolDataState);
      accountData.push(resp[index].pubkey.toBase58());
    }
    console.log(tableData);
    setMultiSigs(tableData);
    setMultiSig_Accounts(accountData);

  }

  const onRefresh = async() => {
    readPlatformData();
    readAllMultiSig();
  }

  const [new_gov,setNew_gov] = useState("");
  const [new_index,setNew_index] = useState(0);

  const onChangeGov = useCallback( (e) => {
      const { value } = e.target;
      setNew_gov(value);
    },[]);
  const onChangeAdmin = useCallback( (e) => {
      const { value } = e.target;
      setNew_index(parseInt(value));
    },[]);

  const isAdmin = (admins:any,admin:string) =>{
    let len = admins.length;
    for (var i=0;i<len;i++){
      if (admins[i].toString() == admin)
        return true;
    }
    return false;
  }
  const onUpdateGov = async (isGov:number) => {
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

      if (new_gov == ""){
        notify({
          message: 'Please enter a Solana Address',
          type: "error",
        });
        return;
      }
      const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
      const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

      if (!isAdmin(decodedStakingDataState.admin_accounts,publicKey.toString())){
        notify({
          message: 'Only Admin Account allowed',
          type: "error",
        });
        return;
      }
      //Staking State Account
      const multisig_state_account = new Account();
      console.log('multisig_state_account',multisig_state_account.publicKey.toString());
      const createMultiSigStateAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: MULTISIG_LAYOUT.span,
          lamports: await connection.getMinimumBalanceForRentExemption(MULTISIG_LAYOUT.span),
          fromPubkey: publicKey,
          newAccountPubkey: multisig_state_account.publicKey
      });

      if (isGov == 1){
        const buffers = [
          Buffer.from(Uint8Array.of(2,1,0))
        ];
        //console.log(Buffer.concat(buffers));
        const setGovIx = new TransactionInstruction({
            programId: SUPERBONDS_PROGRAM_ID,
            keys: [
                { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
                { pubkey: publicKey, isSigner: true, isWritable: false },
                { pubkey: new PublicKey(new_gov), isSigner: false, isWritable: false },
                { pubkey: multisig_state_account.publicKey, isSigner: false, isWritable: true },
            ],
            data: Buffer.concat(buffers)
        });
        let transactions = [
          createMultiSigStateAccountIx,
          setGovIx
        ];

        let txid = await sendTransaction(connection,wallet,transactions,[multisig_state_account],false);
        if (!txid){
          notify({
            message: 'Something wrong with your request!',
            type: "error",
          });
        }else{
          notify({
            message: 'Updated overnance successfully',
            type: "success",
          });
          await delay(2000);
          onRefresh();
        }
      }
      else if (isGov == 0){
        let associated_USDC_token_account_address = await findAssociatedTokenAddress(new PublicKey(new_gov),USDC_MINT_ADDRESS);

        //check if associated_USDC_token_account_address is is_initialized
        let associated_USDC_token_account_address_info = await connection.getAccountInfo(associated_USDC_token_account_address);
          //check if lp token is initialized or not
        if (!associated_USDC_token_account_address_info) {
            console.log("Create associated_USDC_token_account_address");
            let associated_USDC_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
                SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                USDC_MINT_ADDRESS,
                associated_USDC_token_account_address,
                new PublicKey(new_gov),
                publicKey
            );
            let txid = await sendTransaction(connection,wallet,
                [associated_USDC_token_account_address_creationIx
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

        const buffers = [
          Buffer.from(Uint8Array.of(2,0,0))
        ];
        //console.log(Buffer.concat(buffers));
        const setOpIx = new TransactionInstruction({
            programId: SUPERBONDS_PROGRAM_ID,
            keys: [
                { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
                { pubkey: publicKey, isSigner: true, isWritable: false },
                { pubkey: new PublicKey(new_gov), isSigner: false, isWritable: false },
                { pubkey: multisig_state_account.publicKey, isSigner: false, isWritable: true },
                { pubkey: associated_USDC_token_account_address, isSigner: false, isWritable: false },

            ],
            data: Buffer.concat(buffers)
        });
        let transactions = [
          createMultiSigStateAccountIx,
          setOpIx
        ];

        let txid = await sendTransaction(connection,wallet,transactions,[multisig_state_account],false);
        if (!txid){
          notify({
            message: 'Something wrong with your request!',
            type: "error",
          });
        }else{
          notify({
            message: 'Updated new Operator successfully',
            type: "success",
          });
          await delay(2000);
          onRefresh();
        }
      }
      //console.log(txid);
    }
  const onUpdateAdmin = async () => {
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

    if (new_gov == ""){
      notify({
        message: 'Please enter a Solana Address',
        type: "error",
      });
      return;
    }
    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    if (!isAdmin(decodedStakingDataState.admin_accounts,publicKey.toString())){
      notify({
        message: 'Only Admin Account allowed',
        type: "error",
      });
      return;
    }
    //Staking State Account
    const multisig_state_account = new Account();
    console.log('multisig_state_account',multisig_state_account.publicKey.toString());
    const createMultiSigStateAccountIx = SystemProgram.createAccount({
        programId: SUPERBONDS_PROGRAM_ID,
        space: MULTISIG_LAYOUT.span,
        lamports: await connection.getMinimumBalanceForRentExemption(MULTISIG_LAYOUT.span),
        fromPubkey: publicKey,
        newAccountPubkey: multisig_state_account.publicKey
    });

    const buffers = [
      Buffer.from(Uint8Array.of(2,2,new_index))
    ];
    //console.log(Buffer.concat(buffers));
    const setAdminIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: new PublicKey(new_gov), isSigner: false, isWritable: false },
            { pubkey: multisig_state_account.publicKey, isSigner: false, isWritable: true },
        ],
        data: Buffer.concat(buffers)
    });
    let transactions = [
      createMultiSigStateAccountIx,
      setAdminIx
    ];

    let txid = await sendTransaction(connection,wallet,transactions,[multisig_state_account],false);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Updated overnance successfully',
        type: "success",
      });
      await delay(2000);
      onRefresh();
    }

    //console.log(txid);
  }

  const [farm_address,setFarm_Address] = useState("");
  const [farm_id,setFarm_ID] = useState(0);

  const onCreateAccount = async (_farm_id:number) =>{
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

    setFarm_ID(_farm_id);
    let MINT_ACCOUNT = SUNNY_MINT_ADDRESS;
    if (_farm_id == 1) MINT_ACCOUNT = SABER_MINT_ADDRESS;
    else if (_farm_id == 2) MINT_ACCOUNT = ORCA_MINT_ADDRESS;

    //Create Token Account to hold Rewards
    const Token_Account = new Account();
    console.log('Token_Account',Token_Account.publicKey.toBase58());
    const createToken_AccountIx = SystemProgram.createAccount({
        programId: TOKEN_PROGRAM_ID,
        space: AccountLayout.span,
        lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
        fromPubkey: publicKey,
        newAccountPubkey: Token_Account.publicKey
    });
    let [FARM_TOKEN_PDA/* , FARM_TOKEN_NONCE */] = await PublicKey.findProgramAddress([Token_Account.publicKey.toBuffer()], SUPERBONDS_PROGRAM_ID);

    const initToken_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, MINT_ACCOUNT, Token_Account.publicKey, publicKey);
    const changeOwnerIx = Token.createSetAuthorityInstruction(TOKEN_PROGRAM_ID,Token_Account.publicKey,FARM_TOKEN_PDA,'AccountOwner',publicKey,[]);
    setFarm_Address(Token_Account.publicKey.toBase58());
    let txid = await sendTransaction(connection,wallet,
        [createToken_AccountIx,initToken_AccountIx,changeOwnerIx]
      ,[Token_Account],false);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Account Creating Request Sent',
        type: "success",
      });
    }

  }
  const onUpdateFarm = async () =>{
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

    const buffers = [
      Buffer.from(Uint8Array.of(7,26,...new Numberu64(farm_id).toBuffer())),

    ];

    const updateAccountIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: POOL_30_ADDRESS, isSigner: false, isWritable: true }, //Not important
            { pubkey: publicKey, isSigner: true, isWritable: true },
            { pubkey: new PublicKey(farm_address), isSigner: false, isWritable: false },

        ],
        data: Buffer.concat(buffers)
    });

    let txid = await sendTransaction(connection,wallet,
        [updateAccountIx]
      ,[],false);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Update Request Sent',
        type: "success",
      });
    }
  }
  const onMultiSigApprove = async (key:number,data_type:any,new_value:any,index:any) =>{
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

    if (!isAdmin(decodedStakingDataState.admin_accounts,publicKey.toString())){
      notify({
        message: 'Only Admin Account allowed',
        type: "error",
      });
      return;
    }
    //Staking State Account
    const multisig_state_account = new PublicKey(multisig_accounts[key]);

    if (data_type == 1){
      const buffers = [
        Buffer.from(Uint8Array.of(2,1,0))
      ];
      //console.log(Buffer.concat(buffers));
      const setGovIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: new PublicKey(new_value), isSigner: false, isWritable: false },
              { pubkey: multisig_state_account, isSigner: false, isWritable: true },
          ],
          data: Buffer.concat(buffers)
      });
      let transactions = [
        setGovIx
      ];

      let txid = await sendTransaction(connection,wallet,transactions,[],false);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        notify({
          message: 'Update Governance Request sent',
          type: "success",
        });
        await delay(2000);
        onRefresh();
      }
    }
    else if (data_type == 2){
      let associated_USDC_token_account_address = await findAssociatedTokenAddress(new PublicKey(new_value),USDC_MINT_ADDRESS);

      //check if associated_USDC_token_account_address is is_initialized
      let associated_USDC_token_account_address_info = await connection.getAccountInfo(associated_USDC_token_account_address);
        //check if lp token is initialized or not
      if (!associated_USDC_token_account_address_info) {
          console.log("Create associated_USDC_token_account_address");
          let associated_USDC_token_account_address_creationIx = Token.createAssociatedTokenAccountInstruction(
              SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              USDC_MINT_ADDRESS,
              associated_USDC_token_account_address,
              new PublicKey(new_value),
              publicKey
          );
          let txid = await sendTransaction(connection,wallet,
              [associated_USDC_token_account_address_creationIx
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

      const buffers = [
        Buffer.from(Uint8Array.of(2,0,0))
      ];
      //console.log(Buffer.concat(buffers));
      const setOpIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: new PublicKey(new_value), isSigner: false, isWritable: false },
              { pubkey: multisig_state_account, isSigner: false, isWritable: true },
              { pubkey: associated_USDC_token_account_address, isSigner: false, isWritable: false },

          ],
          data: Buffer.concat(buffers)
      });
      let transactions = [
        setOpIx
      ];

      let txid = await sendTransaction(connection,wallet,transactions,[],false);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        notify({
          message: 'Update new Operator Request sent',
          type: "success",
        });
        await delay(2000);
        onRefresh();
      }
    }
    else if (data_type == 3){
      const buffers = [
        Buffer.from(Uint8Array.of(2,2,index))
      ];
      //console.log(Buffer.concat(buffers));
      const setAdminIx = new TransactionInstruction({
          programId: SUPERBONDS_PROGRAM_ID,
          keys: [
              { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
              { pubkey: publicKey, isSigner: true, isWritable: false },
              { pubkey: new PublicKey(new_value), isSigner: false, isWritable: false },
              { pubkey: multisig_state_account, isSigner: false, isWritable: true },
          ],
          data: Buffer.concat(buffers)
      });
      let transactions = [
        setAdminIx
      ];

      let txid = await sendTransaction(connection,wallet,transactions,[],false);
      if (!txid){
        notify({
          message: 'Something wrong with your request!',
          type: "error",
        });
      }else{
        notify({
          message: 'Update Admin Request sent',
          type: "success",
        });
        await delay(2000);
        onRefresh();
      }

    }

  }

  const onInitializeFreeTokenPool = async () => {
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
    //Platform State Account
    const freetoken_state_account = new Account();
    console.log('freetoken_state_account',freetoken_state_account.publicKey.toString());
    const createPlatformStateAccountIx = SystemProgram.createAccount({
        programId: FREE_TOKEN_PROGRAM_ID,
        space: FREETOKEN_DATA_LAYOUT.span,
        lamports: await connection.getMinimumBalanceForRentExemption(FREETOKEN_DATA_LAYOUT.span),
        fromPubkey: publicKey,
        newAccountPubkey: freetoken_state_account.publicKey
    });

    //Create Token Account to hold 6B SuperB
    const SuperB_Account = new Account();
    console.log('SuperB_Account',SuperB_Account.publicKey.toBase58());
    const createSuperB_AccountIx = SystemProgram.createAccount({
        programId: TOKEN_PROGRAM_ID,
        space: AccountLayout.span,
        lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
        fromPubkey: publicKey,
        newAccountPubkey: SuperB_Account.publicKey
    });
    const initSuperB_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, SUPERB_MINT_ADDRESS, SuperB_Account.publicKey, publicKey);
    //Create Token Account to hold 6B SuperB
    const USDC_Account = new Account();
    console.log('USDC_Account',USDC_Account.publicKey.toBase58());
    const createUSDC_AccountIx = SystemProgram.createAccount({
        programId: TOKEN_PROGRAM_ID,
        space: AccountLayout.span,
        lamports: await connection.getMinimumBalanceForRentExemption(AccountLayout.span, 'singleGossip'),
        fromPubkey: publicKey,
        newAccountPubkey: USDC_Account.publicKey
    });
    const initUSDC_AccountIx = Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, USDC_MINT_ADDRESS, USDC_Account.publicKey, publicKey);
    const buffers = [
      Buffer.from(Uint8Array.of(0))
    ];
    const initFreeTokensIx = new TransactionInstruction({
        programId: FREE_TOKEN_PROGRAM_ID,
        keys: [
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: SuperB_Account.publicKey, isSigner: false, isWritable: true },
            { pubkey: USDC_Account.publicKey, isSigner: false, isWritable: true },
            { pubkey: freetoken_state_account.publicKey, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
        ],
        data: Buffer.concat(buffers)
    });

    let txid1 = await sendTransaction(connection,wallet,
        [
          createPlatformStateAccountIx,
          createSuperB_AccountIx,initSuperB_AccountIx,
          createUSDC_AccountIx,initUSDC_AccountIx,
          initFreeTokensIx,

      ]
      ,[freetoken_state_account,SuperB_Account,USDC_Account],false);
    if (!txid1){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
      return;
    }else{
      notify({
        message: 'Created Free Tokens Pool!',
        type: "error",
      });
      return;
    }
  }
  return (
    <div>
      <br/>
      <h2>Platform Settings</h2>
      <Row>
        <Col span={10} style={{margin:"10px"}}>
          <ConnectButton type="primary" onClick={()=>onCreate()} style={{marginRight:"10px"}}>
            INIT STAKING POOL
          </ConnectButton>
          <br/><br/>
          <ConnectButton type="primary" onClick={()=>readPlatformData()} style={{marginRight:"10px"}}>
            Refresh
          </ConnectButton>
          <br/><br/>
          <h3>Update Farm Rewards Accounts</h3>
          <p>To receive Reward from External Farming. SUNNY = 0 _ SABER = 1 _ ORCA = 2</p>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onCreateAccount(0)}>
           SUNNY Account
          </Button>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onCreateAccount(1)}>
           SABER Account
          </Button>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onCreateAccount(2)}>
           ORCA Account
          </Button>
          <br/><br/>
          <p>{farm_address}</p>
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onUpdateFarm()}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <h3>Update Governance/Operator/Admin Account</h3>
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              label="New Governance/Operator/Admin"
              name="new_governance"
              rules={[{ required: true, message: 'Please enter Sol Address!' }]}
            >
              <Input
              onChange={onChangeGov}
              type="text" />
            </Form.Item>
            <Form.Item
              label="Index (0-10) Admin only"
              name="admin_index"
            >
              <Input
              onChange={onChangeAdmin}
              type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onUpdateGov(1)}>
                New Gov Request (Multisig)
              </Button>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onUpdateGov(0)}>
                New Operator Request (Multisig)
              </Button>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onUpdateAdmin()}>
                New Admin Request (Multisig)
              </Button>
            </Form.Item>
          </Form>
          <h3>Free Tokens for DevNet</h3>
          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onInitializeFreeTokenPool()}>
            Initilize
          </Button>
        </Col>
        <br />
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
        {PlatformData ?
          <Card title="Platform Details">
            <p>staking_account: <br/><span><strong>{!PlatformData.staking_account ? null :new PublicKey(PlatformData.staking_account).toBase58()}</strong></span></p>
            <p>admin_accounts: <br/><span><strong>{!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[0]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[1]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[2]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[3]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[4]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[5]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[6]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[7]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[8]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[9]).toBase58()
            } <br/>
            {!PlatformData.admin_accounts ? null :
              new PublicKey(PlatformData.admin_accounts[10]).toBase58()
            } <br/>
            </strong></span></p>
            <p>governance_account: <br/><span><strong>{!PlatformData.governance_account ? null :new PublicKey(PlatformData.governance_account).toBase58()}</strong></span></p>
            <p>operator_account: <br/><span><strong>{!PlatformData.operator_account ? null :new PublicKey(PlatformData.operator_account).toBase58()}</strong></span></p>
            <p>SuperB_Mint_Account: <br/><span><strong>{!PlatformData.SuperB_Mint_Account ? null :new PublicKey(PlatformData.SuperB_Mint_Account).toBase58()}</strong></span></p>
            <p>USDC_Mint_Account: <br/><span><strong>{!PlatformData.USDC_Mint_Account ? null :new PublicKey(PlatformData.USDC_Mint_Account).toBase58()}</strong></span></p>

            <p>SuperB_Account: <br/><span><strong>{!PlatformData.SuperB_Account ? null :new PublicKey(PlatformData.SuperB_Account).toBase58()}</strong></span></p>
            <p>Staked_SB_Token_Account: <br/><span><strong>{!PlatformData.Staked_SB_Token_Account ? null :new PublicKey(PlatformData.Staked_SB_Token_Account).toBase58()}</strong></span></p>

            <p>usdc farming_account: <br/><span><strong>{new PublicKey(PlatformData.farming_account).toBase58()}</strong></span></p>

            <p>Treasury: <br/><span><strong>{!PlatformData.Treasury ? null :new PublicKey(PlatformData.Treasury).toBase58()}</strong></span></p>
            <p>Treasury_SuperB: <br/><span><strong>{!PlatformData.Treasury_SuperB ? null :new PublicKey(PlatformData.Treasury_SuperB).toBase58()}</strong></span></p>

            <p>SuperB_Pool: <br/><span><strong>{!PlatformData.SuperB_Pool ? null :new PublicKey(PlatformData.SuperB_Pool).toBase58()}</strong></span></p>

            <p>Total pool number: <br/><span><strong>{!PlatformData.pool_number ? null :parseInt(PlatformData.pool_number)}</strong></span></p>
            <p>total_superB_rewards: <br/><span><strong>{!PlatformData.total_superB_rewards ? null :numberFormatter.format(new BN(PlatformData.total_superB_rewards, 10, "le").toNumber()/1000000)}</strong></span></p>
            <p>start_time: <br/><span><strong>{!PlatformData.start_time ? null :convertTimeStamp(new BN(PlatformData.start_time, 10, "le").toNumber()*1000)}</strong></span></p>
            <p>start_rate: <br/><span><strong>{!PlatformData.start_rate ? null :parseFloat(PlatformData.start_rate.toString())/100}</strong> SuperB per second</span></p>
            <p>decrease_rate: <br/><span><strong>{!PlatformData.decrease_rate ? null :parseFloat(PlatformData.decrease_rate.toString())/100}</strong>% per 90 days</span></p>
            <p>lp_token_holders_ratio: <br/><span><strong>{!PlatformData.lp_token_holders_ratio ? null :parseFloat(PlatformData.lp_token_holders_ratio.toString())/100}</strong>%</span></p>
            <p>bond_traders_ratio: <br/><span><strong>{!PlatformData.bond_traders_ratio ? null :parseFloat(PlatformData.bond_traders_ratio.toString())/100}</strong>%</span></p>
            <p>risk_factor_x: <br/><span><strong>{!PlatformData.risk_factor_x ? null :parseFloat(PlatformData.risk_factor_x.toString())/100}</strong></span></p>

            <p>superb_staking_reward_ratio: <br/><span><strong>{!PlatformData.superb_staking_reward_ratio ? null :parseFloat(PlatformData.superb_staking_reward_ratio.toString())/100}</strong>%</span></p>

            <p>stake_SB_fee: <br/><span><strong>{!PlatformData.stake_SB_fee ? 0 :parseFloat(PlatformData.stake_SB_fee.toString())/100}</strong>%</span></p>
            <p>unstake_SB_fee: <br/><span><strong>{!PlatformData.unstake_SB_fee ? 0 :parseFloat(PlatformData.unstake_SB_fee.toString())/100}</strong>%</span></p>

            <p>treasury_ratio: <br/><span><strong>{!PlatformData.treasury_ratio ? null :parseFloat(PlatformData.treasury_ratio.toString())/100}</strong>%</span></p>
            <p>last_update_treasury: <br/><span><strong>{!PlatformData.last_update_treasury ? null :convertTimeStamp(new BN(PlatformData.last_update_treasury, 10, "le").toNumber()*1000)}</strong></span></p>
          </Card>
          :
          null
          }
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <Card title="MultiSig Requests">
            <table className="w-full block overflow-x-auto " style={{"borderCollapse":"separate","borderSpacing":" 0 4px","borderRadius":"1.5em"}}>

                <tr className="bg-gray-300 ">
                    <th className="py-2 px-4  ">action</th>
                    <th className="py-2 px-4  ">created_by</th>
                    <th className="py-2 px-4  ">min_sig</th>
                    <th className="py-2 px-4  ">is_approved</th>
                    <th className="py-2 px-4  ">data_type</th>
                    <th className="py-2 px-4 ">old_value</th>
                    <th className="py-2 px-4  ">new_value</th>
                    <th className="py-2 px-4  ">approved_by</th>
                    <th className="py-2 px-4  ">received_at</th>
                </tr>

                {multisigs && multisigs.length>0 && multisigs.map((value:any,key:number)=>{
                  return <>
                    <tr className="bg-gray-200">
                        <td className="py-2 px-4 text-blue-100">
                          {value.is_approved == 1 ? "N/A" :
                          <Button type="primary" htmlType="submit" style={{marginRight:"10px"}}
                          onClick={() => onMultiSigApprove(key,value.data_type,value.new_value.toBase58(),value.index)}>
                           APPROVE
                          </Button>
                        }
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                          {truncateStr(value.created_by.toBase58(),5)}
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                          {value.min_sig}
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                          {value.is_approved == 1 ? "APPROVED" : "PENDING"}
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                          {value.data_type == 1 ? "GOV CHANGE" : value.data_type == 2 ? "OP CHANGE" : "ADMIN CHANGE"}
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                          {truncateStr(value.old_value.toBase58(),5)}
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                          {truncateStr(value.new_value.toBase58(),5)}
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                          {truncateStr(value.approved_by[0].toBase58(),5)}<br/>
                          {truncateStr(value.approved_by[1].toBase58(),5)}<br/>
                          {truncateStr(value.approved_by[2].toBase58(),5)}
                        </td>
                        <td className="py-2 px-4 text-blue-100">
                        {convertTimeStamp(new BN(value.received_at, 10, "le").toNumber() * 1000)}
                        </td>

                    </tr>

                  </>
                })}


            </table>
          </Card>
          {StakingData ?
            <Card title="Staking Details">

            </Card>
            :
            null
            }
        </Col>
      </Row>

    </div>
  );
};
