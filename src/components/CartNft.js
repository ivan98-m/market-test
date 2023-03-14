import React from "react";

import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import IsSold from "./IsSold";
import Comprar from "./Comprar";

const CartNft = ({ nft, owner }) => {
  const { account } = useWeb3React();

  const address = nft.contract.address;
  //const tokenId = nft.id.tokenId;

  // const tokenId = () => {
  //   const id = nft.id.tokenId.split('')
  //   id.reverse()

  //   let letMap = 0
  //   id.map((item, index) =>  item !== '0' && item !== 'x'  ? letMap=index: '')
  //   //console.log(letMap)
  //   const arrId = id.slice(0,letMap+1)

  //   return arrId.reverse().toString().replace(/,/g, '')
  // }

  //convierte el precio de wei a eters en este caso matic
  const price = Web3.utils.fromWei(nft.dataSale.price, "ether");
  //const contrario = Web3.utils.toWei("0.005", "ether");

  return (
    <Grid item xs={3} sm={4} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea
          component={Link}
          to={ !nft.dataSale.itemId ? `/detailNft/${address}/${nft.tokenId}` : ''}
        >
          <CardMedia
            component="img"
            height="140"
            image={nft.media[0].gateway}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {nft.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          {nft.dataSale.itemId ? (
            <>
              <Typography gutterBottom variant="inherit" component="div">
                {price} MATIC
              </Typography>
              {nft.dataSale.owner === account ? (
                <IsSold 
                dataSale={nft.dataSale}  />
              ) : (

                <Comprar
                dataSale={nft.dataSale}
                />
              )}
            </>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CartNft;
