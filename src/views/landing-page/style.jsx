import styled, {createGlobalStyle} from 'styled-components';

import polygon3 from '../../assets/landing-page/polygon_4.png';




export const GlobalStyle = createGlobalStyle`
body {
 background-color: #161D22; 
}
`


export const Wrapper = styled.div`
.top-div{
  background-color: #1a232b;
margin-left: 40px;
padding-top: 70px;

  .polygen1{
    background-image: url(${polygon3});
    height: 600px;
    background-size: 200px;
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: 75px;
    img{
      position: absolute;
      right: 0;
      top: 80px;
      height: 580px;
      opacity: 0.6;
    }
    .blur{
      filter: blur(40px);
    }
    .custom-row{
      height: 600px;
      .col1{
        padding: 80px 0 0 80px;
        .main-title{
          font-size: 4.2rem;
          font-weight: 600;
          color: white;
          line-height: 5rem;
          span{
            color: #7cfa4c;
            text-shadow: -1px 1px 12px rgb(45 220 10 / 89%)
          }
        }
        .sub-title{
          line-height: 2rem;
          color:#687D95;
          font-size: 1.7rem;
        }
      }
      .col2{
        display: flex;
        align-items: start;
        justify-content: end;
        flex-direction: column;
        text-transform: uppercase;
        letter-spacing: 5px;
        padding: 0 0 90px 120px;
        .sub-title{
          color: #3D4F61;
          font-size: 1.3rem;
          max-width: 18rem;
        }
        .number-text{
          font-size: 56px;
          letter-spacing: 0.340238px;
          text-transform: uppercase;
          background: linear-gradient(89.8deg, #7CFA4C -33.33%, #3997F4 99.82%);
          -webkit-background-clip: text;
	        -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}

  .title-2{
    font-style: normal;
font-weight: 700;
font-size: 45px;
line-height: 34px;
padding: 6rem 0 2rem;
    text-align: center;
  }

  .yielder-below-Q1{
    text-align: center;
    padding: 65px 50px 50px;
  }
  .orHex{
    position: absolute;
  left: calc(50% - 40px);
  z-index: 1;
  }
  .custom-bg-box{
    height: 380px;
    width: 80%;
    margin-top: -300px;
    background-color: #12181F;

  }
`
