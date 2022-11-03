import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import useNFTMarket from "../hooks/useNFTMarket";

const Comprar = ({ dataSale }) => {
  
	const {account} = useWeb3React();
  const market = useNFTMarket();

  
  const comprar = async (nftContract, itemId, price) => {
    //console.log(`nft contract: ${nftContract} - itemId: ${itemId} consto: ${price} `);
		market.methods.sellItemAndTransferOwnership(nftContract, itemId)
    .send({
			from: account,
      //gas: 1000000,
			value: price,
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
      {/* {console.log(unSold)} */}
      {dataSale.isSold ? (
        <Button 
        variant="contained" 
        color="success"
        onClick={() => {comprar(dataSale.nftContract, dataSale.itemId, dataSale.price)}}
        >
        Comprar
        </Button>
      ):(
        <Button disabled>
        Comprar
        </Button>
      )

      }
    </>
  );
};

//0.0876
//0.0926

export default Comprar;
