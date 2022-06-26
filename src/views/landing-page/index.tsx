import React, { useRef, useState, useEffect } from "react";
import { Wrapper, GlobalStyle, Card } from "./style";
import polygon4 from "../../assets/landing-page/polygon_3.png";
import orHex from "../../assets/landing-page/or-hex.png";

import buttonIcon from "../../assets/landing-page/button.png";

import { Col, Row } from "antd";
import { BtnText, CardText } from "../home/home.styled";
import { useHistory } from "react-router-dom";

import { FiArrowUpRight } from "react-icons/fi";
import { CardData } from "./helper";
import { FAQ } from "./faq";
import axios from "axios";
import { AxiosResponse } from "axios";
import CountUp from "react-countup";
import { useWallet } from "@solana/wallet-adapter-react";

import { useConnection } from "../../contexts/connection";
import {
  POOL_30_ADDRESS,
  POOL_90_ADDRESS,
  PLATFORM_DATA_ACCOUNT,
} from "../../utils/ids";
import { POOL_DATA_LAYOUT, PoolDataLayout } from "../../utils/pool_data_layout";
import {
  PLATFORM_DATA_LAYOUT,
  PlatformDataLayout,
} from "../../utils/platform_data_layout";
import BN from "bn.js";
import "./index.css";

export const LandingPage = () => {
  const history = useHistory();
  const [selectedFAQ, setSelectedFAQ] = useState("intro");
  const ref = useRef<HTMLDivElement>(null);

  const wallet = useWallet();

  const connection = useConnection();

  const [data30pool, setData30pool] = useState<any>();
  const [data90pool, setData90pool] = useState<any>();

  const [showAllTrade, setAllTrade] = useState<number>(2);

  const [bond_yield30, setBond_Yield30] = useState(0);
  const [adjustedLiquidity30, setAdjustedLiquidity30] = useState(0);
  const [tradeLiquidityAvailability30, setTradeLiquidityAvailability30] =
    useState(0);

  const [bond_yield90, setBond_Yield90] = useState(0);
  const [adjustedLiquidity90, setAdjustedLiquidity90] = useState(0);
  const [tradeLiquidityAvailability90, setTradeLiquidityAvailability90] =
    useState(0);

  const onShowAllTrades = async (_type: number) => {
    setAllTrade(_type);
  };

  useEffect(() => {
    readPoolData_30();
    readPoolData_90();
    getStakingPoolData();
    onShowAllTrades(2);
    // getAllBalances();
  }, [wallet.publicKey]);

  useEffect(() => {
    //if (!wallet.publicKey) return;
    if (data30pool) {
      setAdjustedLiquidity30(
        new BN(data30pool.adjustedLiquidity, 10, "le").toNumber() / 1000000
      );
      setTradeLiquidityAvailability30(
        data30pool.trade_liquidity_availability / 10000
      );
      ////console.log(data30pool.trade_liquidity_availability,new BN(data30pool.adjustedLiquidity, 10, "le").toNumber()/1000000);
    }
    if (data90pool) {
      setAdjustedLiquidity90(
        new BN(data90pool.adjustedLiquidity, 10, "le").toNumber() / 1000000
      );
      setTradeLiquidityAvailability90(
        data90pool.trade_liquidity_availability / 10000
      );
      ////console.log(data90pool.trade_liquidity_availability);
    }
  }, [data30pool, data90pool]);

  const readPoolData_30 = async () => {
    const encodedPoolDataState = (await connection.getAccountInfo(
      POOL_30_ADDRESS,
      "singleGossip"
    ))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(
      encodedPoolDataState
    ) as PoolDataLayout;
    ////console.log("asas",decodedPoolDataState)
    setData30pool(decodedPoolDataState);
  };
  const readPoolData_90 = async () => {
    const encodedPoolDataState = (await connection.getAccountInfo(
      POOL_90_ADDRESS,
      "singleGossip"
    ))!.data;
    const decodedPoolDataState = POOL_DATA_LAYOUT.decode(
      encodedPoolDataState
    ) as PoolDataLayout;
    setData90pool(decodedPoolDataState);
  };
  const getStakingPoolData = async () => {
    const encodedPoolDataState = (await connection.getAccountInfo(
      PLATFORM_DATA_ACCOUNT,
      "singleGossip"
    ))!.data;
    const decodedPoolDataState = PLATFORM_DATA_LAYOUT.decode(
      encodedPoolDataState
    ) as PlatformDataLayout;
    ////console.log(decodedPoolDataState);
    let bond_yield = decodedPoolDataState.pool_yield_vector[0] / 100;
    setBond_Yield30(bond_yield);
    bond_yield = decodedPoolDataState.pool_yield_vector[1] / 100;
    setBond_Yield90(bond_yield);
  };

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      console.log(ref.current.scrollLeft, scrollOffset);
      ref.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Wrapper>
      <div className="top-div">
        <div className="polygen1">
          <img alt="bg-hexagon" src={polygon4} />
          <img alt="bg-hexagon1" className="blur" src={polygon4} />
          <Row className="custom-row">
            <Col className="col1" span={10}>
              <div className="main-title">
                Up to <span>{bond_yield90}%</span> in <br />
                Fixed Deposits
              </div>
              <div className="sub-title">
                Secured by a diversified exposure to a universe of stablecoins
              </div>
              <button
                onClick={() => history.push("/trade")}
                style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
                className="button-hover-change btn-hover-width mt-7 w-40 z-40 rounded-md px-2 py-2 inline-block text-center"
              >
                <BtnText
                  transform
                  size="16px"
                  weight="true"
                  color="black"
                  height="32px"
                >
                  Launch App
                  <FiArrowUpRight />
                </BtnText>
              </button>
            </Col>
            <Col className="col2" span={14}>
              <div className="sub-title">total deposits available</div>
              <CountUp
                  start={0}
                  end={Number((bond_yield90 || bond_yield30) ?
                    (
                     (bond_yield90 ? ((adjustedLiquidity90 * tradeLiquidityAvailability90 / (((1 + (bond_yield90/100))**(90/365)) - 1))/0.35) : 0) +
                     (bond_yield30 ? ((adjustedLiquidity30 * tradeLiquidityAvailability30 / (((1 + (bond_yield30/100))**(30/365)) - 1))/0.35) : 0))
                     :0)}
                  duration={1.5}
                  delay={0}
                  separator=","
                  decimals={2}
                  decimal="."
                >
                  {({ countUpRef }) => (
                    <div>
                    <h1 className="number-text">
                    $<span ref={countUpRef} />  
                    </h1>
                    </div>
                  )}
                </CountUp>
              
            </Col>
          </Row>
        </div>
      </div>
      <div className="scroll-handle">
        <Row className="py-5">
          <Col>
            {/* <button onClick={() => scroll(-900)}>
              <img className="left-btn mx-1" src={buttonIcon} alt="button" />
            </button>
            <button onClick={() => scroll(900)}>
              <img className="mx-1" src={buttonIcon} alt="button" />
            </button> */}
          </Col>
          <Col className="label">A Uniquely Dynamic Exposure</Col>
        </Row>
      </div>
      <br></br>
      {/* <div className="scrollable" ref={ref}>
        <div className="card-wrapper">
          {CardData.map(
            ({ headCoinId, title, otherCoin, width, coinInRow }, index) => (
              <Card width={width} key={"card-" + index}>
                <div className="card-top">
                  <div>
                    <span className="subHead">Stable Coin </span>
                    <br />
                    <span className="title">{title}</span>
                  </div>
                  <div>
                    <img
                      className="rounded-full"
                      src={require(`../../assets/coinType/logo${headCoinId}.jpg`)}
                      alt="..."
                    />
                  </div>
                </div>
                <div className="card-chain">
                  <span className="subHead">Chain</span>{" "}
                  <div className="chain-line"></div>
                </div>
                <Row className="card-bottom">
                  {otherCoin.map((coin) => (
                    <Col span={24 / (coinInRow || 2)} className="coin-card">
                      <div>
                        <img
                          className="rounded-full"
                          src={require(`../../assets/coinType/logo${coin.coinId}.jpg`)}
                          alt="..."
                        />
                      </div>
                      <div className="card-labels">
                        <span className="label">{coin.title}</span>
                        <span className="subLabel">{coin.percentage}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            )
          )}
        </div>
      </div> */}

      <Row>
        <Col span={24}>
          <h1 className="title-2">The Choice is Yours.</h1>
        </Col>
      </Row>
      <div className="flex flex-wrap w-9/12 mx-auto my-0 pt-5 2xl:w-11/12 xl:w-full justify-center">
        <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
          <div className="z-50">
            <img
              className="my-0 mx-auto  w-24  z-50"
              src={
                "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644405667/SuperB_tgvltb.svg"
              }
              alt="trade"
            />
          </div>
          <div className="flex flex-col justify-start yielder-below-Q2 mx-auto my-0 px-3 pb-4 pt-16  rounded-md w-96 -z-50 -mt-14 sm:w-full h-full">
            <div className="flex flex-col">
              <BtnText className="mt-1" color="white" size="21px" weight="true">
                Earn a Stable, Fixed Yield
              </BtnText>
              <CardText
                transform="capitalize"
                letterSpacing="1px"
                className="tracking-normal mt-12"
                size="15px"
                opacity="0.5"
              >
                Pick a Maturity. <br />
                Pick an Amount. <br />
                Your interest rate is FIXED
              </CardText>
              <CardText
                transform="capitalize"
                letterSpacing="1px"
                className="tracking-normal mt-12"
                size="15px"
                opacity="0.5"
              >
                Pay in USDC <br />
                Keep your FD (Fixed Deposit)
              </CardText>

              <button
                 onClick={() =>
                  window.open(
                    "https://superbonds.gitbook.io/superbonds/"
                  )
                }
                style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
                className="button-hover-change mx-auto mt-7 w-36 z-40 rounded-md px-2 py-2 inline-block text-center"
              >
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="black"
                  height="32px"
                >
                  Learn More
                </BtnText>
              </button>
            </div>
          </div>
          <div className="orHex">
            <img alt="bg-hexagon" src={orHex} />
          </div>
        </div>

        <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
          <div className="z-50">
            <img
              className="my-0 mx-auto w-24 z-50"
              src={
                "https://res.cloudinary.com/drr1rnoxf/image/upload/v1644309050/Yield_vdeosl.svg"
              }
              alt="trade"
            />
          </div>
          <div className="flex flex-col justify-start yielder-below-Q1 mx-auto my-0 px-3 pb-4 pt-16  rounded-md w-96 -z-50 -mt-14 sm:w-full h-full">
            <div className="flex flex-col">
              <BtnText className="mt-1" color="white" size="21px" weight="true">
                Earn Variable Rewards
              </BtnText>
              <CardText
                transform="capitalize"
                letterSpacing="1px"
                className="tracking-normal mt-12"
                size="15px"
                opacity="0.5"
              >
                Your capital pays the interest on FD purchases.
              </CardText>
              <CardText
                transform="capitalize"
                letterSpacing="1px"
                className="tracking-normal mt-12"
                size="15px"
                opacity="0.5"
              >
                USDC from FD purchasers deployed to generate cross-chain
                stablecoin yields.
              </CardText>

              <button
                 onClick={() =>
                  window.open(
                    "https://superbonds.gitbook.io/superbonds/"
                  )
                }
                style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
                className="button-hover-change mx-auto mt-7 w-36 z-40 rounded-md px-2 py-2 inline-block text-center"
              >
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="black"
                  height="32px"
                >
                  Learn More
                </BtnText>
              </button>
            </div>
          </div>
        </div>
        <div className="custom-bg-box"></div>
      </div>

      <Row>
        <Col span={24}>
          <h1 className="title-3">FAQ</h1>
        </Col>
      </Row>

      <div className="grid grid-cols-5 w-7/12 mx-auto">
        <button
          onClick={() => setSelectedFAQ("intro")}
          className={`${
            selectedFAQ === "intro"
              ? "menu-button-hover menu-button"
              : "menu-button"
          }   nav-title`}
        >
          <span
            className={`${
              selectedFAQ === "intro" ? "text-white" : ""
            }   title-4 font-bold`}
          >
            introduction
          </span>
        </button>
        <button
          onClick={() => setSelectedFAQ("sb")}
          className={`${
            selectedFAQ === "sb"
              ? "menu-button-hover menu-button"
              : "menu-button"
          }   nav-title`}
        >
          <span
            className={`${
              selectedFAQ === "sb" ? "text-white" : ""
            }   title-4 font-bold`}
          >
            $Sb token
          </span>
        </button>

        <button
          onClick={() => setSelectedFAQ("fd")}
          className={`${
            selectedFAQ === "fd"
              ? "menu-button-hover menu-button"
              : "menu-button"
          }   nav-title font-bold`}
        >
          <span
            className={`${selectedFAQ === "fd" ? "text-white" : ""}   title-4`}
          >
            Fixed Deposit
          </span>
        </button>

        <button
          onClick={() => setSelectedFAQ("lp")}
          className={`${
            selectedFAQ === "lp"
              ? "menu-button-hover menu-button"
              : "menu-button"
          }   nav-title font-bold`}
        >
          <span
            className={`${selectedFAQ === "lp" ? "text-white" : ""}   title-4`}
          >
            Liquidity Provider
          </span>
        </button>

        <button
          onClick={() => setSelectedFAQ("staking")}
          className={`${
            selectedFAQ === "staking"
              ? "menu-button-hover menu-button"
              : "menu-button"
          }   nav-title font-bold`}
        >
          <span
            className={`${
              selectedFAQ === "staking" ? "text-white" : ""
            }   title-4`}
          >
            Staking
          </span>
        </button>
      </div>

      <div className="w-7/12 mx-auto my-auto mt-10">
        <FAQ type={selectedFAQ} />
      </div>

      <section className="mb-5" style={{ marginTop: "7rem" }}>
        <div
          className="flex justify-around   mt-5   rounded-md flex-wrap w-8/12  2xl:w-8/12  maxWidth-lg my-0 mx-auto pb-1 pt-1 lg:w-11/12"
          style={{ maxWidth: "1400px" }}
        >
          <div className="xl:w-56 bg-transparent rounded-lg sahdow-lg flex flex-col justify-center items-center max-w-xs w-64 min-h-14">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginBottom: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/COMMONCROPPED_onwv85.svg"
              alt="home-page-card"
            />
          </div>

          <div className="xl:w-56 bg-transparent rounded-lg sahdow-lg flex flex-col justify-center items-center max-w-xs min-h-14">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginBottom: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/LVNACROPPED_dsoyzg.svg"
              alt="home-page-card"
            />
          </div>

          <div className="xl:w-56 bg-transparent rounded-lg sahdow-lg flex flex-col justify-center items-center max-w-xs min-h-14">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginBottom: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/POLYCHAINCROPPED_nug9cn.svg"
              alt="home-page-card"
            />
          </div>

          <div className="xl:w-56 bg-transparent rounded-lg sahdow-lg flex flex-col justify-center items-center max-w-xs min-h-14">
            <img
              className="object-center object-cover rounded-full h-52 w-full"
              style={{ marginTop: "" }}
              src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1637925580/KUBIKCROPPED_uhhbyu.svg"
              alt="home-page-card"
            />
          </div>
        </div>
      </section>
      <GlobalStyle />
    </Wrapper>
  );
};
