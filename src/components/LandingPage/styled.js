import styled from 'styled-components';
import { BtnText } from '../../views/home/home.styled';

export const Wrapper = styled.div`

.btn-hover-width {
  svg {
    color: #ffffff;
    font-size: 1.15rem;
    position: absolute;
    /* right: -5px;
      top: 12px; */
    opacity: 0;
    display: none;
  }


  &:hover {
    span {
      width: 12rem !important;
      margin-left: -16px;
    }
    svg {
      display: block;
      right: 12px;
    top: 15px;
      animation-name: animation2;
      animation-duration: 0.6s;
      opacity: 1;
    }
  }
}


button.learn-more-2 {
  position: relative;
  border: 3px solid transparent;
  border-radius: 6px;
  width: 10.2rem;
  @media screen and (min-width :1536px) {
    width: 10.2rem;
  }
  padding: 8px;
  margin-right: 20px;
  @media (max-width: 1536px) {
    width: 10.2rem;
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
  width: 10.2rem;
  @media screen and (min-width :1536px) {
    width: 10.2rem;
    max-width: 10.2rem;
  }
  padding: 8px;
  @media (max-width: 1536px) {
    width: 10.2rem;
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
`
