
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey,uint32_array15, uint8_array15, publickey_array30, publickey_array5,publickey_array11} from "./layout";

export const PLATFORM_DATA_LAYOUT = BufferLayout.struct([
  publicKey("staking_account"),
  publickey_array11("admin_accounts"),
  publicKey("governance_account"),
  publicKey("operator_account"),
  publicKey("SuperB_Mint_Account"),
  publicKey("USDC_Mint_Account"),
  // publicKey("SOL_SB_LP_Mint_Account"),
  publicKey("SuperB_Account"),
  publicKey("Treasury"),
  publicKey("Treasury_SuperB"),
  publicKey("SuperB_Pool"),
  publicKey("Staked_SB_Token_Account"),
  // publicKey("Staked_SOL_SB_LP_Token_Account"),
  publicKey("farming_account"),

  publickey_array30("reserved_token_accounts"),

  BufferLayout.u8("pool_number"),
  uint8_array15('pool_status_vector'),
  uint32_array15('pool_length_vector'),
  uint32_array15('pool_yield_vector'),
  uint32_array15('pool_risk_factor_vector'),
  uint64('total_superB_rewards'),
  BufferLayout.u8("risk_factor_x"),
  uint64('start_time'),
  BufferLayout.u32('start_rate'),
  BufferLayout.u32('decrease_rate'),
  BufferLayout.u32('lp_token_holders_ratio'),
  BufferLayout.u32('bond_traders_ratio'),
  BufferLayout.u32('superb_staking_reward_ratio'),
  BufferLayout.u32('treasury_ratio'),
  BufferLayout.u32('stake_SB_fee'),
  BufferLayout.u32('unstake_SB_fee'),
  uint64('last_update_treasury'),
  BufferLayout.u8('active_farming_rewards_count'),

]);

export interface PlatformDataLayout {
  staking_account: Uint8Array,
  admin_accounts: Uint8Array,
  governance_account: Uint8Array,
  operator_account: Uint8Array,
  SuperB_Mint_Account: Uint8Array,
  USDC_Mint_Account: Uint8Array,
  // SOL_SB_LP_Mint_Account: Uint8Array,

  SuperB_Account: Uint8Array,
  Treasury: Uint8Array,
  Treasury_SuperB: Uint8Array,
  SuperB_Pool: Uint8Array,
  Staked_SB_Token_Account: Uint8Array,
  // Staked_SOL_SB_LP_Token_Account: Uint8Array,
  farming_account: Uint8Array,

  reserved_token_accounts: Uint8Array,

  pool_number: number,
  pool_status_vector: Uint8Array,
  pool_length_vector: Uint8Array,
  pool_yield_vector: Uint8Array,
  pool_risk_factor_vector: Uint8Array,
  total_superB_rewards: Uint8Array,
  risk_factor_x: number,
  start_time: Uint8Array,
  start_rate: Uint8Array,
  decrease_rate: Uint8Array,
  lp_token_holders_ratio: Uint8Array,
  bond_traders_ratio: Uint8Array,
  superb_staking_reward_ratio: Uint8Array,
  treasury_ratio: Uint8Array,

  // stake_MM_fee: Uint8Array,
  // unstake_MM_fee: Uint8Array,
  stake_SB_fee: Uint8Array,
  unstake_SB_fee: Uint8Array,

  last_update_treasury: Uint8Array,
  active_farming_rewards_count: Uint8Array,

};
