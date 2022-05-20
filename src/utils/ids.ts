import { PublicKey } from "@solana/web3.js";

export const SUPERBONDS_PROGRAM_ID = new PublicKey(
  "2XdgrcCMj23zG1hX7yNv7pyP31NQdyTVXeHfrxQgybBw"
);

//Store Staking Data
export const STAKING_DATA_ACCOUNT = new PublicKey(
  "HoSYQdZKPjaddbv4sSpioBadUXPrfYgDwXMp6WXMdnuA"
);

//Store Platform Data
export const PLATFORM_DATA_ACCOUNT = new PublicKey(
  "8U9jQvPCpU9yzRZqnDfd8LKHQ3joMqT4ePE1LK5ftver"
);

//Hold 6B SuperB
export const SUPERB_REWARDS_POOL_ADDRESS = new PublicKey(
  "BJZtQCxreqYzWurS3kKvMYvRZdhsK2HzSRNMKNAtdiuK"
);
// Treasury Account hold USDC
export const TREASURY_ADDRESS = new PublicKey(
  "3DvWSxLkSV5BH2PXS5iU6aHwftTKWXtY7EYGX7KYedTx"
);
// Treasury Account hold SuperB
export const TREASURY_SUPERB_ADDRESS = new PublicKey(
  "41QuNwbd7uR8WAmYSAtb6sWaK3ho6uZx59CiJRH4oxbr"
);
// Account that holds the SuperB fee
export const SUPERB_POOL_ADDRESS = new PublicKey(
  "9JqGHYCEA2PtrCAp2Zgz4yZg9Sq2D3VAVVsPUaEAKLb5"
);

export const POOL_30_ADDRESS = new PublicKey(
  "EnFgZ2knSv7jyVmdskfXSNULyaHYwgp7NTs1KU4GYSFe"
);
export const POOL_90_ADDRESS = new PublicKey(
  "8udj2yN3nLtkhJhMD3paVHdaKfawN52mWB3KEFVKKfw5"
);

export const LP_TOKEN_30_MINT_ADDRESS = new PublicKey(
  "GEoSWEmY5zbPjhc2tn8RFjx9m5QxCZW1PNLwp9DxQwFk"
);

export const LP_TOKEN_90_MINT_ADDRESS = new PublicKey(
  "H4SsyPtoDHDLiEcHDH6YxzH65nEPEfRNZ6LsdNzt1a4F"
);

// //DEVNET SUPERB and USDC
// export const SUPERB_MINT_ADDRESS = new PublicKey(
//   "H8pSXLW192Q8jzc272yQCCRrpphbZCGR3id8XEEw6JSa"
// );
// export const USDC_MINT_ADDRESS = new PublicKey(
//   "2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8"
// );

//MAINET SUPERB and USDC
export const SUPERB_MINT_ADDRESS = new PublicKey(
  "SuperbZyz7TsSdSoFAZ6RYHfAWe9NmjXBLVQpS8hqdx"
);

export const USDC_MINT_ADDRESS = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);
export const USDT_MINT_ADDRESS = new PublicKey(
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
);

export const SUNNY_MINT_ADDRESS = new PublicKey(
  "SUNNYWgPQmFxe9wTZzNK7iPnJ3vYDrkgnxJRJm1s3ag"
);
export const SABER_MINT_ADDRESS = new PublicKey(
  "Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1"
);
export const ORCA_MINT_ADDRESS = new PublicKey(
  "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE"
);

//Free Tokens for DevNet
export const FREE_TOKEN_PROGRAM_ID = new PublicKey(
  "4e92qqeZREeSGro67eiZbmvSofSSME1E33U8B7Cq1R3y"
);
export const FREE_TOKEN_DATA_ADDRESS = new PublicKey(
  "BYtBJrfUYHwFma5cY1DMRmhFFPJMiSgBSUA9CdkgdjuP"
);
export const FREE_SUPERB_ADDRESS = new PublicKey(
  "8TprUYLmtaypkoQwa3xXZED1gHWekRZZeFCv4AKyDmsK"
);
export const FREE_USDC_ADDRESS = new PublicKey(
  "74guvaeJ9VBo7j8FRtDv77wrKecCJAaF4rAWSFn3yyrY"
);

export const SOL_DECIMALS = 9;
export const USDT_DECIMALS = 6;
export const USDC_DECIMALS = 6;
export const SUPERB_DECIMALS = 6;
export const LP_TOKEN_DECIMALS = 6;
export const SUNNY_TOKEN_DECIMALS = 6;
export const SABER_TOKEN_DECIMALS = 6;
export const ORCA_TOKEN_DECIMALS = 6;

export const FEE_BPS = 10;
export const FEE_COLLECTOR = new PublicKey(
'4Hq6DvqaPViHPWFaF1yt1KXEbtUkjzVS9zSpeZ9zPaoQ');
/*
    END OF SUPERBONDS IDS
*/
export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
);

export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
export let TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export let LENDING_PROGRAM_ID = new PublicKey(
  "TokenLending1111111111111111111111111111111"
);

export let SWAP_PROGRAM_ID = new PublicKey(
  "SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8"
);

export const PROGRAM_IDS = [
  {
    name: "mainnet-beta",
  },
  {
    name: "testnet",
  },
  {
    name: "devnet",
  },
  {
    name: "localnet",
  },
];

export const setProgramIds = (envName: string) => {
  let instance = PROGRAM_IDS.find((env) => env.name === envName);
  if (!instance) {
    return;
  }
};

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
  };
};
