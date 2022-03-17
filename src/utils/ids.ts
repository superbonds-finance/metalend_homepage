import { PublicKey } from "@solana/web3.js";

export const SUPERBONDS_PROGRAM_ID = new PublicKey(
  "HD5i5baeWwrnt86GduAAQ977BsTUXHTnV4A7ndUSkmdq"
);

//Store Staking Data
export const STAKING_DATA_ACCOUNT = new PublicKey(
  "GuE2eHnXen3ngLzbhUyZAM7wmR3jEHihibFw9cUrEdct"
);

//Store Platform Data
export const PLATFORM_DATA_ACCOUNT = new PublicKey(
  "8gLMAXTCrwZsa7sguahZ9SPEqeSipwMfnBrZxLJ1gtpV"
);

//Hold 6B SuperB
export const SUPERB_REWARDS_POOL_ADDRESS = new PublicKey(
  "tMCKPPFW4Y1giHPbttag5ne33QGVsgRNWXsfntsxyDy"
);
// Treasury Account hold USDC
export const TREASURY_ADDRESS = new PublicKey(
  "EsLnzbGemkXzuXnHJzvtk1sMxA1bCgWvv8sxGKjrrvLx"
);
// Treasury Account hold SuperB
export const TREASURY_SUPERB_ADDRESS = new PublicKey(
  "ApQxLjtCzk3Hz15rK2ofUGJoYtKv6msi5qnR2FvMmi4V"
);
// Account that holds the SuperB fee
export const SUPERB_POOL_ADDRESS = new PublicKey(
  "9KZSfpDxwtanGNZpUKnyMpD7gtfs2uAd9yMyqiCqT9KT"
);

export const POOL_30_ADDRESS = new PublicKey(
  "FbFDRtApHrPfnk2suqYq1yAEnni2cjfiQGDaSug7myej"
);
export const POOL_90_ADDRESS = new PublicKey(
  "D6DfapEZrooYeXL5yxURbMdaJN7Ay4NRu8z8BDhMkb66"
);

export const LP_TOKEN_30_MINT_ADDRESS = new PublicKey(
  "6hQMAb84Tx4iW1no1XTHDsFLRYf4hojJ4ja6KYxHVSE"
);

export const LP_TOKEN_90_MINT_ADDRESS = new PublicKey(
  "1nbmE2VV6ThiPoZa1MPDcybsJ9vUSjXtk6ANbykBcSJ"
);

//DEVNET SUPERB and USDC
export const SUPERB_MINT_ADDRESS = new PublicKey(
  "H8pSXLW192Q8jzc272yQCCRrpphbZCGR3id8XEEw6JSa"
);
export const USDC_MINT_ADDRESS = new PublicKey(
  "2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8"
);

//MAINET SUPERB and USDC
// export const SUPERB_MINT_ADDRESS = new PublicKey(
//   "SuperbZyz7TsSdSoFAZ6RYHfAWe9NmjXBLVQpS8hqdx"
// );
//
// export const USDC_MINT_ADDRESS = new PublicKey(
//   "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
// );


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


export const USDT_DECIMALS = 6;
export const USDC_DECIMALS = 6;
export const SUPERB_DECIMALS = 6;
export const LP_TOKEN_DECIMALS = 6;
export const SUNNY_TOKEN_DECIMALS = 6;
export const SABER_TOKEN_DECIMALS = 6;
export const ORCA_TOKEN_DECIMALS = 6;

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
