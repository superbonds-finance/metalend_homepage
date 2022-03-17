
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey,uint64_array15} from "./layout";

export const FARMING_REWARD_LAYOUT = BufferLayout.struct([
  publicKey("token_account"),

  uint64('total_reward'),
  uint64('total_claimed'),
  uint64_array15('total_lp_token_staked'),
  uint64('received_at')
]);

export interface FarmingRewardLayout {
  token_account: Uint8Array,
  total_reward: Uint8Array,
  total_claimed: Uint8Array,
  total_lp_token_staked: Uint8Array,
  received_at: Uint8Array,
};
