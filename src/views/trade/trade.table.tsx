import React from "react";
import { notify } from "../../utils/notifications";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CenterP, Text} from "./trade.styled";
import { Link } from "react-router-dom";
import {  truncateStr,convertTimeStamp} from "../../utils/utils";
import {
    POOL_30_ADDRESS
  } from "../../utils/ids";
export const TradeTableComponent: React.FC<{ tradeType: string ,data: Array<string>,onSettle:Function}> = ({ tradeType,data,onSettle}) => {

    const CopyAction=()=>{
        notify({
          message: 'Copied Successfully!',
          type: "success",
        });
      }

    if (tradeType ==="all_trade")
    return (
        <div>
            <table className="w-full block overflow-x-auto " style={{"borderCollapse":"separate","borderSpacing":data && data.length>0?'0px 4px':'0px 0px',"borderRadius":"1.5em","maxHeight":"337px","minHeight":/* data && data.length>0?  */"380px"/* :"100px" */,"backgroundColor":data && data.length>0?"#1a232b": "#28333F"}}>
                <tr className="bg-gray-300 ">
                    <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Pool</Text></th>
                    <th className="sticky-header py-2 px-4  text-center min-w-td"><Text opacity='0.5' size='13px'>Trade Owner</Text></th>
                    <th className="sticky-header py-2 px-4  text-center min-w-td"><Text opacity='0.5' size='13px'>NFT Account</Text></th>
                    <th className="sticky-header py-2 px-4 text-center min-w-td"><Text opacity='0.5' size='13px'>Trade Account</Text></th>
                    <th className="sticky-header py-2 px-4 text-center "><Text opacity='0.5' size='13px'>Yield</Text></th>
                    <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Issued at</Text></th>
                    <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Maturity</Text></th>
                    <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Value at Entrance</Text></th>
                    <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Value at Maturity</Text></th>
                    <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Current Bond Value</Text></th>
                    <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Profit at Maturity</Text></th>
                    <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Current Profit</Text></th>
                </tr>

                {data && data.length>0 && data.map((value:any,key:any)=>{
                    return <>
                        <tr className="bg-gray-200">
                            <td className="py-2 px-2 text-blue-100 text-center "><Text  size='13px'>{value.pool}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><a className='text-blue-100 hover:text-blue-100' target="_blank" href={"https://explorer.solana.com/address/"+value.trade_owner+"?cluster=devnet"}>{truncateStr(value.trade_owner,3)}</a>
                                <CopyToClipboard onCopy={CopyAction}  text={value.trade_owner}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                            </td>
                            <td className="py-2 px-2 text-blue-100 text-center min-w-td"><a className='text-blue-100 hover:text-blue-100'  target="_blank" href={"https://explorer.solana.com/address/"+value.nft+"?cluster=devnet"}>{truncateStr(value.nft,3)}</a>
                                <CopyToClipboard onCopy={CopyAction}  text={value.nft}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                            </td>
                            <td className="py-2 px-2 text-blue-100 text-center"><a className='text-blue-100 hover:text-blue-100' href={"#/redeem/"+value.trade_account}>{truncateStr(value.trade_account,3)}</a>
                                <CopyToClipboard onCopy={CopyAction}  text={value.trade_account}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                            </td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text color='#7CFA4C'  size='13px'>{parseFloat(value.yield) < 0 ? <span style={{color:"red"}}>{parseFloat(value.yield).toFixed(2)}%</span> : <span style={{color:"green"}}>{parseFloat(value.yield).toFixed(2)}%</span>}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{convertTimeStamp(value.issued_at)}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{convertTimeStamp(value.maturity_at)}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.bond_value).toFixed(1)}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.bond_value_maturity).toFixed(1)}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.current_bond_value).toFixed(1)}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text color='#7CFA4C'  size='13px'>{parseFloat(value.profit_loss_maturity) < 0 ? <span style={{color:"red"}}>{parseFloat(value.profit_loss_maturity).toFixed(1)}</span> : <span style={{color:"green"}}>{parseFloat(value.profit_loss_maturity).toFixed(1)}</span>}</Text></td>
                            <td className="py-2 px-2 text-blue-100 text-center"><Text color='#F23838'  size='13px'>{parseFloat(value.current_profit_loss) < 0 ? <span style={{color:"red"}}>{parseFloat(value.current_profit_loss).toFixed(1)}</span> : <span style={{color:"green"}}>{parseFloat(value.current_profit_loss).toFixed(1)}</span>}</Text></td>
                        </tr>
                    </>
                })}
                {data && data.length==0 &&
                    <tr className="bg-gray-200 my-2" >
                        <td className="text-center font-medium text-green-100 font-bold" colSpan={13}>
                            <CenterP>No Data Found</CenterP>
                        </td>
                    </tr>
                }
            </table>
        </div>)

    if (tradeType ==="my_trade")
    return (<div>
        <table className="w-full block overflow-x-auto " style={{"borderCollapse":"separate","borderSpacing":data && data.length>0?'0px 4px':'0px 0px',"borderRadius":"1.5em","maxHeight":"450px","minHeight":/* data && data.length>0?  */"380px"/* :"100px" */,"backgroundColor":data && data.length>0?"#1a232b": "#28333F"}}>
            <tr className="bg-gray-300 ">
                <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Redeem</Text></th>
                <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Pool</Text></th>
                <th className="sticky-header py-2 px-4  text-center min-w-td"><Text opacity='0.5' size='13px'>Trade Owner</Text></th>
                <th className="sticky-header py-2 px-4  text-center min-w-td"><Text opacity='0.5' size='13px'>NFT Account</Text></th>
                <th className="sticky-header py-2 px-4 text-center min-w-td"><Text opacity='0.5' size='13px'>Trade Account</Text></th>
                <th className="sticky-header py-2 px-4 text-center "><Text opacity='0.5' size='13px'>Yield</Text></th>
                <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Issued at</Text></th>
                <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Maturity</Text></th>
                <th className="sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Value at Entrance</Text></th>
                <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Value at Maturity</Text></th>
                <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Current Bond Value</Text></th>
                <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Profit at Maturity</Text></th>
                <th className="sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Current Profit</Text></th>
            </tr>

            {data && data.length>0 && data.map((value:any,key:any)=>{
                return <>
                    <tr className="bg-gray-200">
                    <td className="py-2 px-4 text-blue-100">
                        {value.redeem ? <Link to={"/redeem/"+value.redeem}>
                            <button className="bg-green-100 rounded-md py-1 px-5"><Text color='black' transform='true' weight='true' size='11px'>Reedeem</Text></button>
                            </Link> : null
                        }
                    </td>
                        <td className="py-2 px-2 text-blue-100 text-center "><Text  size='13px'>{value.pool}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><a className='text-blue-100 hover:text-blue-100' target="_blank" href={"https://explorer.solana.com/address/"+value.trade_owner+"?cluster=devnet"}>{truncateStr(value.trade_owner,3)}</a>
                            <CopyToClipboard onCopy={CopyAction}  text={value.trade_owner}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>
                        <td className="py-2 px-2 text-blue-100 text-center min-w-td"><a className='text-blue-100 hover:text-blue-100'  target="_blank" href={"https://explorer.solana.com/address/"+value.nft+"?cluster=devnet"}>{truncateStr(value.nft,3)}</a>
                            <CopyToClipboard onCopy={CopyAction}  text={value.nft}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>
                        <td className="py-2 px-2 text-blue-100 text-center"><a className='text-blue-100 hover:text-blue-100' href={"#/redeem/"+value.trade_account}>{truncateStr(value.trade_account,3)}</a>
                            <CopyToClipboard onCopy={CopyAction}  text={value.trade_account}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text color='#7CFA4C'  size='13px'>{parseFloat(value.yield) < 0 ? <span style={{color:"red"}}>{parseFloat(value.yield).toFixed(2)}%</span> : <span style={{color:"green"}}>{parseFloat(value.yield).toFixed(2)}%</span>}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{convertTimeStamp(value.issued_at)}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{convertTimeStamp(value.maturity_at)}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.bond_value).toFixed(1)}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.bond_value_maturity).toFixed(1)}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{parseFloat(value.current_bond_value).toFixed(1)}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text color='#7CFA4C'  size='13px'>{parseFloat(value.profit_loss_maturity) < 0 ? <span style={{color:"red"}}>{parseFloat(value.profit_loss_maturity).toFixed(1)}</span> : <span style={{color:"green"}}>{parseFloat(value.profit_loss_maturity).toFixed(1)}</span>}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text color='#F23838'  size='13px'>{parseFloat(value.current_profit_loss) < 0 ? <span style={{color:"red"}}>{parseFloat(value.current_profit_loss).toFixed(1)}</span> : <span style={{color:"green"}}>{parseFloat(value.current_profit_loss).toFixed(1)}</span>}</Text></td>
                    </tr>
                </>
            })}
            {data && data.length==0 &&
                <tr className="bg-gray-200 my-2" >
                    <td className="text-center font-medium text-green-100 font-bold" colSpan={13}>
                    <CenterP>No Data Found</CenterP>
                    </td>
                </tr>
            }
        </table>
    </div>)

    if (tradeType ==="my_pending_trade")
    return (
        // <div className="overflow-x-auto w-full h-full" style={{"borderRadius":"1.5em"}}>
        <div>
        <table className="w-full block overflow-x-auto" style={{"borderRadius":"1.5em","borderCollapse":"separate","borderSpacing":data && data.length>0?'0px 4px':'0px 0px',"maxHeight":"370px","minHeight":/* data && data.length>0?  */"380px"/* :"100px" */,"backgroundColor":data && data.length>0?"#1a232b": "#28333F"}}>
            <tr className="bg-gray-300 ">
                <th className="th-width-auto-calc sticky-header py-2 px-4 text-center"><Text opacity='0.5' size='13px'>Pool</Text></th>
                <th className="th-width-auto-calc sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Owner</Text></th>
                <th className="th-width-auto-calc sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>USDC Account</Text></th>
                <th className="th-width-auto-calc sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Amount</Text></th>
                <th className="th-width-auto-calc sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Request Time</Text></th>
                <th className="th-width-auto-calc sticky-header py-2 px-4  text-center"><Text opacity='0.5' size='13px'>Redemption Data Account</Text></th>

            </tr>
            {data && data.length>0 && data.map((value:any,key:any)=>{
                return <>
                    <tr className="bg-gray-200">
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{value.pool == POOL_30_ADDRESS.toBase58() ? "30-day" : "90-day"}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center">{truncateStr(value.owner,7)}
                            <CopyToClipboard onCopy={CopyAction}  text={value.owner}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>
                        <td className="py-2 px-2 text-blue-100 text-center">{truncateStr(value.usdc_account,7)}
                            <CopyToClipboard onCopy={CopyAction}  text={value.usdc_account}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{value.amount}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center"><Text  size='13px'>{convertTimeStamp(value.requested_at)}</Text></td>
                        <td className="py-2 px-2 text-blue-100 text-center">{truncateStr(value.data_account,7)}
                            <CopyToClipboard onCopy={CopyAction}  text={value.data_account}><i className="far fa-clone cursor-pointer  fa-s ml-1" aria-hidden="true" style={{color:"#7cfa4d"}}></i></CopyToClipboard>
                        </td>

                    </tr>
                </>
            })}
            {data && data.length==0 &&
                <tr className="bg-gray-200 my-2" >
                    <td className="text-center font-medium text-green-100 font-bold" colSpan={7}>
                    <CenterP>No Data Found</CenterP>
                    </td>
                </tr>
            }
        </table>
        </div>
    )
    return null;

}
