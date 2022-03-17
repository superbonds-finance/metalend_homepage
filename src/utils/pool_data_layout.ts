
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey} from "./layout";

export const POOL_DATA_LAYOUT = BufferLayout.struct([
  publicKey("Staking_Pool_Account"),
  publicKey("LP_Mint_Account"),
  publicKey("LP_Pool"),
  publicKey("Traders_Pool"),
  publicKey("SuperBonds_Rewards_Pool"),
  publicKey("Staked_LP_Token_Account"),

  BufferLayout.u8('pool_number'),
  uint64('transaction_fee_SuperB'),
  BufferLayout.u32('superB_fee_burn_portion'),
  BufferLayout.u32('add_liquidity_fee_USDC'),
  BufferLayout.u32('remove_liquidity_fee_USDC'),
  BufferLayout.u32('stake_LP_fee'),
  BufferLayout.u32('unstake_LP_fee'),
  BufferLayout.u32('trade_fee_USDC'),
  BufferLayout.u32('early_redemption_fee_USDC'),
  BufferLayout.u32('mature_redemption_fee_USDC'),
  BufferLayout.u32('external_farming_ratio'),
  BufferLayout.u32('superBonds_rate'),
  BufferLayout.u32('superBonds_income_ratio'),
  BufferLayout.u32('treasury_income_ratio'),
  BufferLayout.u32('reserved_multiplier_LP_Pool'),
  BufferLayout.u32('trade_liquidity_availability'),

  BufferLayout.u32('lp_price'),
  uint64('totalLongAmount'),
  uint64('adjustedLiquidity'),
  uint64('longInterest_At_Maturity'),

  BufferLayout.u8('is_superbonds_time'),

  uint64('farming_amount')

]);

export interface PoolDataLayout {
  Staking_Pool_Account: Uint8Array,
  LP_Mint_Account: Uint8Array,
  LP_Pool: Uint8Array,
  Traders_Pool: Uint8Array,
  SuperBonds_Rewards_Pool: Uint8Array,
  Staked_LP_Token_Account: Uint8Array,

  pool_number: number,
  transaction_fee_SuperB: Uint8Array,
  superB_fee_burn_portion: Uint8Array,
  add_liquidity_fee_USDC: Uint8Array,
  remove_liquidity_fee_USDC: Uint8Array,
  stake_LP_fee: Uint8Array,
  unstake_LP_fee: Uint8Array,
  trade_fee_USDC: Uint8Array,
  early_redemption_fee_USDC: Uint8Array,
  mature_redemption_fee_USDC: Uint8Array,
  external_farming_ratio: Uint8Array,
  superBonds_rate: Uint8Array,
  superBonds_income_ratio: Uint8Array,
  treasury_income_ratio: Uint8Array,
  reserved_multiplier_LP_Pool: Uint8Array,
  trade_liquidity_availability: Uint8Array,
  lp_price: Uint8Array,
  totalLongAmount: Uint8Array,
  adjustedLiquidity: Uint8Array,
  longInterest_At_Maturity: Uint8Array,

  is_superbonds_time: Uint8Array,

  farming_amount: Uint8Array

};
