import React from "react";
import { Wrapper } from "./style";
import polygon4 from '../../assets/landing-page/polygon_3.png';
import { Col, Row } from "antd";
import { BtnText } from "../home/home.styled";
import { useHistory } from "react-router-dom";


export const LandingPage = () => {

  const history = useHistory();



  return (<Wrapper>
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
            className="mt-7 w-48 z-40 rounded-md bg-green-100 px-4 py-2 inline-block text-center transform hover:scale-105"
          >
            <BtnText
              className="transform transition hover:scale-105"
              transform=""
              size="16px"
              weight="true"
              color="black"
              height='32px'
            >
              Launch App
            </BtnText>
            {/* <img  className=' mt-0.5' src={arrow}  /> */}
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
  </Wrapper>)

};

