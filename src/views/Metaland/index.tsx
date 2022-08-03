import React, { useState } from "react";
import { Wrapper, GlobalStyle, HeadeText } from "./style";
import polygon4 from "../../assets/Metalend/landingPageTop.png";
import polygon4Md from "../../assets/Metalend/landingPageTopMd.png";
import polygon4Sm from "../../assets/Metalend/landingPageTopSm.png";

import carbon from "../../assets/Metalend/carbon_center-to-fit.png";
import union from "../../assets/Metalend/Union.png";
import vector from "../../assets/Metalend/Vector.png";
import chart from "../../assets/Metalend/chart.png";
import radialborder from "../../assets/Metalend/radialborder.png";
import boxborder from "../../assets/Metalend/boxborder.png";
import circleframe from "../../assets/Metalend/circleframe.png";
import lenderframe from "../../assets/Metalend/lender_frame.png";
import Modal from "./Modal"
import { useMediaPredicate } from "react-media-hook";
// import { Col, Row } from "antd";
import { BtnText, } from "../home/home.styled";
// import { useHistory } from "react-router-dom";
import "./index.css"


import { FiArrowUpRight } from "react-icons/fi";

export const Metalend = () => {
  // const history = useHistory();
  let [isOpen, setIsOpen] = useState(false)
  const lessThan1536 = useMediaPredicate("(max-width: 1536px)");
  const lessThan769 = useMediaPredicate("(max-width: 769px)");


  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <Wrapper>
      <Modal closeModal={closeModal}
        openModal={openModal} isOpen={isOpen} />

      <div className="top-div select-none mx-0 my-auto hero-section" style={{ maxWidth: '1600px', margin: "0 auto", }}>

        <div className="polygen1  2xxl:ml-10 sm:ml-2 relative" >
          <img alt="bg-hexagon" className="blur1" src={lessThan769 ? polygon4Sm : (lessThan1536 ? polygon4Md : polygon4)} />
          {/* <img alt="bg-hexagon1" className="blur" src={polygon3} /> */}
          <div className="pl-8 pt-28 xxl:pl-10 xxl:pt-0 pr-28 md:pt-20 md:pr-10 sm:pl-0 sm:pr-0 custom-row" >
            <div className="antd-col col1 flex flex-col w-full">
              <div className="w-full hero-section1">
                <div className="main-title">{/* Metalend */}A Permissionless<br />
                  Credit Market for Everyone</div>
                {/* <HeadeText>
                  Permisonless Credit Market for Everyone
                </HeadeText> */}
                <HeadeText className='mt-8 mb-6'>
                  100% of Revenue Reserved for the Community
                </HeadeText>

                <div className="flex justify-start mt-8 pt-0.5 w-auto sm:flex-col sm:items-center">
                  <button onClick={() => openModal()} className="button-learn-more learn-more-2 btn-hover-width  w-40 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
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
                  <button onClick={() => openModal()} className="button-learn-more learn-more-3 btn-hover-width  w-40 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
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
                  <button onClick={() => openModal()} className="button-learn-more learn-more-4 btn-hover-width  w-40 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
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
              <div className="icon-desc ">
                <div className="flex-col items-center  text-center hero-section-desc">
                  <img
                    className="mx-auto mb-8 hero-section-desc-img"
                    width={35}
                    height={35}
                    src={vector}
                    alt="..."
                  />
                  <text className="text-center text-lg font-semibold">
                    Fully decentralized and <br />
                    not privileged
                  </text>
                  <img
                    className="w-full h-4 mt-8 border-image"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center hero-section-desc">
                  <img className="mx-auto mb-8 hero-section-desc-img"
                    width={35}
                    height={35} src={chart} alt="..." />
                  <text className="text-center text-lg font-semibold">
                    Raise funding with or{" "}<br />
                    <span style={{ color: "#01C0FC" }}>without</span> collateral
                  </text>
                  <img
                    className="w-full h-4 mt-8 border-image"
                    src={radialborder}
                    alt="..."
                  />
                </div>
                <div className="flex-col text-center hero-section-desc">
                  <img
                    className="mx-auto mb-8 hero-section-desc-img"
                    width={40}
                    height={40}
                    src={carbon}
                    alt="..."
                  />
                  <text className="text-center text-lg font-semibold" >
                    Independent 3rd party<br />
                    credit evaluations
                  </text>
                  <img
                    className="w-full h-4 mt-8 border-image"
                    src={radialborder}
                    alt="..."
                  />
                </div>


                <div className="flex-col text-center hero-section-desc2">
                  <img className="mx-auto mb-6 hero-section-desc-img"
                    width={35}
                    height={35} src={union} alt="..." />
                  <text className="text-center text-lg font-semibold">
                    Immediate secondary markets <br className="customBr" />
                    for all successful raises
                  </text>
                  <img
                    className="w-full h-4 mt-8 border-image"
                    src={radialborder}
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  mx-auto" style={{ maxWidth: '1350px' }}>
        <div className="w-full mx-auto mt-20 2xl:w-10/12 md:text-center">
          <text className="supply-text">Borrowers</text>
        </div>
      </div>

      <div className="w-11/12 bg-rectangle blur1 mx-auto mt-10 rounded-2xl md:w-full md:mx-0 md:mt-20 " style={{ maxWidth: '1600px' }}>
        <div className="flex w-11/12 mx-auto justify-between xl:justify-between md:flex-col-reverse md:items-center" style={{ maxWidth: '1350px' }} >
          <div className="w-3/5 xxl:w-3/5 md:w-11/12">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 pr-12 md:pr-0 md:gap-8 md:grid-cols-1 second-section-main" >
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg second-section-card"   >
                <p>Borrow For Your Specific Needs</p>
                <img className="w-8 h-1 mt-auto md:mx-auto md:w-20" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg second-section-card" >
                <p>Set Your Duration</p>
                <img className="w-8 h-1 mt-auto md:mx-auto md:w-20" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg second-section-card">
                <p>Set Your Rate</p>
                <img className="w-8 h-1 mt-auto md:mx-auto md:w-20" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg second-section-card">
                <p>Pledge Collateral (Optional)</p>
                <img className="w-8 h-1 mt-auto md:mx-auto md:w-20" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg second-section-card">
                <p>No Liquidation Risk</p>
                <img className="w-8 h-1 mt-auto md:mx-auto md:w-20" src={boxborder} alt="..." />
              </div>
            </div>
            <div className="w-80 md:w-full md:mb-20 md:mt-8">
              <button onClick={() => openModal()} className="button-learn-more learn-more-new btn-hover-width-1  mt-9 w-38 md:w-full z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
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
          <div className="max-w-md  ">
            <img className="h-full w-full -mt-2 borrower-image" src={circleframe} alt="..." />
          </div>
        </div>
      </div>

      <div className="flex justify-center mx-auto mt-20" style={{ maxWidth: '1350px' }}>
        <div className="w-full mx-auto mt-20 2xl:w-10/12 ">
          <text className="supply-text block">Traders and</text>
          <text className="supply-text ml-2">Lenders</text>
        </div>
      </div>

      <div className="w-11/12 bg-lender-pro rounded-2xl blur1 mx-auto my-0 mt-20 py-20 lender-section" style={{ maxWidth: '1600px' }}>
        <div className="flex w-11/12 mx-auto justify-between xl:justify-between" style={{ maxWidth: '1350px' }}>
          <div className="flex flex-col self-center">
            <img className="lender-img" src={lenderframe} alt="..." />
          </div>

          <div className="  flex flex-col mx-4">
            <div
              className="grid grid-cols-2 grid-rows-2 gap-4 pt-12 justify-items-center third-section-main"
            >
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg third-section-card">
                <p >Generate a fixed income</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg third-section-card">
                <p>Earn exposure to large ecosystems</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg third-section-card">
                <p>Benefit from liquidity in secondary markets</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
              <div className="bg-gray-300 flex flex-col rounded-xl text-lg  third-section-card">
                <p>Diversify your portfolio risk</p>
                <img className="w-8 h-1 mt-auto" src={boxborder} alt="..." />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 mt-6 gap-4 justify-items-center">
              <button onClick={() => openModal()} className="w-10/12 learn-more-1  mt-9 rounded-md inline-block text-center text-sm  whitespace-nowrap"  >
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
              <button onClick={() => openModal()} className=" w-10/12 button-learn-more  learn-more-1 btn-hover-width-1  mt-9 rounded-md inline-block text-center text-sm  whitespace-nowrap"  >
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

      <div className="w-full bg-sb-fuel blur1  pb-56 pt-40  px-40 rounded-2xl ">
        <div className="flex justify-between mx-auto " style={{ maxWidth: '1400px' }}>
          <div className="flex flex-col self-center">
            <BtnText size="15px" weight="true" color="white" height="28px">
              POWERED BY
            </BtnText>
            <text className="sb-fuel-text block mt-4">LNDR Token</text>
            <text className="sb-fuel-text block">Fuel of the Platform</text>
            <button onClick={() => openModal()} className="button-learn-more learn-more btn-hover-width  mt-9 w-38 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
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
            <button onClick={() => openModal()} className="button-learn-more learn-more btn-hover-width  mt-9 w-38 z-40 rounded-md inline-block text-center text-sm  whitespace-nowrap">
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


