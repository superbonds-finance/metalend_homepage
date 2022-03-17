
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey,uint64_array15,uint64_array30} from "./layout";

export const TRADER_LAYOUT = BufferLayout.struct([
  publicKey('owner'),
  uint64("total_SuperB_staked"),
  uint64_array15('total_LP_Token_staked_vector'),
  uint64("total_active_trades"),
  uint64("total_sol_sb_lp_staked"),

  uint64_array15("rewardDebt_LP"),
  uint64("rewardDebt_SuperB"),
  uint64("rewardDebt_Trades"),
  uint64("rewardDebt_Sol_SB_LP"),
  uint64_array30("last_update_external_farming")
]);

export interface TraderLayout {
  owner: Uint8Array,
  total_SuperB_staked: Uint8Array,
  total_LP_Token_staked_vector: Uint8Array,
  total_active_trades: Uint8Array,
  total_sol_sb_lp_staked: Uint8Array,
  rewardDebt_LP: Uint8Array,
  rewardDebt_SuperB: Uint8Array,
  rewardDebt_Trades: Uint8Array,
  rewardDebt_Sol_SB_LP: Uint8Array,
  last_update_external_farming: Uint8Array
};
