import styled from 'styled-components';

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
export const Text=styled.span`
font-family: Archivo;
font-style: normal;
 
font-size: ${(props) => (props.size ? props.size : '15px')};;
line-height: 22px;
align-items: center;
text-align: center;
text-transform: ${(props) => (props.transform ?  "uppercase" : 'none')};;
letter-spacing:1px;
color: ${(props) => (props.color ? props.color : '#FFFFFF')};
opacity: ${(props) => (props.opacity ? props.opacity : '')};
@media (max-width: 1430px) {
    font-size: 12px;
}
@media (max-width: 320px) {
    font-size: 11px;
}
`