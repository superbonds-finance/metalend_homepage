import { useLocalStorageState } from "./../utils/utils";
import {
  Account,
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { notify } from "./../utils/notifications";
import { ExplorerLink } from "../components/ExplorerLink";
import { setProgramIds } from "../utils/ids";
import { cache, getMultipleAccounts, MintParser } from "./accounts";
import { TokenListProvider, ENV as ChainID, TokenInfo } from "@solana/spl-token-registry";
import { delay} from "../utils/utils";

export type ENV =
  | "mainnet-beta"
  | "testnet"
  | "devnet"
  | "localnet";

export const ENDPOINTS = [
  {
    name: "mainnet-beta" as ENV,
    endpoint: "https://rpc.ankr.com/solana/d37b6b8b8656e4b66b92cb4ed5b004d0f2eda1dae120e3a6cc90ff06121398ae",
    //endpoint: "https://ancient-green-water.solana-mainnet.quiknode.pro/69aba09ec474a46ffe774c194455fd54081c9628/",
    chainID: ChainID.MainnetBeta,
  },
  // {
  //   name: "mainnet-beta-serum" as ENV,
  //   endpoint: "https://solana-api.projectserum.com",
  //   //endpoint: "https://ancient-green-water.solana-mainnet.quiknode.pro/69aba09ec474a46ffe774c194455fd54081c9628/",
  //   chainID: ChainID.MainnetBeta,
  // },
  //
  // {
  //   name: "mainnet-beta-solana" as ENV,
  //   endpoint: "https://api.mainnet-beta.solana.com/",
  //   //endpoint: "https://ancient-green-water.solana-mainnet.quiknode.pro/69aba09ec474a46ffe774c194455fd54081c9628/",
  //   chainID: ChainID.MainnetBeta,
  // },
  // {
  //   name: "devnet" as ENV,
  //   endpoint: clusterApiUrl("devnet"),
  //   chainID: ChainID.Devnet,
  // }
];

const DEFAULT = ENDPOINTS[0].endpoint;
const DEFAULT_SLIPPAGE = 0.25;

interface ConnectionConfig {
  connection: Connection;
  sendConnection: Connection;
  endpoint: string;
  slippage: number;
  setSlippage: (val: number) => void;
  env: ENV;
  setEndpoint: (val: string) => void;
  tokens: TokenInfo[];
  tokenMap: Map<string, TokenInfo>;
}

const ConnectionContext = React.createContext<ConnectionConfig>({
  endpoint: DEFAULT,
  setEndpoint: () => {},
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: (val: number) => {},
  connection: new Connection(DEFAULT, "confirmed"),
  sendConnection: new Connection(DEFAULT, "confirmed"),
  env: ENDPOINTS[0].name,
  tokens: [],
  tokenMap: new Map<string, TokenInfo>(),
});

export function ConnectionProvider({ children = undefined as any }) {
  const [endpoint, setEndpoint] = useLocalStorageState(
    "connectionEndpts",
    ENDPOINTS[0].endpoint
  );

  const [slippage, setSlippage] = useLocalStorageState(
    "slippage",
    DEFAULT_SLIPPAGE.toString()
  );

  // const connection = useMemo(() => new Connection(endpoint, "recent"), [
  //   endpoint,
  // ]);
  // const sendConnection = useMemo(() => new Connection(endpoint, "recent"), [
  //   endpoint,
  // ]);
  const connection = new Connection(endpoint, "confirmed");
  const sendConnection = new Connection(endpoint, "confirmed");

  const chain =
    ENDPOINTS.find((end) => end.endpoint === endpoint) || ENDPOINTS[0];
  const env = chain.name;

  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  setProgramIds(env);

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  // useEffect(() => {
  //   const id = connection.onAccountChange(new Account().publicKey, () => {});
  //   return () => {
  //     connection.removeAccountChangeListener(id);
  //   };
  // }, [connection]);
  //
  // useEffect(() => {
  //   const id = connection.onSlotChange(() => null);
  //   return () => {
  //     connection.removeSlotChangeListener(id);
  //   };
  // }, [connection]);
  //
  // useEffect(() => {
  //   const id = sendConnection.onAccountChange(
  //     new Account().publicKey,
  //     () => {}
  //   );
  //   return () => {
  //     sendConnection.removeAccountChangeListener(id);
  //   };
  // }, [sendConnection]);
  //
  // useEffect(() => {
  //   const id = sendConnection.onSlotChange(() => null);
  //   return () => {
  //     sendConnection.removeSlotChangeListener(id);
  //   };
  // }, [sendConnection]);

  return (
    <ConnectionContext.Provider
      value={{
        endpoint,
        setEndpoint,
        slippage: parseFloat(slippage),
        setSlippage: (val) => setSlippage(val.toString()),
        connection,
        sendConnection,
        tokens,
        tokenMap,
        env,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  return useContext(ConnectionContext).connection as Connection;
}

export function useENV() {
  return useContext(ConnectionContext).env as ENV;
}

// export function useSendConnection() {
//   return useContext(ConnectionContext)?.sendConnection;
// }

export function useConnectionConfig() {
  const context = useContext(ConnectionContext);
  return {
    endpoint: context.endpoint,
    setEndpoint: context.setEndpoint,
    env: context.env,
    tokens: context.tokens,
    tokenMap: context.tokenMap,
  };
}

export function useSlippageConfig() {
  const { slippage, setSlippage } = useContext(ConnectionContext);
  return { slippage, setSlippage };
}

const getErrorForTransaction = async (connection: Connection, txid: string) => {
  //console.log('wait for all confirmation before geting transaction',txid);
  // wait for all confirmation before geting transaction
  await connection.confirmTransaction(txid, "max");
  //console.log('parsing confirmed transaction',txid);
  const tx = await connection.getParsedConfirmedTransaction(txid);

  const errors: string[] = [];
  if (tx?.meta && tx.meta.logMessages) {
    tx.meta.logMessages.forEach((log) => {
      const regex = /Error: (.*)/gm;
      let m;
      while ((m = regex.exec(log)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        if (m.length > 1) {
          errors.push(m[1]);
        }
      }
    });
  }

  return errors;
};
export const sendTransactionJupiter = async (
  connection: Connection,
  wallet: any,
  transactions: any[],
  signers: Account[],
) => {
  if (!wallet?.publicKey) {
    throw new Error("Wallet is not connected");
  }
  for (let serializedTransaction of transactions.filter(Boolean)) {
    console.log(serializedTransaction);
    // get transaction object from serialized transaction
    let transaction = Transaction.from(Buffer.from(serializedTransaction, 'base64'))
    console.log(transaction);
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash("max")
    ).blockhash;
    transaction.setSigners(
      // fee payied by the wallet owner
      wallet.publicKey,
      ...signers.map((s) => s.publicKey)
    );

    transaction = await wallet.signTransaction(transaction);

    const rawTransaction = transaction.serialize();
    let options = {
      skipPreflight: true,
      commitment: "confirmed",
    };

    const txid = await connection.sendRawTransaction(rawTransaction, options);
    try{
      let count = 0;
      while (count<30){
        let transaction_info = await connection.getConfirmedTransaction(txid+"","confirmed");
        //console.log('transaction_info',transaction_info);
        if (transaction_info){
          if (transaction_info.meta)
            if (transaction_info.meta.err == null){
              return txid;
            }
          }
        await delay(2000);
        count +=2;
        if (count % 10 == 0){
          notify({
            message: 'Waiting for confirmation...',
            type: "info",
          });
        }
      }
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
      return;
    }
    catch (e){
      console.log(e);
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
      return;
    }
  }
  notify({
      message: 'Swap request sent',
      type: "success",
    });
};

export const sendTransaction = async (
  connection: Connection,
  wallet: any,
  instructions: TransactionInstruction[],
  signers: Account[],
  awaitConfirmation = true
) => {
  if (!wallet?.publicKey) {
    throw new Error("Wallet is not connected");
  }

  let transaction = new Transaction();
  instructions.forEach((instruction) => transaction.add(instruction));
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash("max")
  ).blockhash;
  transaction.setSigners(
    // fee payied by the wallet owner
    wallet.publicKey,
    ...signers.map((s) => s.publicKey)
  );
  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }
  transaction = await wallet.signTransaction(transaction);
  const rawTransaction = transaction.serialize();
  let options = {
    skipPreflight: true,
    commitment: "confirmed",
  };

  const txid = await connection.sendRawTransaction(rawTransaction, options);

  if (awaitConfirmation) {
    notify({
      message: 'Waiting for confirmation...',
      type: "info",
    });

    //console.log('confirm Transaction...',txid);
    try{
      let count = 0;
      while (count<30){
        let transaction_info = await connection.getConfirmedTransaction(txid+"","confirmed");
        //console.log('transaction_info',transaction_info);
        if (transaction_info){
          if (transaction_info.meta)
            if (transaction_info.meta.err == null){
              return txid;
            }
          }
        await delay(2000);
        count +=2;
        if (count % 10 == 0){
          notify({
            message: 'Waiting for confirmation...',
            type: "info",
          });
        }
      }
      // let transaction_info = await connection.getConfirmedTransaction(txid+"","confirmed");
      // console.log('transaction_info',transaction_info);
      // await delay(7000);
      return null;
    }
    catch (e){
      console.log(e);
      // let transaction_info = await connection.getConfirmedTransaction(txid+"","confirmed");
      // console.log('transaction_info',transaction_info);
      return null;
    }


  }


  return txid;
};
