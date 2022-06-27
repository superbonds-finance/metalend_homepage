import React from "react";
import "./../../App.less";
// import { Layout } from "antd";
import { /* Link, */ useLocation } from "react-router-dom";
import { WalletModalProvider } from "@solana/wallet-adapter-ant-design";

// import { LABELS } from "../../constants";
// import { AppBar } from "../AppBar";
import Navbar from "../Navbar"
// import SunNavbar from "../Navbar/subheader"
import NavbarNew from "../LandingPage/Navbar";
// const { Header, Content } = Layout;

export const AppLayout = React.memo(({ children }) => {

  const location = useLocation();

  const showWinUp = location.pathname === '/old';
  const customLandingPage = location.pathname === "/" || location.pathname === "/fd"|| location.pathname === "/sb";
 
  return (
    <WalletModalProvider>
      <div className="App wormhole-bg">
        {customLandingPage ?
          <NavbarNew showWinUp={showWinUp} />
          : <Navbar showWinUp={showWinUp} />}
        {/* <SunNavbar showWinUp={showWinUp} /> */}
        {/* <Layout title={LABELS.APP_TITLE}>
          <Header className="App-Bar">
            <Link to="/">
              <div className="app-title">
                <h2>{LABELS.APP_TITLE}</h2>
              </div>
            </Link>
            <AppBar />
          </Header>
     
          <Content>{children}</Content>
        </Layout> */}

        {children}

      </div>

    </WalletModalProvider>
  );
});
