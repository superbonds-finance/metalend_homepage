import { useCallback, useState } from "react";
import { MintInfo,Token,AccountLayout } from "@solana/spl-token";

import { TokenAccount } from "./../models";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { WAD, ZERO } from "../constants";
import { TokenInfo } from "@solana/spl-token-registry";
import assert from 'assert';

export function delay(timeout:number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
export const getTokenSupply = async (connection:any,mintAccount:PublicKey) =>{
  let mint = (await connection.getTokenSupply(mintAccount));
  if (!mint) return 0;
  let amount = mint.value.amount;
  let decimals = mint.value.decimals;

  return parseFloat(amount)/(10**parseInt(decimals));
}

export const getTokenBalance = async (connection:any,publicKey:PublicKey,mintAccount:PublicKey,decimals:number) =>{
  //console.log('publicKey',publicKey.toBase58(),'mintAccount',mintAccount.toBase58());
  try {
    let accounts = (await connection.getTokenAccountsByOwner(publicKey,{ mint: mintAccount })).value;
    //console.log('accounts',accounts);
    //console.log(AccountLayout.decode(accounts[0].account.data));
    let length = accounts.length;
    let balance = 0;
    for (var i=0;i<length;i++){
      let token_account_info = AccountLayout.decode(accounts[i].account.data);
      balance += new BN(token_account_info.amount, 10, "le").toNumber()/10**decimals;
    }
    return balance;
  }
  catch (e){
    return 0;
  }

}

export const convertTimeStamp = (time: number) => {
    if (time <= 0) return "";
    var d = new Date(time);
    return twoDigit(d.getDate()) + '/' + twoDigit(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + twoDigit(d.getHours()) + ':' + twoDigit(d.getMinutes()) + ':' + twoDigit(d.getSeconds());
};

export const secondsToTime = (secs:number) =>{
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": twoDigit(hours),
      "m": twoDigit(minutes),
      "s": twoDigit(seconds)
    };
    return obj;
  }

export const convertTimeStampNoTime = (time: number)=> {
    if (time <= 0) return "";
    var d = new Date(time);
    return twoDigit(d.getDate()) + '/' + twoDigit(d.getMonth() + 1) + '/' + d.getFullYear() ;
};
export const twoDigit = (myNumber: number)=> {
    return ("0" + myNumber).slice(-2);
};
export const TwoDigitTime = (time: number)=> {
    if (time < 10)
        return "0" + time;
    else return time + "";
};
export const truncateStr = (str: string, n: number)=> {
    if (!str) return '';
    return (str.length > n) ? str.substr(0, n - 1) + '...' + str.substr(str.length - n, str.length - 1) : str;
};
export const numberWithCommas = (x: number)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export type KnownTokenMap = Map<string, TokenInfo>;

export class Numberu32 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 4) {
      return b;
    }
    assert(b.length < 4, 'Numberu32 too large');

    const zeroPad = Buffer.alloc(4);
    b.copy(zeroPad);
    return zeroPad;
  }

}

export class Numberu64 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }
    assert(b.length < 8, 'Numberu64 too large');

    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }

}

export const formatPriceNumber = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
});

export function useLocalStorageState(key: string, defaultState?: string) {
  const [state, setState] = useState(() => {
    // NOTE: Not sure if this is ok
    const storedState = localStorage.getItem(key);
    if (storedState) {
      return JSON.parse(storedState);
    }
    return defaultState;
  });

  const setLocalStorageState = useCallback(
    (newState) => {
      const changed = state !== newState;
      if (!changed) {
        return;
      }
      setState(newState);
      if (newState === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newState));
      }
    },
    [state, key]
  );

  return [state, setLocalStorageState];
}

// shorten the checksummed version of the input address to have 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function getTokenName(
  map: KnownTokenMap,
  mint?: string | PublicKey,
  shorten = true
): string {
  const mintAddress = typeof mint === "string" ? mint : mint?.toBase58();

  if (!mintAddress) {
    return "N/A";
  }

  const knownSymbol = map.get(mintAddress)?.symbol;
  if (knownSymbol) {
    return knownSymbol;
  }

  return shorten ? `${mintAddress.substring(0, 5)}...` : mintAddress;
}

export function getTokenByName(tokenMap: KnownTokenMap, name: string) {
  let token: TokenInfo | null = null;
  for (const val of tokenMap.values()) {
    if (val.symbol === name) {
      token = val;
      break;
    }
  }
  return token;
}

