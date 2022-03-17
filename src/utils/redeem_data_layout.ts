
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey} from "./layout";

export const REDEEM_DATA_LAYOUT = BufferLayout.struct([
  publicKey("pool"),
  publicKey("trader"),
  publicKey("usdc_account"),
  uint64('amount'),
  uint64('requested_at')
]);

export interface RedeemDataLayout {
  pool: Uint8Array,
  trader: Uint8Array,
  usdc_account: Uint8Array,
  amount: Uint8Array,
  requested_at: Uint8Array,
};
