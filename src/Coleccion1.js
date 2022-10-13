import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CartNft from "./CartNft1";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
//const dotenv = require('dotenv').config()

const Coleccion = ({ account }) => {
  const contract = "0x3B2f1fA749E4D76609c2f7815e9B9Efd0D2C48FB";
  const apiAlchemy = process.env.REACT_APP_ALCHEMY_KEY_MUMBAI;
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(collection);

  const getData = async (account) => {
    setIsLoading(true);
    const options = { method: "GET" };

    fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&asset_contract_address=${contract
      }&order_direction=desc&offset=0&limit=20&include_orders=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCollection(response.assets);
        console.log(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const [collection1, setCollection1] = useState([]);

  const getMetadataPolygon = async (account) => {
    const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";

    const url = `https://polygon-mumbai.g.alchemy.com/nft/v2/demo/getNFTs?owner=${account}&contractAddresses[]=${contractPolygon}&withMetadata=true`;
    const options = { method: 'GET', headers: { Accept: 'application/json' } };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setCollection1(json.ownedNfts)
        console.log('aaa')
      })
      .catch(err => console.error('error:' + err));

  };

  const getPolygon = async () => {
    const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";
    const contractMetadata = 'getContractMetadata?'

    const url = `${apiAlchemy}/getContractMetadata?contractAddress=${contractPolygon}&withMetadata=true`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(url, options)
    .then((response) => response.json())
      .then((response) => {
        //setCollection(response.assets);
        console.log(response.contractMetadata);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
      
  };

  useEffect(() => {
    // getData(account);
    getPolygon();
    //getMetadataPolygon(account);
  }, [account]);

  // collection1.map(nft => console.log(nft.media[0].gateway));

  return (
    <>
      <div>Direcion de cuenta</div>
      <p>{account}</p>
      {/* <button
                onClick={() => getData(account)}
            >
                Datos
            </button> */}
      <CssBaseline />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Container fixed>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 8, md: 12 }}
          >
            {collection &&
              collection.map((nft) => <CartNft nft={nft} key={nft.token_id} />)}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Coleccion;
