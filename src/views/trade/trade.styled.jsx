import styled from 'styled-components';
import font from "../../assets/Archivo-Bold.ttf"

export const HeaderText = styled.span`
  font-family: Archivo !important;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.146643px;
  text-transform: uppercase;
  color: #FFFFFF;
`
export const Text = styled.span`
@font-face {
  font-family: 'Archivo';
  src: url(${font}) format('truetype');
  font-weight: 600;
}
font-family: 'Archivo';
  font-style: normal;
  font-weight: ${(props) => (props.weight ? 'bold' : '')};
  font-size: ${(props) => (props.size ? props.size : '14px')};
  line-height: 22px;
  text-transform: ${(props) => (props.transform ? "uppercase" : 'none')};
  letter-spacing:${(props) => (props.spacing ? props.spacing : '0.5px')};;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};
  background: transparent;
  
`

export const CenterP = styled.p`
  min-height: 276.75px;
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;`

export const HoverToolTip = styled.div`
  
  background: none;
  border: 0;
  box-sizing: border-box;    
  font-size: inherit;
  font-weight: 700;
  position: relative;
  vertical-align: middle;

  transition: color 0.25s;
  
  &:hover {
    .tooltip-hover{
      opacity: 1;
    }
    ${({ noColor }) => noColor ? '': `${Text}{
      color : #7cfa4c;
      opacity: 1;
      transition: opacity 0.3s ease,color 0.3s ease;
    }`}
    
  }

  ${({ noColor }) => noColor ? `${Text}:first-child{
      svg{
        min-width:14px;
        width:14px;
      }
    }`: ''}
  /* .tooltip-hover {
    opacity: 0;
    user-select: none;
    transition: opacity 0.3s ease,color 0.3s ease;
    cursor: pointer;
    padding-left: 3px;
    &::after {
      display: inline-block;
      content: "ⓘ";
      font-size: 12px;
      font-weight: bold;
    }
  } */
`
