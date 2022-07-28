import React from "react";
import { Wrapper, GlobalStyle } from "./style";
import polygon4 from "../../assets/Metalend/polygon_4.png";
import polygon3 from "../../assets/Metalend/polygon_3.png";
import carbon from "../../assets/Metalend/carbon_center-to-fit.png";
import union from "../../assets/Metalend/Union.png";
import vector from "../../assets/Metalend/Vector.png";
import chart from "../../assets/Metalend/chart.png";
import radialborder from "../../assets/Metalend/radialborder.png";
import boxborder from "../../assets/Metalend/boxborder.png";
import circleframe from "../../assets/Metalend/circleframe.png";
import lenderframe from "../../assets/Metalend/lender_frame.png";
 

// import { Col, Row } from "antd";
import { BtnText,   } from "../home/home.styled";
// import { useHistory } from "react-router-dom";

 
import { FiArrowUpRight } from "react-icons/fi";

export const Metalend = () => {
  // const history = useHistory();

  return (
    <Wrapper>
      <div className="top-div select-none">
        <div className="polygen1">
          <img alt="bg-hexagon" className="blur1" src={polygon4}/>
          <img alt="bg-hexagon1" className="blur" src={polygon3} />
          <div className="pl-10 pr-28 sm:pl-0 custom-row">
            <div className=" antd-col col1 flex flex-col w-full">
              <div className="w-1/2 lg:w-4/5 xl:w-4/6 2xl:w-3/5">
                <div className="main-title">Metalend</div>
                <div className="sub-title pt-6">
                 Permisonless Credit Market for Everyone
                </div>
                <div className="sub-title pt-3">
                 100% of Revenue Reserved for the Community
                </div>
                <div className="flex justify-between mt-8 pt-0.5 w-4/6 max-w-md">
                  <button className="button-learn-more learn-more-2 btn-hover-width  w-32 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
                    <BtnText
                      transform
                      size="15px"
                      weight="true"
                      color="white"
                      height="32px"
                    >
                      BORROW
                      <FiArrowUpRight style={{ color: "#52B4FF" }} />
                    </BtnText>
                  </button>
                  <button className="button-learn-more learn-more-3 btn-hover-width  w-32 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
                    <BtnText
                      transform
                      size="15px"
                      weight="true"
                      color="white"
                      height="32px"
                    >
                      LEND
                      <FiArrowUpRight style={{ color: "#53DFDF" }} />
                    </BtnText>
                  </button>
                  <button className="button-learn-more learn-more-4 btn-hover-width  w-32 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
                    <BtnText
                      transform
                      size="15px"
                      weight="true"
                      color="white"
                      height="32px"
                    >
                      TRADE
                      <FiArrowUpRight style={{ color: "#FFFFFF" }} />
                    </BtnText>
                  </button>
                </div>
              </div>
              <div className="flex mt-32 w-full items-center justify-between">
                <div className="flex-col text-center w-52">
                  <img
                    className="mx-auto mb-6 h-8 w-8"
                    src={vector}
                    alt="..."
                  />
                  <text className="text-center text-lg">
                    Fully decentralized and not privileged
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center w-52">
                  <img className="mx-auto mb-6 h-8 w-8" src={chart} alt="..." />
                  <text className="text-center text-lg">
                    Raise funding with or{" "}
                    <span style={{ color: "#01C0FC" }}>without</span> collateral
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center w-52">
                  <img
                    className="mx-auto mb-6 h-8 w-8"
                    src={carbon}
                    alt="..."
                  />
                  <text className="text-center text-lg">
                    Independent 3rd party credit scoring
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center w-64">
                  <img className="mx-auto mb-6 h-8 w-8" src={union} alt="..." />
                  <text className="text-center text-lg">
                    Immediate secondary markets for all successful raises
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mx-auto">
        <div className="w-10/12 mx-auto mt-20">
          <text className="supply-text">Borrowers</text>
        </div>
      </div>

      <div className="w-11/12 bg-rectangle blur1 mx-auto mt-10 rounded-md">
        <div className="flex w-11/12 mx-auto justify-between">
          <div className="w-2/5 xxl:w-3/5">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 pt-12 pr-12">
              <div className="bg-gray-300 rounded-xl text-lg p-4" style={{background:'#1A232B'}}>
                <p>Borrow For Your Specific Needs</p>
                <img className="w-8 h-1 mt-8" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 rounded-xl text-lg p-4">
                <p>Set Your Duration</p>
                <img className="w-8 h-1 mt-8" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 rounded-xl text-lg p-4">
                <p>Set Your Rate</p>
                <img className="w-8 h-1 mt-8" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 rounded-xl text-lg p-4">
                <p>Pledge Collateral (Optional)</p>
                <img className="w-8 h-1 mt-8" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 rounded-xl text-lg p-4">
                <p>No Liquidation Risk</p>
                <img className="w-8 h-1 mt-8" src={boxborder} alt="..." />
              </div>
            </div>
            <div className="w-80">
              <button className="button-learn-more learn-more-1 btn-hover-width-1  mt-9 w-38 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="white"
                  height="32px"
                >
                  Become a borrower
                </BtnText>
              </button>
            </div>
          </div>
          <div className="w-2/5 max-w-md">
            <img className="h-full w-full -mt-2" src={circleframe} alt="..." />
          </div>
        </div>
      </div>

      <div className="flex justify-center mx-auto mt-20">
        <div className="w-10/12 mx-auto ">
          <text className="supply-text block">Traders and</text>
          <text className="supply-text ml-2">Lenders</text>
        </div>
      </div>

      <div className="w-11/12 bg-lender-pro rounded-2xl blur1 mx-auto my-0 mt-20 py-20 px-10">
        <div className="flex justify-around">
          <div className="flex flex-col self-center">
            <img className="" src={lenderframe} alt="..." />
          </div>

          <div className="w-2/5 xxl:w-3/5 flex flex-col mx-4">
            <div
              className="grid grid-cols-2 grid-rows-2 gap-4 pt-12 justify-items-center "
              style={{ marginTop: "-12rem" }}
            >
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-6 w-full">
                <p>Generate a fixed income</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-6 w-full">
                <p>Earn exposure to large ecosystems</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-6 w-full">
                <p>Benefit from liquidity in secondary markets</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-6 w-full">
                <p>Diversify your portfolio risk</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 mt-6 gap-4 justify-items-center">
              <button className="button-learn-more learn-more-1 btn-hover-width-1  mt-9 w-38 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="white"
                  height="32px"
                >
                  Browse New Issuances
                </BtnText>
              </button>
              <button className="button-learn-more learn-more-1 btn-hover-width-1  mt-9 w-38 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="white"
                  height="32px"
                >
                  Trade Secondary Markets
                </BtnText>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 bg-sb-fuel blur1 mx-auto mb-28 mt-40 py-20 px-10 rounded-2xl ">
        <div className="flex justify-around">
          <div className="flex flex-col self-center">
            <BtnText size="15px" weight="true" color="white" height="28px">
              POWERED BY
            </BtnText>
            <text className="sb-fuel-text block mt-4">LNDR Token</text>
            <text className="sb-fuel-text block">Fuel of the Platform</text>
            <button className="button-learn-more learn-more btn-hover-width  mt-9 w-38 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
              <BtnText
                transform
                size="15px"
                weight="true"
                color="white"
                height="32px"
              >
                LEARN MORE
                <FiArrowUpRight style={{ color: "#52B4FF" }} />
              </BtnText>
            </button>
          </div>
          
          <div className="flex flex-col self-center">
            <BtnText size="15px" weight="true" color="white" height="28px">
              GOVERNED BY
            </BtnText>
            <text className="sb-fuel-text block mt-4">vLNDR Token</text>
            <text className="sb-fuel-text block">Owners of the Platform</text>
            <button className="button-learn-more learn-more btn-hover-width  mt-9 w-38 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
              <BtnText
                transform
                size="15px"
                weight="true"
                color="white"
                height="32px"
              >
                LEARN MORE
                <FiArrowUpRight style={{ color: "#52B4FF" }} />
              </BtnText>
            </button>
          </div>
          {/* <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
            <div className="z-50">
              <img
                className="my-0 mx-auto w-24 z-50 select-none"
                src={
                  "https://res.cloudinary.com/drr1rnoxf/image/upload/v1656944509/Group_1348_ieicp2.png"
                }
                alt="trade"
              />
            </div>
            <div className="flex flex-col justify-start sb-fuel-Q1 mx-auto my-0 px-3 pb-4 pt-16  rounded-md w-96 -z-50 -mt-14 sm:w-full h-full">
              <div className="flex flex-col justify-center">
                <BtnText
                  className="mt-1"
                  color="white"
                  size="21px"
                  weight="true"
                >
                  Trade SB Token
                </BtnText>
                <button
                  className="sb-market-button mt-5 items-center mx-auto my-0 rounded"
                  style={{ border: "1px solid #3D4F61", width: "70%" }}
                >
                  <img
                    onClick={() =>
                      window.open("https://www.mexc.com/exchange/SB_USDT")
                    }
                    className="mx-auto my-0 select-none cursor-pointer  "
                    src={
                      "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366156/full-logo-normal-mexc_cllivy.svg"
                    }
                    alt="..."
                    style={{ height: "50px", width: "130px" }}
                  />
                </button>
                <button
                  className="sb-market-button py-1.5 mt-2 w-15  mx-auto my-0 rounded"
                  style={{ border: "1px solid #3D4F61", width: "70%" }}
                >
                  <img
                    onClick={() =>
                      window.open(
                        "https://dex.raydium.io/#/market/E3cNotFPoECwQvacT2D7u3C3tKRkGtUxv8WFYazBEx4X"
                      )
                    }
                    className="mx-auto my-0 select-none  cursor-pointer Z-40 "
                    src={
                      "https://res.cloudinary.com/drr1rnoxf/image/upload/v1643366716/logo-text.cf5a7a0_lx0ueg.svg"
                    }
                    alt="..."
                    style={{ height: "38px", width: "150px" }}
                  />
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <GlobalStyle />
    </Wrapper>
  );
};


