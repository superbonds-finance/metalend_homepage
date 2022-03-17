
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey} from "./layout";

export const TRADE_DATA_LAYOUT = BufferLayout.struct([
  publicKey("NFT"),
  publicKey("pool"),

  BufferLayout.u32('bond_yield'),
  uint64("issued_date"),
  uint64("maturity_date"),
  uint64("bond_value"),
  uint64("bond_value_at_maturity"),
  publicKey("current_owner"),
]);

export interface TradeDataLayout {
  NFT: Uint8Array,
  pool: Uint8Array,
  bond_yield: Uint8Array,
  issued_date: Uint8Array,
  maturity_date: Uint8Array,
  bond_value: Uint8Array,
  bond_value_at_maturity: Uint8Array,
  current_owner: Uint8Array
};
