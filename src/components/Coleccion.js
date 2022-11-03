import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CartNft from "./CartNft";
import Container from "@mui/material/Container";
import useNFTMarket from "../hooks/useNFTMarket";
//const dotenv = require('dotenv').config()

const Coleccion = ({ nfts, owner = false }) => {

  /**
   * Se debe filtrar ya que por alguna razon cuando se pone a la venta ese token id
   * se vuelve a registrar en el contrato de la coleccion
   */
  const tabla = {};
  const nftfilter = nfts.filter((nft) => {
    return tabla[nft.id.tokenId] ? false : tabla[nft.id.tokenId] = true;
  })

  const market = useNFTMarket();
  const [unSold, setUnSold] = useState([]);
  const [loading, setLoading] = useState(true);


  const contractAddress = nfts[0].contract.address;
  //const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";

  const getUnsoldItems = useCallback(async () => {
    setLoading(true);
    if (market) {
      //const result = await market.methods.getUnsoldItems().call().then();
      console.log(market.methods)
      const result = await market.methods.getUnSoldForContract(contractAddress).call().then();
      console.log(result);
      setUnSold(result);
      setLoading(false)
    }
  }, [market]);

  useEffect(() => {
    getUnsoldItems();
  }, [getUnsoldItems]);

  const tokenId = (tokenId) => {
    const id = tokenId.split('')
    id.reverse()

    let letMap = 0
    id.map((item, index) => item !== '0' && item !== 'x' ? letMap = index : '')
    //console.log(letMap)
    const arrId = id.slice(0, letMap + 1)

    return arrId.reverse().toString().replace(/,/g, '')
  }

  const nftsUnSold = nftfilter.map((nft) => {
    let sellerOwner = '', itemMarket = '', valor = '';
    let addContract = '', estado = true;
    let id = tokenId(nft.id.tokenId);
    unSold.forEach(element => {
      if (element.tokenId === id) {
        sellerOwner = element.seller;
        itemMarket = element.itemId;
        valor = element.price;
        estado = element.isSold;
        addContract = element.nftContract;
      }
    })
    return ({ 
      ...nft, 
      tokenId: id, 
      dataSale: { 
        nftContract: addContract,
        owner: sellerOwner, 
        itemId: itemMarket, 
        price: valor, 
        isSold: estado 
      } 
    })
  })

  return (
    <>
      {console.log(nftsUnSold)}
      <Container fixed>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {!loading ?
            (nftsUnSold.map((nft) =>
              <CartNft
                key={nft.id.tokenId}
                nft={{ ...nft, hola: 'ivan' }}
                onSale={unSold}
                owner={owner}
              />
            )) : (
              console.log('no')
            )}
        </Grid>
      </Container>
    </>
  );
};

export default Coleccion;
