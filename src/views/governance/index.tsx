/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Row, Col, Input, Form, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useCallback } from "react";
import { useConnection,sendTransaction } from "../../contexts/connection";
import { notify } from "../../utils/notifications";
import { ConnectButton } from "./../../components/ConnectButton";
import { SUPERBONDS_PROGRAM_ID,
         PLATFORM_DATA_ACCOUNT,
         POOL_30_ADDRESS,
         POOL_90_ADDRESS,
         USDC_DECIMALS,
         SUPERB_DECIMALS,
         SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
       } from "../../utils/ids";
import { Numberu64, delay, } from "../../utils/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import {PLATFORM_DATA_LAYOUT,PlatformDataLayout} from "../../utils/platform_data_layout";
import {
  Account,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

let setting = 0;

export const GovernanceView = () => {
  const connection = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.publicKey) return;

  }, [wallet.publicKey]);

  const onChangeSetting = async (pool:number) => {
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
    if (setting == 0){
      notify({
        message: 'Please select a Setting to change',
        type: "error",
      });
      return;
    }
    let pool_address = pool == 30 ? POOL_30_ADDRESS : POOL_90_ADDRESS;

    const encodedStakingDataState = (await connection.getAccountInfo(PLATFORM_DATA_ACCOUNT, 'singleGossip'))!.data;
    const decodedStakingDataState = PLATFORM_DATA_LAYOUT.decode(encodedStakingDataState) as PlatformDataLayout;

    if (decodedStakingDataState.governance_account.toString() != publicKey.toString()){
      notify({
        message: 'Only Governance Account allowed',
        type: "error",
      });
      return;
    }
    let value_u64 = 0;
    if (setting < 9 || setting >= 28)
      value_u64 = platformSetting;
    else value_u64 = poolSetting;

    const buffers = [
      Buffer.from(Uint8Array.of(7,setting,...new Numberu64(Math.round(value_u64)).toBuffer())),

    ];

    const farmIx = new TransactionInstruction({
        programId: SUPERBONDS_PROGRAM_ID,
        keys: [
            { pubkey: PLATFORM_DATA_ACCOUNT, isSigner: false, isWritable: true },
            { pubkey: pool_address, isSigner: false, isWritable: true },
            { pubkey: publicKey, isSigner: true, isWritable: true }
        ],
        data: Buffer.concat(buffers)
    });

    let txid = await sendTransaction(connection,wallet,
        [farmIx]
      ,[],false);
    if (!txid){
      notify({
        message: 'Something wrong with your request!',
        type: "error",
      });
    }else{
      notify({
        message: 'Setting Change Request Sent',
        type: "success",
      });
      await delay(2000);
    }
  }

  const [platformSetting,setPlatformSetting] = useState(0);
  const [poolSetting,setPoolSetting] = useState(0);

  const onChangePlatformSetting = useCallback( (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setPlatformSetting(value);
    }
  },[]);
  const onChangePoolSetting = useCallback( (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setPoolSetting(value);
    }
  },[]);

  const [settingText,setSettingText] = useState("");

  const onClickSetting = ( item:any) => {
    console.log(item.key);
    setting = parseInt(item.key);
    switch (setting) {
          // pub risk_factor_x: u8,                  // From 0 to 100 (0 to 1)
          case 1: setSettingText("risk_factor_x - 0 to 100 (0 to 1)"); break;
          // pub start_rate: u32,                    //90 SuperB per seconds - 9000
          case 2: setSettingText("start_rate - default: 90 SuperB per seconds - 9000"); break;
          // pub decrease_rate: u32,                 //10% every 90 days - 1000
          case 3: setSettingText("decrease_rate - default: 10% every 90 days - 1000"); break;
          // pub lp_token_holders_ratio: u32,        //60% - 6000
          case 4: setSettingText("lp_token_holders_ratio - default: 60% - 6000"); break;
          // pub bond_traders_ratio: u32,             //10% - 1000
          case 5: setSettingText("bond_traders_ratio - default: 10% - 1000"); break;
          // // pub lp_ratio: u32,                      //10% - 1000
          // case 6: setSettingText("lp_ratio - default: 10% - 1000"); break;
          // pub superb_staking_reward_ratio: u32,   //10% - 1000
          case 7: setSettingText("superb_staking_reward_ratio - default: 10% - 1000"); break;
          // pub treasury_ratio: u32,                //10% - 1000
          case 8: setSettingText("treasury_ratio - default: 0%"); break;
          // case 28: setSettingText("stake_MM_fee - default: 0%"); break;
          // case 29: setSettingText("unstake_MM_fee - default: 0%"); break;
          case 30: setSettingText("stake_SB_fee - default: 0%"); break;
          case 31: setSettingText("unstake_SB_fee - default:  0%"); break;
          case 9:
            setSettingText("transaction_fee_SuperB - 0 to 5000 000 000 default: 500 000 000 (decimal 6)");
           break;
          case 10:
            setSettingText("superB_fee_burn_portion - 0 to 10000 Default: 10000 (100%) Collected SuperB to burn");
           break;
          case 11:
            setSettingText("add_liquidity_fee_USDC - 0 to 100 (0% to 1%) default: 0%");
           break;
          case 12:
            setSettingText("stake_LP_fee - 0 to 200 (0% to 2%) default: 0.5% or 50");
           break;
          case 13:
            setSettingText("unstake_LP_fee - 0 to 200 (0% to 2%) default: 0.5% or 50");
           break;
          case 14:
            setSettingText("remove_liquidity_fee_USDC - 0 to 100 (0% to 1%) default: 0.25% or 25");
           break;
          case 15:
            setSettingText("trade_fee_USDC - 0 to 100 (0% to 1%) default: 0.25% or 25");
           break;
          case 16:
            setSettingText("early_redemption_fee_USDC - 0 to 100 (0% to 2%) default: 0.5%");
           break;
          case 17:
            setSettingText("mature_redemption_fee_USDC - 0 to 100 (0% to 1%) default: 0.25%");
           break;
          case 18:
            setSettingText("external_farming_ratio - 0 to 10000 Default: 70% of traders’ funds will be used for farming");
           break;
          case 19:
            setSettingText("superBonds_rate - 0 to 1000 (0.00x to 10.00x) default is 2x or 200");
           break;
          case 20:
            setSettingText("superBonds_income_ratio - 0 to 10000 (0% to 100%) default: 25% and 55% is to LP Pool 20% to Treasury Pool");
           break;
          case 21:
            setSettingText("treasury_income_ratio - 0 to 10000 (0% to 100%) default: 20% and 55% is to LP Pool 25% to SuperBonds Reward Pool");
           break;
          case 22:
            setSettingText("reserved_multiplier_LP_Pool - 100 to 500 (1.00x to 5.00x) default is 1x or 100");
           break;
          case 23:
            setSettingText("trade_liquidity_availability - 2500 to 5000 (25% to 50%) default is 35% or 3500");
           break;
      }
  };

  const general_menu = (
    <Menu onClick={onClickSetting}>
      <Menu.Item key="1">
        <p>risk_factor_x - 0 to 100 (0 to 1)</p>
      </Menu.Item>
      <Menu.Item key="2">
        <p>start_rate - default: 90 SuperB per seconds - 9000</p>
      </Menu.Item>
      <Menu.Item key="3">
        <p>decrease_rate - default: 10% every 90 days - 1000</p>
      </Menu.Item>
      <Menu.Item key="4">
        <p>lp_token_holders_ratio - default: 60% - 6000</p>
      </Menu.Item>
      <Menu.Item key="5">
        <p>bond_traders_ratio - default: 10% - 1000</p>
      </Menu.Item>

      <Menu.Item key="7">
        <p>superb_staking_reward_ratio - default: 10% - 1000</p>
      </Menu.Item>
      <Menu.Item key="8">
        <p>treasury_ratio - default: 10% - 1000</p>
      </Menu.Item>

      <Menu.Item key="30">
        <p>stake_SB_fee - default: 0%</p>
      </Menu.Item>
      <Menu.Item key="31">
        <p>unstake_SB_fee - default: 0%</p>
      </Menu.Item>
    </Menu>
  );
  const pool_menu = (
    <Menu onClick={onClickSetting}>
      <Menu.Item key="9">
        <p>transaction_fee_SuperB - 0 to 5000 000 000 default: 500 000 000 (decimal 6)</p>
      </Menu.Item>
      <Menu.Item key="10">
        <p>superB_fee_burn_portion - 0 to 10000 Default: 10000 (100%) Collected SuperB to burn</p>
      </Menu.Item>
      <Menu.Item key="11">
        <p>add_liquidity_fee_USDC - 0 to 100 (0% to 1%) default: 0%</p>
      </Menu.Item>
      <Menu.Item key="12">
        <p>stake_LP_fee - 0 to 200 (0% to 2%) default: 0.5% or 50</p>
      </Menu.Item>
      <Menu.Item key="13">
        <p>unstake_LP_fee - 0 to 200 (0% to 2%) default: 0.5% or 50</p>
      </Menu.Item>
      <Menu.Item key="14">
        <p>remove_liquidity_fee_USDC - 0 to 100 (0% to 1%) default: 0.25% or 25</p>
      </Menu.Item>
      <Menu.Item key="15">
        <p>trade_fee_USDC - 0 to 100 (0% to 1%) default: 0.25% or 25</p>
      </Menu.Item>
      <Menu.Item key="16">
        <p>early_redemption_fee_USDC - 0 to 100 (0% to 2%) default: 0.5%</p>
      </Menu.Item>
      <Menu.Item key="17">
        <p>mature_redemption_fee_USDC - 0 to 100 (0% to 1%) default: 0.25%</p>
      </Menu.Item>
      <Menu.Item key="18">
        <p>external_farming_ratio - 0 to 10000 Default: 70% of traders’ funds will be used for farming</p>
      </Menu.Item>
      <Menu.Item key="19">
        <p>superBonds_rate - 0 to 1000 (0.00x to 10.00x) default is 2x or 200</p>
      </Menu.Item>
      <Menu.Item key="20">
        <p>superBonds_income_ratio - 0 to 10000 (0% to 100%) default: 25% and 55% is to LP Pool 20% to Treasury Pool</p>
      </Menu.Item>
      <Menu.Item key="21">
        <p>treasury_income_ratio - 0 to 10000 (0% to 100%) default: 20% and 55% is to LP Pool 25% to SuperBonds Reward Pool</p>
      </Menu.Item>
      <Menu.Item key="22">
        <p>reserved_multiplier_LP_Pool - 100 to 500 (1.00x to 5.00x) default is 1x or 100</p>
      </Menu.Item>
      <Menu.Item key="23">
        <p>trade_liquidity_availability - 2500 to 5000 (25% to 50%) default is 35% or 3500</p>
      </Menu.Item>

    </Menu>
  );

  return (
    <div>
      <br/>
      <h2>Governance Management</h2>
      <Row>
        <Col flex="1 1 45%" style={{margin:"10px"}}>
          <h3>General Platform Settings</h3>
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              label="Value"
              name="generalvalue"
              rules={[{ required: true, message: 'Please enter a value!' }]}
            >
              <Input
              onChange={onChangePlatformSetting}
              type="number" />

            </Form.Item>
            <Dropdown overlay={general_menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Select a setting <DownOutlined />
              </a>
            </Dropdown>
            <br/><br/>
            <p>{setting < 9 || setting >= 28? settingText : null}</p>
            <br/>
            <Form.Item>
            <ConnectButton type="primary" onClick={()=>onChangeSetting(0)} style={{marginRight:"10px"}}>
              Change
            </ConnectButton>
            </Form.Item>
          </Form>

        </Col>

        <Col flex="auto" style={{margin:"10px"}}>
          <h3>Pool Settings</h3>
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              label="Value"
              name="poolvalue"
              rules={[{ required: true, message: 'Please enter a value!' }]}
            >
              <Input
              onChange={onChangePoolSetting}
              type="number" />
            </Form.Item>
            <Dropdown overlay={pool_menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Select a setting <DownOutlined />
              </a>
            </Dropdown>
            <br/><br/>

            <p>{setting >= 9 && setting < 28 ? settingText : null}</p>

            <br/>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onChangeSetting(30)} >
                Change 30-day Pool Setting
              </Button>
              <Button type="primary" htmlType="submit" style={{marginRight:"10px"}} onClick={() => onChangeSetting(90)} >
                Change 90-day Pool Setting
              </Button>
            </Form.Item>
          </Form>

        </Col>

      </Row>
      <br/>

    </div>
  );
};
