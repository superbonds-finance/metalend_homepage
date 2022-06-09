import styled from 'styled-components';
import { BtnText } from '../../views/home/home.styled';

export const Wrapper = styled.div`

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
      width: 11rem !important;
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
`
