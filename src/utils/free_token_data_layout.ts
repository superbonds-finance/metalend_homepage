
import * as BufferLayout from "buffer-layout";
import {uint64,publicKey} from "./layout";

export const FREETOKEN_DATA_LAYOUT = BufferLayout.struct([
  publicKey("admin_account"),
  publicKey("superB_account"),
  publicKey("usdc_account")

]);

export interface FreeTokenDataLayout {
  admin_account: Uint8Array,
  superB_account: Uint8Array,
  usdc_account: Uint8Array

};
