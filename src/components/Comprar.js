import { Box, Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useState } from "react";
import useNFTMarket from "../hooks/useNFTMarket";

const Comprar = ({ contract}) => {
  const [unSold, setUnSold] = useState([]);
  const market = useNFTMarket();
	const {account} = useWeb3React()

  const getUnsoldItems = useCallback(async () => {
    if (market) {
      const result = await market.methods.getUnsoldItems().call().then();
      console.log(result[0].seller);
      setUnSold(result)
    }
  }, [market]);

  useEffect(() => {
    getUnsoldItems();
  }, [getUnsoldItems]);

  const comprar = async () => {
    console.log("comprar");

		market.methods.sellItemAndTransferOwnership(contract, 3)
    .send({
			from: account,
      gas: 1000000,
			value: 5000000000000000,
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
    <Box>
      {console.log(unSold)}
      <p>{account}</p>
      {unSold && unSold.map((atributo) => (
        <p
          key={atributo.itemId}
        >{`Item Nº: ${atributo.itemId} tokenId: ${atributo.tokenId}`}</p>
      ))}

      <Button variant="contained" onClick={comprar}>
        Comprar
      </Button>
    </Box>
  );
};

//0.0876
//0.0926

export default Comprar;
