import styled from 'styled-components';
import font from "../../assets/FontsFree-Net-Akkurat-Bold.ttf";
import Gilroy from "../../assets/Gilroy-Light.ttf";
//import GilroyBold from "../../assets/Gilroy-Bold.ttf";
import GilroyBold from "../../assets/Gilroy-ExtraBold.ttf";
export const Text=styled.span`
@font-face {
  font-family: 'AkkuratLLWeb-Bold';
  src: url(${font}) format('truetype');
}
font-family: 'AkkuratLLWeb-Bold';
 
  font-weight: ${(props) => (props.weight ?  'bold' : '300')};
  font-size: ${(props) => (props.size ? props.size : '24px')};
  line-height: 22px;
  text-transform: ${(props) => (props.transform ? "uppercase" : 'none')};
  letter-spacing : ${({ letterSpacing }) => letterSpacing || '1px'} ;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
  @media (max-width: 639px) {
    font-size: 20px;
}
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
    font-size: 12px;
}
`

export const TextDoc=styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: ${(props) => (props.weight ?  'bold' : '')};
  font-size: ${(props) => (props.size ? props.size : '24px')};
  line-height: 22px;
  text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
  @media (max-width: 639px) {
    font-size: 20px;
}
`
 
export const NewText=styled.span`
@font-face {
  font-family: 'Gilroy';
  src: url(${Gilroy}) format('truetype');
}
font-family: 'Gilroy';
font-weight: ${(props) => (props.weight ?  'bold' : '')};
font-size: ${(props) => (props.size ? props.size : '22px')};
line-height: 22px;
color: ${(props) => (props.color ? props.color : '#FFFFFF')};
text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
opacity: ${(props) => (props.opacity ? props.opacity : '')};
@media (max-width: 1470px) {
  font-size: 20px;
}
`
export const NewButtonText=styled.span`
@font-face {
  font-family: 'Gilroy';
  src: url(${Gilroy}) format('truetype');
}
font-family: 'Gilroy';
font-weight: ${(props) => (props.weight ?  'bold' : '')};
font-size: ${(props) => (props.size ? props.size : '22px')};
line-height: 22px;
text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
opacity: ${(props) => (props.opacity ? props.opacity : '')};
@media (max-width: 1470px) {
  font-size: 20px;
}
`

export const Bold=styled.span`
@font-face {
  font-family: 'Gilroy-ExtraBold';
  src: url(${GilroyBold}) format('truetype');
}
font-family: 'Gilroy-ExtraBold';
font-weight: ${(props) => (props.weight ?  '900' : '')};
font-size: ${(props) => (props.size ? props.size : '28px')};
line-height: 22px;
text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
opacity: ${(props) => (props.opacity ? props.opacity : '')};
@media (max-width: 639px) {
  font-size: 20px;
}
`
 