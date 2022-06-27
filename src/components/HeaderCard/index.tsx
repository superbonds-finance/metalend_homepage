import React from "react";
import { HeaderText, Text,SmallText } from "../../views/trade/trade.styled";
import { numberFormatter, formatNumberWithoutRounding } from "../../utils/utils";
import { Tooltip } from "antd";
import { ImInfo } from "react-icons/im";

export const HeaderCard = (props: {
  text: string;
  isHover:string,
  divStyle: string;
  USDCbalance: React.ReactElement;
  SuperBbalance: React.ReactElement;
}) => {
  return (
    <div className={'flex pt-4 justify-between sm:flex-col' + props.divStyle}>
      {!!props.text  && !props.isHover && <div><HeaderText>{props.text}</HeaderText></div>}
      {!!props.isHover && props.isHover && <div>
        <HeaderText className='text-grid cursor-pointer'>Liquidity <span>&nbsp;</span>Providers<SmallText>(LPs)</SmallText>
          <Tooltip placement="rightTop" title={'LPs, by committing capital to a pool, will provide the interest payable to FD purchasers. In exchange, they will be eligible to earn varying streams of variable yield. LPs must stake LP tokens to earn yield'}> 
          <ImInfo  className='info-circle ml-0.5'  style={{width:"16px", marginBottom:"12px"}} /></Tooltip>
      </HeaderText></div>}
      <div className="flex sm:flex-wrap gap-2">
        <div className="py-2 pl-2 pr-14 md:pr-3 rounded-md" style={{ maxWidth: '190px', width: '190px', 'background': ' linear-gradient(89.52deg, rgba(124, 250, 76, 0.1) 15.18%, rgba(124, 250, 76, 0) 76.06%), #1F2933' }}>
          <Text className='block' size="12px" opacity="0.5">USDC Balance:</Text>
          <Text>{formatNumberWithoutRounding.format(parseFloat(props.USDCbalance.toString()))}</Text>
        </div>
        <div className="py-2 pl-2 pr-14 md:pr-3 rounded-md" style={{ maxWidth: '190px', width: '190px', 'background': ' linear-gradient(89.52deg, rgba(124, 250, 76, 0.1) 15.18%, rgba(124, 250, 76, 0) 76.06%), #1F2933' }}>
          <Text className='block' size="12px" opacity="0.5">SB Balance:</Text>
          <Text>{numberFormatter.format(parseFloat(props.SuperBbalance.toString()))}</Text>
        </div>
      </div>
    </div>
  );
};


