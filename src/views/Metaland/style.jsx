import styled, { createGlobalStyle } from "styled-components";

import polygon3 from "../../assets/Metalend/polygon_3.png";
import bgRectangle from "../../assets/Metalend/bgRectangle.png";
import bgSbFuel from "../../assets/Metalend/bgSbFuel.png";
import { BtnText } from "../home/home.styled";

export const GlobalStyle = createGlobalStyle`

`;
export const ModalWrapper = styled.div`
  button.modal-button {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    padding: 12px 36px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(rgba(1, 192, 252, 0.7), rgba(1, 192, 252, 0.7))
          padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.modal-button:hover {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    padding: 12px 36px;
    // border-width: 3px;
    // color: white;
    box-shadow: white;
    filter: drop-shadow(0px 3px 9px rgba(255, 255, 255, 0.46));
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(white, white) padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    } 
  }
`
export const AntdTooltip = styled.div`
  .ant-tooltip-inner {
    color: white;
    background: #334150;
    border-radius: 8px;
    text-transform: uppercase;
    font-family: "Archivo";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    margin-top: ${(props) => (props.margin ? props.margin : "-3rem")};
  }
`;

export const HeadeText = styled.text`
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  /* or 129% */

  display: flex;
  align-items: center;
  letter-spacing: -1px;
  font-feature-settings: "ss02" on, "ss03" on, "ss04" on;

  /* White */

  color: #ffffff;
`;

