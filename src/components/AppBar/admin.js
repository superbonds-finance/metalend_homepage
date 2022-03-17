import React from "react";
import { Button, Select } from "antd";
import { useWallet } from "@solana/wallet-adapter-react";
import { Link } from "react-router-dom";

export const AdminNav = () => {
  const { connected, disconnect } = useWallet();

  return (
    <>
      <Link to="/governance">
          <Button size="large" type="text">Governance</Button>
      </Link>
      <Link to="/pool-management">
          <Button size="large" type="text">Pool/Yield Management</Button>
      </Link>
      <Link to="/platform-settings">
          <Button size="large" type="text">Platform Settings</Button>
      </Link>
      <Link to="/farming_rewards">
          <Button size="large" type="text">Farming Rewards</Button>
      </Link>
    </>
  );
};
