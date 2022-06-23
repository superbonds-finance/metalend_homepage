import React from "react";
import { Wrapper, GlobalStyle } from "./style";
import polygon4 from "../../assets/landing-page/polygon_3.png";
import orHex from "../../assets/landing-page/or-hex.png";
import downArrow from "../../assets/landing-page/bxs_down-arrow.png";

import { Col, Row } from "antd";
import { BtnText, CardText } from "../home/home.styled";
import { useHistory } from "react-router-dom";

import Collapsible from "react-collapsible";
import { FiArrowUpRight } from "react-icons/fi";

export const FDPage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <div className="w-7/12 mx-auto my-0 fd-header flex flex-col mt-10 mb-10 ">
        <text className="fd-header-text">Fixed Deposits</text>
        <text className="fd-header-text">(FDs)</text>
        <text className="fd-sub-header">
          A predictable yield on your stablecoins
        </text>
      </div>
      <div className="scroll-handle flex justify-center align-middle  py-4">
        <text className="hero-side-text">Simple Mechanics</text>
      </div>
      <div className="top-div-fd flex justify-center">
        <img src="https://res.cloudinary.com/drr1rnoxf/image/upload/v1655892672/Group_1411_zqmesy.svg" />
      </div>
    
      <div className="fd-details">
        <div className="fd-desc-bg w-5/12 mx-auto my-0">
          <Row className="">
            <Col span={10} className='text-left'>
              <text className="fd-desc-header">Fixed return in USDC</text>
            </Col>
            <Col span={14}>
              <div className="flex flex-col">
                <text className="fd-desc-text">
                  A user can purchase a FD on SuperStable and achieve a fixed
                  return in USDC.
                </text>
                <text className="fd-desc-text mt-2">
                  This effectively reflects a view that the universal Stablecoin
                  yield is attractive.
                </text>
                <text className="fd-desc-text mt-2">
                  A user could also opt for “Floating Yield”. This is done by
                  becoming an LP. When this option is selected, the USDC
                  provided by the LP is used to satisfy the yield for the FD
                  purchaser. The SuperStable smart contract then uses the USDC
                  provided by an FD purchaser to yield-farm cross-chain rewards
                  for the LP. This option reflects the view that farmed yield is
                  cheap, and total yield should in aggregate be much higher.
                </text>
                <text className="fd-desc-text mt-2">
                  An LP also earns the benefit of a strong emission of $SB and a
                  portion of trading fees to boost their aggregate yield.
                </text>
                <button
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
            </Col>
          </Row>
        </div>
      </div>

      <GlobalStyle />
    </Wrapper>
  );
};
