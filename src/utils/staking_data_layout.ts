
import * as BufferLayout from "buffer-layout";
import {uint64, uint64_array15} from "./layout";

export const STAKING_DATA_LAYOUT = BufferLayout.struct([
  uint64('lastRewardTime_Trades'),
  uint64('totalProductivity_Trades'),
  uint64('accAmountPerShare_Trades'),

  uint64('lastRewardTime_SuperB'),
  uint64('totalProductivity_SuperB'),
  uint64('accAmountPerShare_SuperB'),

  uint64_array15('lastRewardTime_LP_Token'),
  uint64_array15('totalProductivity_LP_Token'),
  uint64_array15('accAmountPerShare_LP_Token'),
  BufferLayout.u8('initialized'),
]);

export interface StakingDataLayout {
  lastRewardTime_Trades: Uint8Array,
  totalProductivity_Trades: Uint8Array,
  accAmountPerShare_Trades: Uint8Array,

  lastRewardTime_SuperB: Uint8Array,
  totalProductivity_SuperB: Uint8Array,
  accAmountPerShare_SuperB: Uint8Array,

  lastRewardTime_LP_Token: Uint8Array,
  totalProductivity_LP_Token: Uint8Array,
  accAmountPerShare_LP_Token: Uint8Array,
  initialized: Uint8Array
};
