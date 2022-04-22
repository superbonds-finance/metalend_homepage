import React from "react";
import { notification } from "antd";
// import Link from '../components/Link';
const antdNotification = {
  color: "white",
  backgroundColor: "linear-gradient(180deg, #90D62C 0%, #5C8F13 100%)",
  fontFamily: "Bai Jamjuree"
};

export function notify({
  message = "",
  description = undefined as any,
  txid = "",
  type = "info",
  placement = "bottomLeft"
}) {
  if (txid) {
    //   <Link
    //     external
    //     to={'https://explorer.solana.com/tx/' + txid}
    //     style={{ color: '#0000ff' }}
    //   >
    //     View transaction {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
    //   </Link>

    description = <></>;
  }
  (notification as any)[type]({
    message: <span style={{ color: "white" ,fontFamily:"Bai Jamjuree",}}><strong>{message}</strong></span>,
    description: (
      <span style={{ color: "white", opacity: 0.5 ,fontFamily:"Bai Jamjuree"}}>{description}</span>
    ),
    placement,
    className:{antdNotification},
    style: {
      backgroundColor: "#007500",
    },
    duration: 10,

  });
}
