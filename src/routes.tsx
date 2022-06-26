import { HashRouter, Route, Switch } from "react-router-dom";
import React, { useMemo } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { AppLayout } from "./components/Layout";

import {  HomeView,
          MyAccountView,
          PoolManagementView,
          StakingManagementView,
          LiquidityView,
          TradeView,
          RedeemView,
          StakeView,
          GovernanceView,
          FarmingRewardsView,
          PlatformStatsView,
          BuySBView,
          FDPage,
          SBFuel
       } from "./views";

import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { LandingPage } from "./views/landing-page";

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
                  <Route exact path="/" component={() => <LandingPage />} />
                  <Route exact path="/myaccount" children={<MyAccountView />} />
                  {/*<Route exact path="/pool-management" children={<PoolManagementView />} />
                  <Route exact path="/platform-settings" children={<StakingManagementView />} />*/}
                  <Route exact path="/liquidity" children={<LiquidityView />} />
                  <Route exact path="/trade" children={<TradeView />} />
                  {/* <Route exact path="/trade-ui" children={<TradeViewUI />} /> */}
                  <Route exact path="/stake" children={<StakeView />} />
                  <Route exact path="/redeem/:trade_account" children={<RedeemView />} />
                  <Route exact path="/governance" children={<GovernanceView />} />
                  {/*<Route exact path="/farming_rewards" children={<FarmingRewardsView />} />*/}
                  <Route exact path="/platform" children={<PlatformStatsView />} />
                  <Route exact path="/buy-SB" children={<BuySBView />} />
                  <Route exact path="/landing-page" children={<LandingPage />} />
                  <Route exact path="/fd" children={<FDPage />} />
                  <Route exact path="/sb" children={<SBFuel />} />
                </Switch>
              </AppLayout>

            {/* </AccountsProvider> */}
        </WalletProvider>
      </ConnectionProvider>
    </HashRouter>
  )
}
