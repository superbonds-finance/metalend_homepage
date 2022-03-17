
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey,uint64_array15} from "./layout";

export const FARMING_REWARD_REQUEST_LAYOUT = BufferLayout.struct([
  publicKey("user_account"),
  uint64_array15('user_lp_token_staked'),
  uint64('request_at')
]);

export interface FarmingRewardRequestLayout {
  user_account: Uint8Array,
  user_lp_token_staked: Uint8Array,
  request_at: Uint8Array,
};
