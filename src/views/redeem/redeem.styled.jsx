
import styled, { createGlobalStyle } from 'styled-components';

export const HeaderText = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.146643px;
  text-transform: uppercase;
  color: #FFFFFF;
`
export const Text = styled.span`
  font-family: Archivo;
  font-style: normal;
  font-weight: ${(props) => (props.weight ? 'bold' : '')};
  font-size: ${(props) => (props.size ? props.size : '14px')};
  line-height: 22px;
  text-transform: ${(props) => (props.transform ? "uppercase" : 'non')};
  letter-spacing:0.5px;
  color: ${(props) => (props.color ? props.color : '#FFFFFF')};
  opacity: ${(props) => (props.opacity ? props.opacity : '')};`

export const GlobalStyle = createGlobalStyle`

.swal2-container.swal2-center>.swal2-popup{
  background: #1A232B !important;
  max-width: ${({ maxWidth }) => maxWidth || '100%'} ;
  user-select: none;
}
.swal2-title{
  color: #74EA4D;
  font-size: 1.175em;
  text-transform: uppercase;
}
.swal2-actions{
  width: 100%;
  padding: 0 23px;
  flex-wrap: nowrap;
  .swal2-confirm,.swal2-cancel{
    width: 50%;
    padding: 0.22em 1.1rem;
  }
  .swal2-confirm{
    background-color: #74EA4D;
    border: 3px solid #74EA4D;
    text-transform: uppercase;
    font-weight: 600;
    color: #000000;
    &:focus {
      box-shadow: none;
    }
  }
  .swal2-cancel{
    background-color: transparent;
    border: 3px solid #ffffff;
    text-transform: uppercase;
    font-weight: 600;
    color: #ffffff;
    &:focus {
      box-shadow: none;
    }
    &:hover {
      border: 3px solid #000000;
      color: #000000;
      background-color: #ffffff;
    }
  }
}
.th_span{
  font-family: Archivo;
  font-style: normal;
  font-size: 19px;
  line-height: 22px;
  text-transform: non;
  letter-spacing: 0.5px;
  color: #FFFFFF;
  opacity: 0.75;
}
.td_span{
  font-family: Archivo;
  font-style: normal;
  font-size: 19px;
  line-height: 22px;
  text-transform: non;
  letter-spacing: 0.5px;
  color: #ffffff;
}
.span_green{
  color: #9CF61C;
}
.small_font_td_span{
  font-size: 15px;
}
.table2{
  padding: 0 17px;
}
`
