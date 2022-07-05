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
import orHex from "../../assets/landing-page/or-hex.png";
import downArrow from "../../assets/landing-page/bxs_down-arrow.png";

import { Col, Row } from "antd";
import { BtnText, CardText } from "../home/home.styled";
import { useHistory } from "react-router-dom";

import Collapsible from "react-collapsible";
import { BsInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "antd";
import { AntdTooltip } from "./style";

export const LandingPage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <div className="top-div select-none">
        <div className="polygen1">
          <img alt="bg-hexagon" className="blur1" src={polygon4} />
          <img alt="bg-hexagon1" className="blur" src={polygon3} />
          <Row className="pl-10 sm:pl-0 custom-row">
            <Col className="col1 flex flex-col">
              <div>
                <div className="main-title">Metalend</div>
                <div className="sub-title pt-4">
                  A capital raising platform for everyone
                </div>
                <div className="flex justify-between w-4/6">
                  <button
                    onClick={() => history.push("/trade")}
                    style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
                    className="button-hover-change   mt-7 w-28 z-40 rounded-md px-1 py-1 inline-block text-center"
                  >
                    <BtnText
                      transform
                      size="12px"
                      weight="true"
                      color="black"
                      height="28px"
                    >
                      Launch App
                    </BtnText>
                  </button>
                  <button
                    onClick={() => history.push("/trade")}
                    style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
                    className="button-hover-change   mt-7 w-28 z-40 rounded-md px-1 py-1 inline-block text-center"
                  >
                    <BtnText
                      transform
                      size="12px"
                      weight="true"
                      color="black"
                      height="28px"
                    >
                      Launch App
                    </BtnText>
                  </button>
                  <button
                    onClick={() => history.push("/trade")}
                    style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
                    className="button-hover-change   mt-7 w-28 z-40 rounded-md px-1 py-1 inline-block text-center"
                  >
                    <BtnText
                      transform
                      size="12px"
                      weight="true"
                      color="black"
                      height="28px"
                    >
                      Launch App
                    </BtnText>
                  </button>
                </div>
              </div>
              <div className="flex mt-32 w-full items-center justify-center">
                <div className="flex-col text-center w-52 mr-4">
                  <img className="mx-auto mb-6" src={vector} alt="..." />
                  <text className="text-center">
                    Fully decentralized and not privileged
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center w-52 mr-4">
                  <img className="mx-auto mb-6" src={chart} alt="..." />
                  <text className="text-center">
                    Raise funding with or without collateral
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center w-52 mr-4">
                  <img className="mx-auto mb-6" src={carbon} alt="..." />
                  <text className="text-center">
                    Independent 3rd party credit evaluations
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center w-52">
                  <img className="mx-auto mb-6" src={union} alt="..." />
                  <text className="text-center">
                    Immediate secondary markets for all successful raises
                  </text>
                  <img
                    className="w-full h-4 mt-8"
                    src={radialborder}
                    alt="..."
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Row className="supply-data">
        <div className="w-10/12 mx-auto mt-20">
          <text className="supply-text">Borrowers</text>
        </div>
      </Row>

      <div className="w-11/12 bg-rectangle blur1 mx-auto mb-28 mt-20">
        <div className="grid grid-cols-3 w-11/12 mx-auto">
          <div className="col-span-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 pt-12 pr-12">
              <div className="bg-gray-300 rounded-xl text-lg p-4">
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
            <button
              onClick={() => history.push("/trade")}
              style={{ boxShadow: "0px 3px 9px 0px #40ba12" }}
              className="button-hover-change   mt-7 w-28 z-40 rounded-md px-1 py-1 inline-block text-center"
            >
              <BtnText
                transform
                size="12px"
                weight="true"
                color="black"
                height="28px"
              >
                Launch App
              </BtnText>
            </button>
          </div>
          <div className="col-span-1">
            <img className="h-full w-full" src={circleframe} alt="..." />
          </div>
        </div>
      </div>

      <Row className="supply-data">
        <div className="w-10/12 mx-auto mt-20">
          <text className="supply-text block">Traders and</text>
          <text className="supply-text ml-2">Lenders</text>
        </div>
      </Row>

      <div className="w-11/12 bg-lender-pro rounded-2xl blur1 mx-auto my-0 mb-28 mt-20 py-20 px-10">
        <div className="flex justify-around">
          <div className="flex flex-col self-center">
            <img className="" src={lenderframe} alt="..." />
          </div>

          <div className="flex flex-col">
            <div
              className="grid grid-cols-2 grid-rows-2 gap-4 pt-12 justify-items-center "
              style={{ marginTop: "-12rem" }}
            >
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-3 w-10/12">
                <p>Generate a fixed income</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-3   w-10/12">
                <p>Earn exposure to large ecosystems</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-3   w-10/12">
                <p>Benefit from liquidity in secondary markets</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg p-3  w-10/12">
                <p>Diversify your portfolio risk</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center">
              <button
                onClick={() => history.push("/trade")}
                className="lender-button-1  mt-7 w-10/12 z-40 rounded-md px-1 py-1 inline-block text-center"
              >
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="white"
                  height="28px"
                >
                  Browse New Issuances
                </BtnText>
              </button>
              <button
                onClick={() => history.push("/trade")}
                className="lender-button-1   mt-7 w-10/12 z-40 rounded-md px-1 py-1 inline-block text-center"
              >
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="white"
                  height="28px"
                >
                  Trade Secondary Markets
                </BtnText>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 bg-sb-fuel blur1 mx-auto mb-28 mt-20 py-20 px-10">
        <div className="flex justify-around">
          <div className="flex flex-col self-center">
            <BtnText size="15px" weight="true" color="white" height="28px">
              POWERED BY
            </BtnText>
            <text className="sb-fuel-text block mt-4">SB Token</text>
            <text className="sb-fuel-text block">Fuel of the Platform</text>
            <div className='grad-border text-center flex justify-center'>
            <button className="sb-fuel-button">
                <BtnText
                  transform
                  size="15px"
                  weight="true"
                  color="white"
                  height="28px"
                >
                  Learn More
                </BtnText>
              </button>
            </div>
             
            
           
          </div>
          <div className="flex flex-col justify-center my-0 mx-3 sm:w-full">
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
          </div>
        </div>
      </div>

      <GlobalStyle />
    </Wrapper>
  );
};
