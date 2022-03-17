import React from "react";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Settings } from "../Settings";
import { LABELS } from "../../constants";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-ant-design";
import { useWallet } from "@solana/wallet-adapter-react";
import { Link } from "react-router-dom";
import {TopMenu} from "./menu";
import {AdminNav} from "./admin";

export const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { connected } = useWallet();
  const TopBar = (
    <div className="App-Bar-right">
      <Link to="/">
          <Button style={{ margin: 5 }}>Home</Button>
      </Link>
      {connected?
        <Link to="/myaccount">
            <Button style={{ margin: 5 }}>My Account</Button>
        </Link>
        :
        null
      }
      <Popover
        placement="topRight"
        content={<TopMenu />}
        trigger="click"

      >
        <Button style={{ margin: 5 }}>Menu</Button>
      </Popover>
      <Popover
        placement="topRight"
        content={<AdminNav />}
        trigger="click"

      >
        <Button style={{ margin: 5 }}>Admin</Button>
      </Popover>
      <WalletMultiButton type="primary" />
      <div style={{ margin: 5 }} />
      {connected ? <WalletDisconnectButton type="ghost" /> : null}
      <Popover
        placement="topRight"
        title={LABELS.SETTINGS_TOOLTIP}
        content={<Settings />}
        trigger="click"
      >
        <Button
          shape="circle"
          size="large"
          type="text"
          icon={<SettingOutlined />}
        />
      </Popover>
      {props.right}
    </div>
  );

  return TopBar;
};
