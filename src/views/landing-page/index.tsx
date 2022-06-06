import React from "react";
import { Wrapper, GlobalStyle } from "./style";
import polygon4 from '../../assets/landing-page/polygon_3.png';
import orHex from '../../assets/landing-page/or-hex.png'

import { Col, Row } from "antd";
import { BtnText, CardText } from "../home/home.styled";
import { useHistory } from "react-router-dom";


export const LandingPage = () => {

  const history = useHistory();



  return (<Wrapper>
    <div className="top-div">
      <div className="polygen1">
        <img alt='bg-hexagon' src={polygon4} />
        <img alt='bg-hexagon1' className="blur" src={polygon4} />
        <Row className="custom-row">
          <Col className="col1" span={10}>
            <div className="main-title">
              Up to <span>9%</span> in <br />
              Fixed Deposits
            </div>
            <div className="sub-title">
              Secured by a diversified exposure to a universe of stablecoins
            </div>
            <button
              onClick={() =>
                history.push("/trade")
              }
              style={{ boxShadow: '0px 3px 9px 0px #40ba12' }}
              className="mt-7 w-40 z-40 rounded-md bg-green-100 px-2 py-2 inline-block text-center transform hover:scale-105"
            >
              <BtnText
                className="transform transition hover:scale-105"
                transform
                size="16px"
                weight="true"
                color="black"
                height='32px'
              >
                Launch App
              </BtnText>
            </button>


          </Col>
          <Col className="col2" span={14}>
            <div className="sub-title">
              total deposits available</div>
            <h1 className="number-text">
              $1,432,543,433.98
            </h1>
          </Col>
        </Row>
      </div>
    </div>
    <Row>
      <Col span={24}>
        <h1 className="title-2">
          The Choice is Yours.
        </h1>
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
        <div className="flex flex-col justify-start yielder-below-Q1 mx-auto my-0 px-3 pb-4 pt-16  rounded-md w-96 -z-50 -mt-14 sm:w-full h-full">
          <div className="flex flex-col">
            <BtnText
              className="mt-1"
              color="white"
              size="21px"
              weight="true"
            >
              Earn a Stable, Fixed Yield
            </BtnText>
            <CardText
              transform='capitalize'
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
              transform='capitalize'
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
                history.push("/trade")
              }
              style={{ boxShadow: '0px 3px 9px 0px #40ba12' }}
              className="mx-auto mt-7 w-40 z-40 rounded-md bg-green-100 px-2 py-2 inline-block text-center transform hover:scale-105"
            >
              <BtnText
                className="transform transition hover:scale-105"
                transform
                size="16px"
                weight="true"
                color="black"
                height='32px'
              >
                Learn More
              </BtnText>
            </button>
          </div>
        </div>
        <div className="orHex">
          <img alt='bg-hexagon' src={orHex} />
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
            <BtnText
              className="mt-1"
              color="white"
              size="21px"
              weight="true"
            >
              Earn Variable Rewards
            </BtnText>
            <CardText
              transform='capitalize'
              letterSpacing="1px"
              className="tracking-normal mt-12"
              size="15px"
              opacity="0.5"
            >
              Your capital pays the interest on FD purchases.
            </CardText>
            <CardText
              transform='capitalize'
              letterSpacing="1px"
              className="tracking-normal mt-12"
              size="15px"
              opacity="0.5"
            >
              USDC from FD purchasers deployed to generate cross-chain stablecoin yields.
            </CardText>

            <button
              onClick={() =>
                history.push("/trade")
              }
              style={{ boxShadow: '0px 3px 9px 0px #40ba12' }}
              className="mx-auto mt-7 w-40 z-40 rounded-md bg-green-100 px-2 py-2 inline-block text-center transform hover:scale-105"
            >
              <BtnText
                className="transform transition hover:scale-105"
                transform
                size="16px"
                weight="true"
                color="black"
                height='32px'
              >
                Learn More
              </BtnText>
            </button>
          </div>
        </div>
      </div>
<div className="custom-bg-box"></div>
    </div>
    <GlobalStyle />
  </Wrapper>)

};