export const Wrapper = styled.div`

  background: #161d23;
  .top-div {
    background-color: #161d23;
    margin-left: 40px;
    padding-top: 70px;
    height: 830px;
    @media (min-width: 1536px) {
      height: 1102px;
    }
    @media (max-width: 1140px) {
      height: 1030px;
    }
    @media (max-width: 769px) {
      height: 1030px;
    }
    @media (max-width: 768px) {
      margin-left: 15px;
      height: 1120px;
    }
    @media (max-width: 639px) {
      height: 1650px;
    }
  }
  .antd-col {
    position: relative;
    max-width: 100%;
    min-height: 1px;
    .hero-section1{
      margin-left:3.5rem;
      @media (max-width: 639px) {
        margin-left: 0.5rem;
    }
    }    

  }
  .icon-desc {
    max-width: 1296px;
    width: 1296px;
    display: flex;
    margin: 0px -24px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    .hero-section-desc{
      width: 342px;
      padding: 14px 24px 24px;
      .border-image{
        width: 199px;
        margin: 0 auto;
        margin-top:2rem;
      }
      
    }
    .hero-section-desc2{
      width: 342px;
      padding:0px;
      .border-image{
        width: 199px;
        margin: 0 auto;
        margin-top:2rem;
      }
      
    }
  }
   

  .sb-fuel-logo {
    width: 40px;
    height: 40px;
  }

  .max-wrapper {
    max-width: 1536px;
  }
  @media (max-width: 768px) {
    .sb-fuel-logo {
      width: 60px;
      height: 60px;
    }
  }

  button.learn-more {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 12rem;
    padding: 10px 16px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(rgba(1, 192, 252, 0.7), rgba(1, 192, 252, 0.7))
          padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.learn-more:hover {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 12rem;
    padding: 10px 16px;
    // border-width: 3px;
    // color: white;
    box-shadow: white;
    filter: drop-shadow(0px 3px 9px rgba(255, 255, 255, 0.46));
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(white, white) padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.learn-more-2 {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 130px;
    @media screen and (min-width :1536px) {
      width: 10.2rem;
    }
    padding: 8px;
    margin-right: 20px;
    @media (max-width: 1536px) {
      width: 130px;
    }
    @media (max-width: 639px) {
      margin-right: 0;
      margin-bottom: 20px;
      width:100%;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(rgba(1, 192, 252, 0.7), rgba(1, 192, 252, 0.7))
          padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.learn-more-2:hover {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 130px;
    @media screen and (min-width :1536px) {
      width: 10.2rem;
    }
    padding: 8px;
    @media (max-width: 1536px) {
      width: 130px;
    }
    // border-width: 3px;
    // color: white;
    box-shadow: white;
    filter: drop-shadow(0px 3px 9px rgba(255, 255, 255, 0.46));
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(white, white) padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.learn-more-3 {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 130px;
    @media screen and (min-width :1536px) {
      width: 10.2rem;
    }
    padding: 8px;
    margin-right: 20px;
    @media (max-width: 1536px) {
      width: 130px;
    }
    @media (max-width: 639px) {
      margin-right: 0;
      margin-bottom: 20px;
      width:100%;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(90.02deg, #0f8181 -54.12%, #01fcfc 101.37%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(rgba(1, 192, 252, 0.7), rgba(1, 192, 252, 0.7))
          padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.learn-more-3:hover {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 130px;
    @media screen and (min-width :1536px) {
      width: 10.2rem;
    }
    padding: 8px;
    @media (max-width: 1536px) {
      width: 130px;
    }
    // border-width: 3px;
    // color: white;
    box-shadow: white;
    filter: drop-shadow(0px 3px 9px rgba(255, 255, 255, 0.46));
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90.02deg, #0f8181 -54.12%, #01fcfc 101.37%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(white, white) padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.learn-more-4 {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 130px;
    @media screen and (min-width :1536px) {
      width: 10.2rem;
    }
    padding: 8px;
    @media (max-width: 1536px) {
      width: 130px;
    }
    @media (max-width: 639px) {
      margin-right: 0;
      margin-bottom: 20px;
      width:100%;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.33deg, #ffffff 0.22%, #659acb 99.11%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(rgba(1, 192, 252, 0.7), rgba(1, 192, 252, 0.7))
          padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }

  button.learn-more-4:hover {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 130px;
    @media screen and (min-width :1536px) {
      width: 10.2rem;
    }
    padding: 8px;
    // border-width: 3px;
    // color: white;
    @media (max-width: 1536px) {
      width: 130px;
    }
    box-shadow: white;
    filter: drop-shadow(0px 3px 9px rgba(255, 255, 255, 0.46));
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.33deg, #ffffff 0.22%, #659acb 99.11%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(white, white) padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
  }
  button.learn-more-new {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 229px;
    padding: 10px 16px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(rgba(1, 192, 252, 0.7), rgba(1, 192, 252, 0.7))
          padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }

    @media (max-width: 1536px) {
      width: 292px;
    }
  }

  button.learn-more-new:hover {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 229px;
    padding: 10px 16px;
    // border-width: 3px;
    // color: white;
    box-shadow: white;
    filter: drop-shadow(0px 3px 9px rgba(255, 255, 255, 0.46));
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(white, white) padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
    @media (max-width: 1536px) {
      width: 292px;
    }
  }




  button.learn-more-1 {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 320px;
    padding: 10px 16px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(rgba(1, 192, 252, 0.7), rgba(1, 192, 252, 0.7))
          padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }

    @media (max-width: 1536px) {
      width: 292px;
    }
  }

  button.learn-more-1:hover {
    position: relative;
    border: 3px solid transparent;
    border-radius: 6px;
    width: 320px;
    padding: 10px 16px;
    // border-width: 3px;
    // color: white;
    box-shadow: white;
    filter: drop-shadow(0px 3px 9px rgba(255, 255, 255, 0.46));
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%)
        border-box;
      border: inherit;
      border-radius: inherit;
      mask: linear-gradient(white, white) padding-box,
        linear-gradient(white, white);
      -webkit-mask-composite: xor;
    }
    @media (max-width: 1536px) {
      width: 292px;
    }
  }
  .button-learn-more {
    /* background: linear-gradient(0deg, #659ACB, #659ACB), ##FFFFF;
  transition: background 5s; */

    position: relative;
    z-index: 1;
    transition: width 0.3s linear;
    span {
      transition: all 0.3s linear;
    }
    // background: rgba(1, 192, 252, 0.3);

    //   &:after {
    // position: absolute;
    // content: '';
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // border-radius: 0.3em;
    // transition: opacity 0.5s ease-out;
    // z-index: 2;
    // opacity: 0;
    // }
    // &:hover:after {
    // opacity: 1;
    // }
    ${BtnText} {
      position: relative;
      z-index: 3;
    }
  }

  .vesb-text {
    font-family: "Plus Jakarta Sans";
    font-size: 20px;
    font-weight: 700;
  }
  .vesb-text1 {
    font-family: "Plus Jakarta Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    color: #687d95;
  }

  .sb-market-button {
    border: 1px solid white;
    border-radius: 8px;
  }

  .sb-logo-text {
    margin-left: 2px;
    font-family: "Archivo";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }
  @media (max-width: 768px) {
    .sb-logo-text {
      margin-left: 30px;
      font-family: "Archivo";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      letter-spacing: 0.3px;
      color: #ffffff;
    }
  }

  .icon-desc {
    margin-top: 10.5rem;
    @media (max-width: 1900px) {
      margin-top: 6.5rem;
    }
    
    
    text {
      font-style: normal;
      font-weight: 500;
      font-size: 21px;
      line-height: 30px;
      /* or 141% */

      letter-spacing: -0.3px;
      font-feature-settings: "ss03" on, "ss04" on, "ss02" on;

      /* backgrounds/G3 */

      color: #687d95;
    }
    @media (max-width: 1536px) {
      text{
      font-size: 18px;
      line-height: 24px;
      }
      .customBr {
        display: none;
      }
      width: 1071px;
     .hero-section-desc{
       width: 240px;
       padding: 14px 24px 24px;
       .border-image{
         width: 199px;
         margin: 0 auto;
         margin-top:3rem;
       }
       
     }
     .hero-section-desc2{
       width: 241px;
       padding: 14px 24px 24px;
       .border-image{
         width: 199px;
         margin: 0 auto;
         margin-top:1.3rem;
       }
  
   }
 }
 @media (max-width: 1140px){
    flex-wrap: wrap;
      width: 100%;
    }
 @media screen and (max-width: 769px) {
    width: auto;
 }
  }

  .bg-rectangle {
    background-image: url(${bgRectangle});
    height: 542px;
    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    // width: 100%;
    // background-position-x: right;
    background-position-y: 90px;
    .blur1 {
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 0%;
    }
    @media (max-width: 1536px) {
      height: 435px;
    }
  }
  .bg-lender {
    background-image: url(${bgRectangle});
    height: 600px;
    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    // width: 100%;
    // background-position-x: right;
    //background-position-y: 90px;
    .blur1 {
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 100%;
    }
  }

  .bg-lender-pro {
    background-image: url(${bgRectangle});

    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    // width: 100%;
    // background-position-x: right;
    //background-position-y: 90px;
    .blur1 {
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 100%;
    }
  }

  .bg-sb-fuel {
    background-image: url(${bgSbFuel});

    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: auto;
    background-position-y: 12px;
    // width: 100%;
    // background-position-x: right;
    //background-position-y: 90px;
    .blur1 {
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 100%;
    }
  }
  .polygen1 {
    // background-image: url(${polygon3});
    height: 800px;
    @media (max-width: 1140px) {
      height: 100%;
    }
    // background-size: 200px;
    // background-repeat: no-repeat;
    // background-sizeo: contain;
    // width: 100%;
    // background-position-x: right;
    // background-position-y: 75px;
    .blur1 {
      position: absolute;
      //left: 25px;
      height: 732px;
      width: 100%;
      border-radius: 20px;
      @media screen and (min-width: 1536px) {
        height: 972px;
      }
      @media (max-width: 1140px) {
        height: 100%;
      }
      @media (max-width: 768px) {
        position: absolute;
        left: 15px;
        height: 100%;
        width: 100%;
      }
      @media (max-width: 639px) {
        height: 680px;
      }
      @media (max-width: 418px) {
        height: 720px;
      }
    }
    .blur {
      position: absolute;
      top: 15%;
      right: 0px;
      height: 610px;
      width: 670px;
      @media screen and (min-width: 1900px) {
        width: 950px;
      }
    }

    .custom-row {
      height: 800px;
      .col1 {
        padding: 75px 0 0 80px;
        .main-title {
          font-style: normal;
          font-weight: 500;
          font-size: 64px;
          line-height: 71px;
          /* or 110% */

          display: flex;
          align-items: center;
          letter-spacing: -1.3px;
          font-feature-settings: "ss02" on, "ss03" on, "ss04" on;

          /* gradients/Linear blue teal 1 */

          background: linear-gradient(90.09deg, #01fcfc 2.67%, #0085ff 104.69%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        @media (max-width: 1536px) {
          padding: 75px 0 0 20px;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 3.5rem;
            line-height: 4rem;
            padding-bottom: 10px;
          }
        }
        .sub-title {
          font-family: "Space Grotesk";
          font-style: normal;
          font-weight: 500;
          font-size: 40px;
          line-height: 27px;
          display: flex;
          align-items: center;
          letter-spacing: -1px;
          font-feature-settings: "ss02" on, "ss03" on, "ss04" on;
          color: #ffffff;
        }
      }
      @media (max-width: 768px) {
        .col1 {
          padding: 70px 20px 60px 20px;
        }
      }
      // .col2{
      //   display: flex;
      //   align-items: start;
      //   justify-content: end;
      //   flex-direction: column;
      //   text-transform: uppercase;
      //   letter-spacing: 5px;
      //   // padding: 0 0 90px 120px;
      //   .sub-title{
      //     color: #3D4F61;
      //     font-size: 1.3rem;
      //     max-width: 18rem;
      //   }
      //   .number-text{
      //     font-size: 56px;
      //     letter-spacing: 0.340238px;
      //     text-transform: uppercase;
      //     background: linear-gradient(89.8deg, #7CFA4C -33.33%, #3997F4 99.82%);
      //     -webkit-background-clip: text;
      //     -webkit-text-fill-color: transparent;
      //   }
      // }
    }
  }
  .supply-data {
    margin: 3rem 0rem;
  }

  .title-2 {
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 34px;
    font-family: "Plus Jakarta Sans";
    text-align: center;
  }

  .supply-text {
    font-weight: 500;
    font-size: 52px;
    line-height: 47px;
    letter-spacing: -1px;
    background-image: linear-gradient(90.09deg, #01fcfc, #0085ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  .grad-border {
    background: linear-gradient(269.54deg, #01c0fc 0.15%, #0085ff 96.26%);
    border-radius: 2rem;
    border-width: 1rem;
    width: 160px;
  }

  .sb-fuel-button {
    background: rgba(1, 192, 252, 0.3);

    text-align: center;

    margin: 10px;
    width: 100%;
  }

  .sb-fuel-text {
    font-weight: 500;
    font-size: 52px;
    line-height: 47px;
    letter-spacing: -1px;
    background-image: linear-gradient(90.09deg, #01fcfc, #0085ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .title-3 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 34px;
    padding: 6rem 0 2rem;
    text-align: center;
  }
  .title-4 {
    font-size: 14px;
    color: #687d95;
    text-transform: uppercase;
    text-align: center;
  }

  .yielder-below-Q1,
  .yielder-below-Q2 {
    text-align: center;
    padding: 65px 50px 50px;
  }
  .sb-fuel-Q1 {
    text-align: center;
    padding: 65px 50px 50px;
    clip-path: polygon(0 0, 186% 0, 0 186%);
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 56.83%,
        rgba(1, 192, 252, 0.2) 103.83%
      ),
      #1a232b;
  }
  .yielder-below-Q2 {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 56.83%,
        rgba(117, 233, 71, 0.2) 103.83%
      ),
      #1a232b;
    clip-path: polygon(100% 0, 100% 100%, 14% 100%, 0 86%, 0 0);
  }

  .btn-hover-width {
    svg {
      color: #ffffff;
      font-size: 1.25rem;
      position: absolute;
      right: -30px;
      top: -4px;
      opacity: 0;
    }

    @keyframes animation2 {
      0% {
        right: -30px;
        top: -4px;
      }
      10% {
        right: -5px;
        top: 12px;
      }
      100% {
        right: -30px;
        top: -4px;
      }
    }

    &:hover {
      span {
        width: 12rem !important;
        margin-left: -16px;
      }
      svg {
        animation-name: animation2;
        animation-duration: 0.3s;
        opacity: 1;
      }
    }
  }
  .btn-hover-width-1 {
    svg {
      color: #52b4ff;
      font-size: 1.5rem;
      position: absolute;
      right: -30px;
      top: -4px;
      opacity: 0;
    }

    @keyframes animation2 {
      0% {
        right: -30px;
        top: -4px;
      }
      10% {
        right: -5px;
        top: 12px;
      }
      100% {
        right: -30px;
        top: -4px;
      }
    }

    &:hover {
      span {
        width: 12rem !important;
        // margin-left: -16px;
      }
      svg {
        animation-name: animation2;
        animation-duration: 0.3s;
        opacity: 1;
      }
    }
  }
  .lender-button-1 {
    background: rgba(23, 133, 168, 0.3);
    border-radius: 6px;
    border: 2px solid;

    border-image-source: linear-gradient(
      269.54deg,
      #01c0fc 0.15%,
      #0085ff 96.26%
    );
  }
  .button-hover-change {
    /* background: linear-gradient(0deg, #7CFA4C, #7CFA4C), #1F2933;
    transition: background 5s; */

    position: relative;
    // background-color: #7CFA4C;
    // background-image: linear-gradient(0deg, #7CFA4C, #7CFA4C), #1F2933;
    z-index: 1;
    transition: width 0.1s ease-in-out;
    // border-image: linear-gradient(269.33deg, #FFFFFF 0.22%, #659ACB 99.11%);
    // border-image: linear-gradient(45deg, red , yellow);
    // border-image-slice: 1;
    // height: 120px;
    border: 3px solid;

    &:after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.3em;
      // border-image: linear-gradient(269.33deg, #FFFFFF 0.22%, #659ACB 99.11%);
      // border-image: linear-gradient(45deg, red , yellow);
      // border-image-slice: 1;
      // height: 120px;
      transition: opacity 0.5s ease-out;
      z-index: 2;
      opacity: 0;
    }
    &:hover:after {
      opacity: 1;
    }
  }
  .orHex {
    position: absolute;
    left: calc(50% - 40px);
    z-index: 1;
  }
  .custom-bg-box {
    height: 380px;
    width: 80%;
    margin-top: -300px;
    background-color: #12181f;
  }

  .Collapsible {
    background: #1a232b;
    border-radius: 10px;
    margin: 10px 0;
    transition: background 0.2s;
    letter-spacing: 1.4px;
    .title-div {
      position: relative;
      div {
        transition: 0.4s;
        position: absolute;
        right: 0;
        top: 5px;
      }
    }

    .is-open {
      .title-div {
        div {
          transition: 0.4s;
          transform: rotate(180deg);
        }
      }

      .custom-border {
        position: relative;
        margin-top: 1.1rem;
      }

      .custom-border:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(to right, #7cfa4c 30%, #0ddfff);
        animation: border_anim 0.3s linear forwards;
      }

      @keyframes border_anim {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }
      @keyframes border_anim_reverse {
        0% {
          width: 100%;
        }
        100% {
          width: 0%;
        }
      }
    }
    &:hover {
      background: #28333f;
    }
    .Collapsible__contentOuter,
    .is-open {
      background: #1f2934;
      border-radius: 10px;
    }
    .Collapsible__trigger {
      height: 60px;
      display: block;
      padding: 20px;
      font-size: 20px;
      line-height: 20px;
      font-weight: 600;
    }
    .Collapsible__contentOuter {
      padding: 0 20px;
      font-size: 15px;
      line-height: 22px;
      font-weight: 400;
      letter-spacing: 1.4px;
    }
  }
  .scroll-handle {
    height: 60px;
    width: 470px;
    margin-left: 40px;
    margin-top: -60px;
    background: #161d21;
    position: relative;
    clip-path: polygon(0 0, 90% 0%, 100% 100%, 0% 100%);
    border-top-right-radius: 10px;
  }
  .hero-side-text {
    color: #7cfa4c;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-family: "Archivo";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    text-shadow: 0px 3px 9px #40ba12;
  }
  /* .scroll-handle:before,
	.scroll-handle:after {
		content: "";
		position: absolute;
		height: 10px;
		width: 20px;
		bottom: 0;
	}
  .scroll-handle:before{
    top: -10px;
  }
	.scroll-handle:after {
		right: -20px;
		border-radius: 0 0 0 10px;
		box-shadow: -10px 0 0 0 white;
	}

	.scroll-handle:before {
    background: white;
		left: 0;
		border-radius: 0 0 0 10px;
	} */

  .ve-sb-section {
    margin-top: 10rem;
    margin-bottom: 10rem;
    background: #1a232b;
    border-radius: 8px;
  }

  .supply-circle1 {
    border-color: #1c4e08;
    border-width: 2px;
    border-style: solid;

    border-radius: 50%;
    display: flex; /* or inline-flex */
    align-items: center;
    justify-content: center;
  }
  .supply-6b-text {
  }
  .supply-circle1:hover {
    box-sizing: border-box;
    border: 2px solid;

    background: linear-gradient(0deg, #1f2934, #1f2934),
      linear-gradient(90.02deg, #01a0fc -54.12%, #7cfa4c 101.37%);
    border-color: #7cfa4c;
    transition: all 0.3s ease-out;
    .supply-data-value {
      background: linear-gradient(90.02deg, #01a0fc -54.12%, #7cfa4c 101.37%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .supply-6b-icon {
      display: none;
    }
    .supply-6b-text {
      display: inline-block;
    }
  }

  .supply-data-value {
    color: #ffffff;
    font-family: "Archivo Narrow";
    font-style: normal;
  }
  .supply-data-main {
    margin-bottom: 10rem;
  }
  .vesb-logo {
    width: 3rem;
    height: 3rem;
    background-image: url("https://res.cloudinary.com/drr1rnoxf/image/upload/v1656073008/Polygon_5_udfyts.svg");
  }
`;
