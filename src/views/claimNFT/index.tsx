/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
import React, { useEffect,useCallback,useState } from "react";
import {ButtonText,Text} from "./claim.styled";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { notify } from "../../utils/notifications";
import {
  SUPERBONDS_PROGRAM_ID,
  USDC_DECIMALS,
  LP_TOKEN_DECIMALS,
  SUPERB_DECIMALS,
  PLATFORM_DATA_ACCOUNT,
  STAKING_DATA_ACCOUNT,

  } from "../../utils/ids";
import { useWallet } from "@solana/wallet-adapter-react";
import { findAssociatedTokenAddress } from "../../contexts/accounts";
import {TRADE_DATA_LAYOUT} from "../../utils/trade_data_layout";
import {TRADER_LAYOUT} from "../../utils/trader_layout";
import { truncateStr,getTokenBalance } from "../../utils/utils";
import {MintLayout} from "@solana/spl-token";
import {
   Account,
   PublicKey,
   SystemProgram,
   TransactionInstruction,
 } from '@solana/web3.js';
import BN from "bn.js";

export  function ClaimNFTView() {
  const connection = useConnection();
  const wallet = useWallet();

  const [nft,setNFT] = useState("");
  const onChangeNFT = useCallback( (e) => {
    const { value } = e.target;
    setNFT(value);
  },[]);

  const [MyNFT_dataSource,setMyNFT_dataSource] = useState<any>([]);

  useEffect( () => {
    if (!wallet.publicKey) return;

  }, [wallet]);

  const onCheck = async () => {
    setMyNFT_dataSource([]);

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
    if (nft == "") {
      notify({
        message: 'Please enter a Bond NFT address',
        type: "error",
      });
      return;
    }
    const NFT_info = await connection.getAccountInfo(new PublicKey(nft));

    if (!NFT_info) {
      notify({
        message: 'Cannot get NFT information',
        type: "error",
      });
      return;
    }
    ////console.log("NFT",NFT_info.data);
    if (NFT_info.data.length != 82) {
      notify({
        message: 'This is not NFT Mint Account',
        type: "error",
      });
      return;
    }
    //Check if current user has any NFT with this NFT Mint Account
    let NFT_Balance = await getTokenBalance(connection,publicKey,new PublicKey(nft),0);
    if (NFT_Balance != 1 ){
      notify({
        message: 'You dont have any NFT with this Mint Account',
        type: "error",
      });
      return;
    }

    const NFT_data = MintLayout.decode(NFT_info.data);
    //console.log("NFT_data",NFT_data);

    let filters = [
      {"dataSize":132},
      {
        "memcmp": {
          "offset": 0,
          "bytes": nft
        }
      }
    ];
    const resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    });
    //console.log(resp);
    if (resp.length == 0) {
      notify({
        message: 'There is no active trade with this NFT',
        type: "error",
      });
      return;
    }
    else{
      let myNFTs = [];
      for (var i=0;i<resp.length;i++){
        let decodedData = TRADE_DATA_LAYOUT.decode(resp[i].account.data);

        let bond_yield = decodedData.bond_yield/10000;
        var maturity_at = new Date(1000* new BN(decodedData.maturity_date, 10, "le").toNumber());
        var now = new Date();
        const diffDays = Math.round(Math.abs((maturity_at.getTime() - now.getTime()) / (1000)));
        // const bond_value = new BN(decodedData.bond_value, 10, "le").toNumber()/(10**USDC_DECIMALS);
        //Bond_at_Maturity = Bond at Purchase(Investment) * [(1 + yield_at_purchase) ^ (30_days/365_days)]
        let Bond_at_maturity = new BN(decodedData.bond_value_at_maturity, 10, "le").toNumber()/(10**USDC_DECIMALS);
        //Current bond = Bond_at_maturity / [(1 + current_yield) ^ (days_left_to_mature/365_days)]

        let current_bond_value = Bond_at_maturity;
        if (diffDays>=0)
          current_bond_value =  Bond_at_maturity / ((1 + bond_yield)**(diffDays/(365*24*60*60)));

        myNFTs.push({
          trade_owner:decodedData.current_owner.toBase58(),
          trade_account:resp[i].pubkey.toBase58(),
          nft:decodedData.NFT.toBase58(),
          current_value:current_bond_value,
          yield: bond_yield*100
        });


      }
      //console.log(myNFTs);
      setMyNFT_dataSource(myNFTs);
    }
  };

  const onClaim = async (trade_owner:string,nft:string,trade_account:string) => {
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
    let SOL_balance = await connection.getBalance(publicKey)/(10**9);
    if (SOL_balance <= 0.001){
      notify({
        message: 'You have low Sol balance',
        type: "info",
      });
      return;
    }
    if (trade_owner == publicKey.toBase58()){
      notify({
        message: 'Can not claim. You are already the owner of this trade.',
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
              "bytes": (new PublicKey(trade_owner)).toBase58()
            }
          }];
    let resp = await connection.getProgramAccounts(SUPERBONDS_PROGRAM_ID, {
      commitment: connection.commitment,
      filters,
      encoding: 'base64',
    });
    //console.log('resp',resp);
    //return;

    if (resp.length == 0){
      notify({
        message: 'Cannot find Trader Data Account!',
        type: "error",
      });
      return;
    }
    let previous_owner_Data_account = resp[0].pubkey;

    filters = [
          {
            "dataSize":560
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
    let transactions = [];
    let signers = [];
    let new_owner_Data_pk = null;

    if (resp.length == 0){
      let new_owner_Data_account = new Account();
      //console.log('new_owner_Data_account',new_owner_Data_account.publicKey.toBase58());
      const createTraderDataAccountIx = SystemProgram.createAccount({
          programId: SUPERBONDS_PROGRAM_ID,
          space: TRADER_LAYOUT.span,
          lamports: await connection.getMinimumBalanceForRentExemption(TRADER_LAYOUT.span),
          fromPubkey: publicKey,
          newAccountPubkey: new_owner_Data_account.publicKey
      });
      transactions.push(createTraderDataAccountIx);
      signers.push(new_owner_Data_account);
      new_owner_Data_pk = new_owner_Data_account.publicKey;
    }
    else{
      new_owner_Data_pk = resp[0].pubkey;
    }

    let nft_associated_token_account_address = await findAssociatedTokenAddress(publicKey,new PublicKey(nft));

    const buffers = [
      Buffer.from(Uint8Array.of(23))
    ];

    const claimNFTIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: STAKING_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: false },
            { pubkey: nft_associated_token_account_address, isSigner: false, isWritable: false },
            { pubkey: new PublicKey(trade_account), isSigner: false, isWritable: true },
            { pubkey: previous_owner_Data_account, isSigner: false, isWritable: true },
            { pubkey: new_owner_Data_pk, isSigner: false, isWritable: true },
        ],
        data: Buffer.concat(buffers)
    });

    transactions.push(claimNFTIx);


    let txid1 = await sendTransaction(connection,wallet,
        transactions
      ,signers,false);

    if (!txid1){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Claim NFT request sent!',
        type: "info",
      });
    }
  }

  return (
      // <div className="w-screen h-screen bg-black ">
      //   <div className="w-11/12 my-0 mx-auto pt-28 2xl:w-12/12 xl:w-12/12 2xxl:w-12/12" style={{maxWidth:"1540px"}}>

          <div className="flex py-6 justify-between 2xxl:flex-col">
            <div className='w-9/12 lg:w-full md:w-full sm:w-full my-0 mx-auto rounded-lg border-2 selected-box-neon px-3 py-3'>
            <div className="flex flex-col w-full my-0 mx-auto text-center">
              <Text  className='select-none' weight size='18px' color='#7CFA4C'>Claim Transferred NFT</Text>
              <Text size='14px' className='my-3'>If a Bond NFT you own isn't under My Account, you'll have to claim it</Text>
              <div className='w-6/12 md:w-8/12 sm:w-10/12 xs:w-full my-0 mx-auto'>
                <div className='grid grid-cols-3 gap-2'>
                  <div className="col-span-2">
                    <input type="text"
                      onChange={onChangeNFT}
                      required
                      className="w-full py-2 px-2 h-10 float-right rounded-md bg-gray-400
                      focus:outline-none ring-2 ring-green-100 border-transparent placeholder-green-100" placeholder="Enter Bond NFT Address" />
                  </div>
                  <div className="">
                    <button onClick={()=>onCheck()} className="border-2 hover:bg-green-100 hover:text-black rounded-md border-green-100 px-6 py-2 inline-block">
                      <ButtonText transform weight>Check</ButtonText>
                    </button>
                  </div>
                </div>
            </div>
            <div className="flex flex-col w-full my-0 mx-auto mt-5">
              <div className="flex justify-between">
                <div>

                </div>
{/*
                <div className="bg-gray-300 items-center align-middle py-2 px-5 rounded-md">
                  <img src={left} alt="prev" className="inline-block mr-4 cursor-pointer" /> <span  className="inline-block" >1</span> <img src={right} alt="next"  className="ml-4 inline-block cursor-pointer" />
                </div> */}
              </div>

              <div className="overflow-x-auto mt-2 w-full h-full" style={{"borderRadius":"1.5em"}}>
                <table className="w-full" style={{"borderCollapse":"separate","borderSpacing":'0px 0px'}}>

                  <tr className="bg-gray-300 ">
                    <th className="py-2 px-4 my-2">Trade Account</th>
                    <th className="py-2 px-4 my-2">Trade Owner</th>
                    <th className="py-2 px-4 my-2">NFT</th>
                    <th className="py-2 px-4 my-2">Yield</th>
                    <th className="py-2 px-4 my-2">Current Value</th>
                    <th className="py-2 px-4 my-2">Action</th>
                  </tr>

                  {MyNFT_dataSource && MyNFT_dataSource.length>0 && MyNFT_dataSource.map((value:any,key:any)=>{
                    return <>
                      <tr className="bg-gray-200 my-2">
                        <td className="py-2 px-4"> <a className='text-blue-100 hover:text-blue-100' href={"#/redeem/"+value.trade_account}>{truncateStr(value.trade_account,5)}</a></td>
                        <td className="py-2 px-4"><a className='text-blue-100 hover:text-blue-100' target="_blank" href={"https://explorer.solana.com/address/"+value.trade_owner+"?cluster=devnet"}>{truncateStr(value.trade_owner,5)}</a></td>
                        <td className="py-2 px-4"><a className='text-blue-100 hover:text-blue-100' target="_blank" href={"https://explorer.solana.com/address/"+value.nft+"?cluster=devnet"}>{truncateStr(value.nft,5)}</a></td>
                        <td className="py-2 px-4">{parseFloat(value.yield) < 0 ? <span style={{color:"red"}}>{parseFloat(value.yield).toFixed(2)}%</span> : <span style={{color:"green"}}>{parseFloat(value.yield).toFixed(2)}%</span>}</td>
                        <td className="py-2 px-4">{parseFloat(value.current_value).toFixed(3)}</td>
                        <td className="py-2 px-4">
                            <button className="bg-green-100 rounded-md py-1 px-5" onClick={()=>onClaim(value.trade_owner,value.nft,value.trade_account)}><Text color='black' transform='true' weight='true' size='11px'>Claim</Text></button>
                        </td>
                      </tr>
                      </>
                    })

                  }

                  {MyNFT_dataSource && MyNFT_dataSource.length==0 &&
                    <tr className="bg-gray-200" >
                      <td className="text-center font-medium text-green-100 font-bold" colSpan={6}>
                        No Data Found
                      </td>
                    </tr>
                  }

                </table>
              </div>
            </div>
        </div>
      </div>
     </div>
  )
}
