
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey} from "./layout";

export const TGE_ACCOUNT_LAYOUT = BufferLayout.struct([
  publicKey('owner_account'),
  publicKey('superB_account'),
  uint64("superB_amount"),
  uint64("total_received"),
  BufferLayout.u32('initial_lock_time'),
  BufferLayout.u32('initial_unlock_amount'),
  BufferLayout.u32('linear_lock_time'),
  uint64("next_distribution_time"),
  BufferLayout.u8('tge_type'),
]);

export interface TgeAccountLayout {
  owner_account: Uint8Array,
  superB_account: Uint8Array,
  superB_amount: Uint8Array,
  total_received: Uint8Array,
  initial_lock_time: Uint8Array,
  initial_unlock_amount: Uint8Array,
  linear_lock_time: Uint8Array,
  next_distribution_time: Uint8Array,
  tge_type: Uint8Array
};
