import { HashRouter, Route, Switch } from "react-router-dom";
import React, { useMemo } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { AppLayout } from "./components/Layout";

import { Metalend } from "./views";

import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";

export function Routes() {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: {
          // TODO: Get your own tor.us wallet client Id
          clientId:
            "BN1TTprtb6HHqmpLJoeahwyMAx0TQI3VH-lEdwOYyM2415yVuBmKZWumgk4uDsTGMgNOb5_Qt-11DHdi7_dNEGk",
        },
      }),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
    ],
    []
  );

  return (
    <HashRouter basename={"/"}>
      <ConnectionProvider>
        <WalletProvider wallets={wallets} autoConnect>
          {/* <AccountsProvider> */}

          <AppLayout>
            <Switch>
              <Route exact path="/" component={() => <Metalend />} />
             
            </Switch>
          </AppLayout>

          {/* </AccountsProvider> */}
        </WalletProvider>
      </ConnectionProvider>
    </HashRouter>
  );
}
