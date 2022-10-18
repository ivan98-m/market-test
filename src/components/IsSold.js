import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import useNFTMarket from "../hooks/useNFTMarket";

function IsSold({ dataSale }) {
    const { account } = useWeb3React();
  const market = useNFTMarket();

  const changeItemStatus = (status) => {
    //console.log(dataSale.itemId);
    market.methods
      .changeItemStatus(dataSale.itemId, status)
      .send({
        from: account,
        //gas: 1000000,
      })
      .on("transactionHash", (txHash) => {
        alert(`Transacción enviada txHash: ${txHash}`);
      })
      .on("receipt", () => {
        alert(`Transaccion Confirmada`);
      })
      .on("error", (error) => {
        alert(`Transacción Fallida`);
      });
  };

  return (
    <>
    {/* {console.log(dataSale)} */}
      {dataSale.isSold ? (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            changeItemStatus(false);
          }}
        >
          Quitar de venta
        </Button>
      ) : (
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            changeItemStatus(true);
          }}
        >
          Volver a venta
        </Button>
      )}
    </>
  );
}

export default IsSold;
