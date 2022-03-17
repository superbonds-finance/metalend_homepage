
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey,publickey_array5} from "./layout";

export const MULTISIG_LAYOUT = BufferLayout.struct([
  publicKey("created_by"),
  BufferLayout.u8("data_type"),
  BufferLayout.u8("min_sig"),
  BufferLayout.u8("index"),
  BufferLayout.u8("is_approved"),
  publicKey('old_value'),
  publicKey('new_value'),
  uint64('received_at'),
  publickey_array5('approved_by')

]);

export interface MultisigLayout {
  created_by: Uint8Array,
  data_type: Uint8Array,
  min_sig: Uint8Array,
  index: Uint8Array,
  is_approved: Uint8Array,
  old_value: Uint8Array,
  new_value: Uint8Array,
  received_at: Uint8Array,
  approved_by: Uint8Array,

};
