import styled from 'styled-components';
import font from "../../assets/FontsFree-Net-Akkurat-Bold.ttf"
import Gilroy from "../../assets/Gilroy-Light.ttf";
import GilroyBold from "../../assets/Gilroy-Bold.ttf";
import Gathom from "../../assets/GothamBook.ttf";

export const HeaderText=styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.146643px;
  text-transform: uppercase;
  color: #FFFFFF;
`


export const NumberText=styled.span`
@font-face {
  font-family: 'Gotham';
  src: url(${Gathom}) format('truetype');
}
font-family: 'Gotham';
font-weight: ${(props) => (props.weight ?  'bold' : '300')};
font-size: ${(props) => (props.size ? props.size : '16px')};
text-transform: ${(props) => (props.transform ? "uppercase" : 'none')};
color: ${(props) => (props.color ? props.color : '#FFFFFF')};
 
`
export const CalibariText=styled.span`
 
font-family: 'Calibri';
font-weight: ${(props) => (props.weight ?  'bold' : '300')};
font-size: ${(props) => (props.size ? props.size : '16px')};
text-transform: ${(props) => (props.transform ? "uppercase" : 'none')};
color: ${(props) => (props.color ? props.color : '#FFFFFF')};
 
`
export const Text=styled.span`
@font-face {
  font-family: 'AkkuratLLWeb-Bold';
  src: url(${font}) format('truetype');
}
font-family: 'AkkuratLLWeb-Bold';
 
  font-weight: ${(props) => (props.weight ?  'bold' : '300')};
  font-size: ${(props) => (props.size ? props.size : '16px')};
  line-height: 22px;
  text-transform: ${(props) => (props.transform ? "uppercase" : 'none')};
  letter-spacing : ${({ letterSpacing }) => letterSpacing || '1px'} ;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
`
export const BtnText=styled.span`
font-family: Archivo;
font-style: normal;
font-weight: ${(props) => (props.weight ?  'bold' : '300')};
font-size: ${(props) => (props.size ? props.size : '14px')};
line-height: 22px;
text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
letter-spacing:1px;
color: ${(props) => (props.color ? props.color : '#FFFFFF')};
opacity: ${(props) => (props.opacity ? props.opacity : '')};
@media (max-width: 639px) {
    font-size: 20px;
}
`

export const TextDoc=styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: ${(props) => (props.weight ?  'bold' : '')};
  font-size: ${(props) => (props.size ? props.size : '14px')};
  line-height: 22px;
  text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
  hover:color
`
export const NewText=styled.strong`
@font-face {
  font-family: 'Gilroy';
  src: url(${Gilroy}) format('truetype');
}
font-family: 'Gilroy';
font-weight: ${(props) => (props.weight ?  'bold' : '')};
font-size: ${(props) => (props.size ? props.size : '30px')};
line-height: 28px;
color:'white';
text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
@media (max-width: 639px) {
  font-size: 20px;
}
`
export const BoldFont=styled.span`
@font-face {
  font-family: 'Gilroy';
  src: url(${GilroyBold}) format('truetype');
}
font-family: ''Gilroy';
font-size: ${(props) => (props.size ? props.size : '30px')};
line-height: 22px;
text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
opacity: ${(props) => (props.opacity ? props.opacity : '')};
@media (max-width: 639px) {
  font-size: 20px;
}
`
 
export const Jupiter=styled.span`
@font-face {
  font-family: 'AkkuratLLWeb-Bold';
  src: url(${font}) format('truetype');
}
font-family: 'AkkuratLLWeb-Bold';
 
  font-weight: ${(props) => (props.weight ?  'bold' : '300')};
  font-size: ${(props) => (props.size ? props.size : '16px')};
  line-height: 22px;
  text-transform: ${(props) => (props.transform ? "uppercase" : 'none')};
  letter-spacing : ${({ letterSpacing }) => letterSpacing || '1px'} ;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
`
 