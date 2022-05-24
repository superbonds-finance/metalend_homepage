import React from "react";
import { Button, Select } from "antd";
import { useWallet } from "@solana/wallet-adapter-react";
import { Link } from "react-router-dom";

export const TopMenu = () => {
  const { connected, disconnect } = useWallet();

  return (
    <>
      <Link to="/trade">
          <Button size="large" type="text">Trade</Button>
      </Link>
      <Link to="/buy-SB">
          <Button size="large" type="text">Swap</Button>
      </Link>
      <Link to="/liquidity">
          <Button size="large" type="text">Add/Remove Liquidity</Button>
      </Link>
      <Link to="/check-Bond-NFT">
          <Button size="large" type="text">Check Bond</Button>
      </Link>
      <Link to="/stake">
          <Button size="large" type="text">Stake</Button>
      </Link>
      <Link to="/tge">
          <Button size="large" type="text">TGE</Button>
      </Link>
    </>
  );
};