export function getTokenIcon(
  map: KnownTokenMap,
  mintAddress?: string | PublicKey
): string | undefined {
  const address =
    typeof mintAddress === "string" ? mintAddress : mintAddress?.toBase58();
  if (!address) {
    return;
  }

  return map.get(address)?.logoURI;
}

export function isKnownMint(map: KnownTokenMap, mintAddress: string) {
  return !!map.get(mintAddress);
}

export const STABLE_COINS = new Set(["USDC", "wUSDC", "USDC"]);

export function chunks<T>(array: T[], size: number): T[][] {
  return Array.apply<number, T[], T[][]>(
    0,
    new Array(Math.ceil(array.length / size))
  ).map((_, index) => array.slice(index * size, (index + 1) * size));
}

export function toLamports(
  account?: TokenAccount | number,
  mint?: MintInfo
): number {
  if (!account) {
    return 0;
  }

  const amount =
    typeof account === "number" ? account : account.info.amount?.toNumber();

  const precision = Math.pow(10, mint?.decimals || 0);
  return Math.floor(amount * precision);
}

export function wadToLamports(amount?: BN): BN {
  return amount?.div(WAD) || ZERO;
}

export function fromLamports(
  account?: TokenAccount | number | BN,
  mint?: MintInfo,
  rate: number = 1.0
): number {
  if (!account) {
    return 0;
  }

  const amount = Math.floor(
    typeof account === "number"
      ? account
      : BN.isBN(account)
      ? account.toNumber()
      : account.info.amount.toNumber()
  );

  const precision = Math.pow(10, mint?.decimals || 0);
  return (amount / precision) * rate;
}

var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

const abbreviateNumber = (number: number, precision: number) => {
  let tier = (Math.log10(number) / 3) | 0;
  let scaled = number;
  let suffix = SI_SYMBOL[tier];
  if (tier !== 0) {
    let scale = Math.pow(10, tier * 3);
    scaled = number / scale;
  }

  return scaled.toFixed(precision) + suffix;
};

export const formatAmount = (
  val: number,
  precision: number = 6,
  abbr: boolean = true
) => (abbr ? abbreviateNumber(val, precision) : val.toFixed(precision));

export function formatTokenAmount(
  account?: TokenAccount,
  mint?: MintInfo,
  rate: number = 1.0,
  prefix = "",
  suffix = "",
  precision = 6,
  abbr = false
): string {
  if (!account) {
    return "";
  }

  return `${[prefix]}${formatAmount(
    fromLamports(account, mint, rate),
    precision,
    abbr
  )}${suffix}`;
}

export const formatUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
});

export const isSmallNumber = (val: number) => {
  return val < 0.001 && val > 0;
};

export const formatNumber = {
  format: (val?: number, useSmall?: boolean) => {
    if (!val) {
      return "--";
    }
    if (useSmall && isSmallNumber(val)) {
      return 0.001;
    }

    return numberFormatter.format(val);
  },
};

export const feeFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 9,
});

export const formatPct = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function convert(
  account?: TokenAccount | number,
  mint?: MintInfo,
  rate: number = 1.0
): number {
  if (!account) {
    return 0;
  }

  const amount =
    typeof account === "number" ? account : account.info.amount?.toNumber();

  const precision = Math.pow(10, mint?.decimals || 0);
  let result = (amount / precision) * rate;

  return result;
}

// export function formatNumberWithoutRounding(number:number,val:number) {
//   console.log("ss",number)
//   let str = number.toString();
//   if(str.indexOf('.')){
//     str = str.slice(0, (str.indexOf(".")) + val + 1);
//     return Number(str);
//   }
//   return Number(str);
// }


export const formatNumberWithoutRounding = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const inputNumberFormat = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 20,
});

export const formatInputNumber = (value:any)=>{
  var num=unformatInputNumber(value)
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}



export const numOnly = (event:any) => {
  const key = event.keyCode || event.which;
  if (event.key === '.' && event.target.value?.includes('.')) {
    event.preventDefault();
  }
  if (
    (key >= 48 && key <= 57) ||
    (key >= 96 && key <= 105) ||
    [8,9,13,35,36,37,39,110,190].includes(key) ||
    (event.ctrlKey === true && ([65,67,86,88,90].includes(key)))
  ){}
  else {event.preventDefault();}
};

export const noSpecial = (evt:any) => {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (!(charCode > 31 && (charCode < 48 || charCode > 57)) || charCode === 46) {
  } else evt.preventDefault();
};

export const unformatInputNumber = (value:any)=>{
  return value.replaceAll(',','')
}
