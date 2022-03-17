
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey} from "./layout";

export const TGE_PARAMETERS_LAYOUT = BufferLayout.struct([
  publicKey('admin_account'),
  publicKey('superB_account'),
  publicKey('superB_mint_account'),
  publicKey('protocol_reward_account'),
  uint64("tge_start_time")
]);

export interface TgeParametersLayout {
  admin_account: Uint8Array,
  superB_account: Uint8Array,
  superB_mint_account: Uint8Array,
  protocol_reward_account: Uint8Array,
  tge_start_time: Uint8Array
};
