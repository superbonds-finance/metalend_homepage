import styled, { createGlobalStyle } from 'styled-components';

import polygon3 from '../../assets/Metalend/polygon_3.png';
import bgRectangle from '../../assets/Metalend/bgRectangle.png';
import bgSbFuel from '../../assets/Metalend/bgSbFuel.png';
import { BtnText } from '../home/home.styled';




export const GlobalStyle = createGlobalStyle`
body {
 background-color: #161D22; 
}
`
 

export const AntdTooltip= styled.div`
  .ant-tooltip-inner {
    color: white;
    background: #334150;
    border-radius: 8px;
    text-transform: uppercase;
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    text-align:center;
    margin-top: ${(props) => (props.margin ?  props.margin : '-3rem')};
  }
`;



export const Wrapper = styled.div`
.top-div{
  background-color: #161D23;
  margin-left: 40px;
  padding-top: 70px;
}
@media (max-width: 768px) {
  .top-div{
    margin-left: 15px;
    height: 900px;
  }
}
.sb-fuel-logo{
  width: 40px;
  height: 40px;
}
@media (max-width: 768px) {
  .sb-fuel-logo{
    width: 60px;
    height: 60px;
  }
}
.vesb-text{
  font-family: 'Plus Jakarta Sans';
  font-size: 20px;
  font-weight: 700;
}
.vesb-text1{
font-family: 'Plus Jakarta Sans';
font-style: normal;
font-weight: 500;
font-size: 20px;
text-align: center;
color: #687D95;
}


.sb-market-button{
  border: 1px solid white;
  border-radius: 8px;
}

.sb-logo-text{
  margin-left:2px;
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #FFFFFF;
}
@media (max-width: 768px) {
  .sb-logo-text{
    margin-left:30px;
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 0.3px;
    color: #FFFFFF;
  }
}

 
.icon-desc{
  margin-top:5rem;
}
  .bg-rectangle{
    background-image: url(${bgRectangle});
    height: 600px;
    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: contain;
    // width: 100%;
    // background-position-x: right;
    background-position-y: 90px;
    .blur1{
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 100%;
    }
  }
  .bg-lender{
    background-image: url(${bgRectangle});
    height: 600px;
    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: contain;
    // width: 100%;
    // background-position-x: right;
    //background-position-y: 90px;
    .blur1{
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 100%;
    }
  }

  .bg-lender-pro{
    background-image: url(${bgRectangle});
    
    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    // width: 100%;
    // background-position-x: right;
    //background-position-y: 90px;
    .blur1{
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 100%;
    }
  }

  .bg-sb-fuel{
    background-image: url(${bgSbFuel});
  
    // background-size: 200px;
    background-repeat: no-repeat;
    background-size: contain;
    // width: 100%;
    // background-position-x: right;
    //background-position-y: 90px;
    .blur1{
      position: absolute;
      // left: 25px;
      // height: 600px;
      width: 100%;
    }
  }
  .polygen1{
    // background-image: url(${polygon3});
    height: 600px;
    // background-size: 200px;
    // background-repeat: no-repeat;
    // background-sizeo: contain;
    // width: 100%;
    // background-position-x: right;
    // background-position-y: 75px;
    .blur1{
      position: absolute;
      left: 25px;
      height: 600px;
      width: 100%;
    }
    .blur{
      position: absolute;
      top: 25%;
      right: 0px;
      height: 600px;
      width: 100%;
    }

    .custom-row{
      height: 600px;
      .col1{
        padding: 80px 0 0 80px;
        .main-title{
          font-weight: 500;
          font-size: 82px;
          line-height: 62px;
          letter-spacing: -1px;
          background-image: linear-gradient(90.09deg, #01FCFC, #0085FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          width: fit-content;
        }
        @media (max-width: 768px) {
          .main-title{
            font-size: 3.5rem;
            line-height: 4rem;
            padding-bottom: 10px;
          }
        }
        .sub-title{
          line-height: 2rem;
          color:#FFFFFF;
          font-size: 1.2rem;
        }
      }
      @media (max-width: 768px) {
        .col1{
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
  @media (max-width: 768px) {
    .polygen1{
      // background-image: url(${polygon3});
      // background-sizeo: cover;
    // background-size: 170px;
    // height: 600px;
    // background-position-x: right;
    // background-position-y: 190px;
      .blur1{
        position: absolute;
        left: 15px;
        height: 600px;
        width: 100%;
      }
      .blur{
        // position: absolute;
        // left: 10px;
      }
    }
  }
}

.supply-data{
  margin:3rem 0rem;
}

  .title-2{
    font-style: normal;
font-weight: 700;
font-size: 25px;
line-height: 34px;
font-family: 'Plus Jakarta Sans';
    text-align: center;
  }
  
  .supply-text{
    font-weight: 500;
    font-size: 52px;
    line-height: 47px;
    letter-spacing: -1px;
    background-image: linear-gradient(90.09deg, #01FCFC, #0085FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  .grad-border{
    background:linear-gradient(269.54deg, #01C0FC 0.15%, #0085FF 96.26%);
    border-radius:2rem;
 border-width:1rem;
   width:160px;
 
  }
  
   .sb-fuel-button{
    background: rgba(1, 192, 252, 0.3);
 
    text-align: center;
   
   margin:10px;
 width:100%;
 
   }

    
  .sb-fuel-text{
    font-weight: 500;
    font-size: 52px;
    line-height: 47px;
    letter-spacing: -1px;
    background-image: linear-gradient(90.09deg, #01FCFC, #0085FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
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
  .sb-fuel-Q1{
    text-align: center;
    padding: 65px 50px 50px;
    clip-path: polygon(0 0,186% 0,0 186%);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 56.83%, rgba(1, 192, 252, 0.2) 103.83%), #1A232B;
  }
  .yielder-below-Q2{
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 56.83%, rgba(117, 233, 71, 0.2) 103.83%), #1A232B;
    clip-path: polygon(100% 0,100% 100%,14% 100%,0 86%,0 0);
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
  .lender-button-1{
    background: rgba(23, 133, 168, 0.3);
    border-radius: 6px;
    border: 2px solid;

border-image-source: linear-gradient(269.54deg, #01C0FC 0.15%, #0085FF 96.26%);


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
    margin-top: -60px;
    background: #161d21;
    position: relative;
    clip-path: polygon(0 0, 90% 0%, 100% 100%, 0% 100%);
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

  .ve-sb-section{
    margin-top:10rem;
    margin-bottom:10rem;
    background: #1A232B;
    border-radius: 8px;
    }

    .supply-circle1{
      border-color: #1c4e08;
      border-width:2px;
      border-style: solid;
     
      border-radius: 50%;
      display: flex; /* or inline-flex */
      align-items: center; 
      justify-content: center;
    }
    .supply-6b-text{
       
    }
    .supply-circle1:hover{
    
      box-sizing: border-box;
      border: 2px solid;
 
      background: linear-gradient(0deg, #1F2934, #1F2934),
      linear-gradient(90.02deg, #01A0FC -54.12%, #7CFA4C 101.37%);
      border-color:#7CFA4C;
      transition: all 0.3s ease-out;
      .supply-data-value{
        background: linear-gradient(90.02deg, #01A0FC -54.12%, #7CFA4C 101.37%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
      .supply-6b-icon{
        display:none;
      }
      .supply-6b-text{
        display:inline-block;
      }
       
    } 
   
    .supply-data-value{
      color: #FFFFFF
      font-family: 'Archivo Narrow';
      font-style: normal;
    }
    .supply-data-main{
      margin-bottom:10rem;
    }
    .vesb-logo{
    width:3rem;
    height:3rem;
      background-image: url("https://res.cloudinary.com/drr1rnoxf/image/upload/v1656073008/Polygon_5_udfyts.svg");
    }
    
     
   
    
`
