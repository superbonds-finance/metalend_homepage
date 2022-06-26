import styled, { createGlobalStyle } from 'styled-components';

import polygon3 from '../../assets/landing-page/polygon_4.png';
import { BtnText } from '../home/home.styled';




export const GlobalStyle = createGlobalStyle`
body {
 background-color: #161D22; 
}
`


export const Wrapper = styled.div`
.fd-header{
    padding-top: 70px;
}
.fd-details{
    margin-top:5rem;
    margin-bottom:10rem;
}
.fd-header-text{
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 45px;
    line-height: 52px;
    /* or 102% */
    
    display: flex;
    align-items: center;
    display: inline-block;
    color: #FFFFFF;
}
.fd-sub-header{
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    display: inline-block;
    letter-spacing: 0.3px;
    color: #687D95;
    margin-top:0.5rem;
}
.fd-desc-header{
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 44px;
    text-shadow: 0px 3px 9px #40BA12;
    color:#7CFA4C;
}
.fd-desc-text{
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 27px;
    letter-spacing: 0.3px;
    color: #ABBDD1;
    text-align:left;
    user-select:none;
}
.top-div-fd{
background-color: #1a232b;
margin-left: 40px;
padding-top: 70px;
 
}
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
font-size: 43px;
line-height: 34px;
padding: 6rem 0 2rem;
    text-align: center;
  }

  .title-3{
    font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 34px;
padding: 6rem 0 2rem;
    text-align: center;
  }
  .title-4{
    font-size: 14px;
    color: #687D95;
    text-transform: uppercase;
    text-align: center;
  }

  .yielder-below-Q1,.yielder-below-Q2{
    text-align: center;
    padding: 65px 50px 50px;
  }
  .yielder-below-Q2{
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 56.83%, rgba(117, 233, 71, 0.2) 103.83%), #1A232B;
    clip-path: polygon(100% 0,100% 100%,14% 100%,0 86%,0 0);
  }
  .fd-desc-bg{
    text-align: center;
    padding: 65px 50px 50px;
    clip-path: polygon(0 0,195% 0,0 195%);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 56.83%, rgba(117, 233, 71, 0.2) 103.83%), #161D23;
  }

  .btn-hover-width{
    svg{
    color: white;
    font-size: 1.5rem;
    position: absolute;
    right: -30px;top:-4px;
    opacity: 0;
  }

@keyframes animation2 {
  0% {right: -30px;top:-4px;}
  10% {right: -5px;top: 12px;}
  100% {right: -30px;top:-4px;}
  }

  &:hover{
    width: 12rem !important;
    svg{
      animation-name: animation2;
    animation-duration: 0.3s;
    opacity: 1;
    }
  }
  } 

  .button-hover-change{
    /* background: linear-gradient(0deg, #7CFA4C, #7CFA4C), #1F2933;
    transition: background 5s; */

  position: relative;
  background-color: #7CFA4C;
  background-image: linear-gradient(0deg, #7CFA4C, #7CFA4C), #1F2933;
  z-index: 1;
  transition: width 0.1s ease-in-out;

  

    &:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.3em;
  background-image: linear-gradient(to right,#7cfa4c 30%, #0ddfff);
  transition: opacity 0.5s ease-out;
  z-index: 2;
  opacity: 0;
}
&:hover:after {
  opacity: 1;
}
${BtnText}{
  position: relative;
  z-index: 3;
}

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


  .Collapsible{
    background: #1a232b;
    border-radius: 10px;
    margin: 10px 0;
    transition: background 0.2s;
    letter-spacing: 1.4px;
    .title-div{
      position: relative;
      div{
        transition: 0.4s;
        position: absolute;
    right: 0;
    top: 5px;

      }
    }
    
    .is-open{

      .title-div{
      div{
        transition: 0.4s;
        transform: rotate(180deg);
      }
    }

      .custom-border{
	  position: relative;
    margin-top: 1.1rem;
}

.custom-border:before{
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	width: 0;
  height: 1px;
	background: linear-gradient(to right,#7cfa4c 30%, #0ddfff);;
	animation: border_anim 0.3s linear forwards;
}

@keyframes border_anim {
	0%{
		width: 0%;
	}
	100%{
		width: 100%;
	}
}
@keyframes border_anim_reverse {
	0%{
		width: 100%;
	}
	100%{
		width: 0%;
	}
}
    }
    &:hover{
      background: #28333F;
    }
    .Collapsible__contentOuter,.is-open{
      background: #1F2934;
      border-radius: 10px;
    }
    .Collapsible__trigger{
      height: 60px;
      display: block;
      padding: 20px;
      font-size: 20px;
      line-height: 20px;
      font-weight: 600;
    }
    .Collapsible__contentOuter{
      padding: 0 20px;
      font-size: 15px;
      line-height: 22px;
      font-weight: 400;
      letter-spacing: 1.4px;
    }
  }
  .scroll-handle{
    height: 60px;
    width: 470px;
    margin-left: 40px;
    margin-bottom:-50px;
    background: #161d21;
    position: relative;
    clip-path: polygon(0 0, 100% 0%, 83% 100%, 0% 100%);
    border-top-right-radius: 10px;
  }
   .hero-side-text{
      color:#7CFA4C;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-family: 'Archivo';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      text-shadow: 0px 3px 9px #40BA12;
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
`
