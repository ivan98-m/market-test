import React from "react";
import { Link, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Venta from "../components/Venta";
import { useOwnerForToken } from "../hooks/useNfTData";
import { useWeb3React } from "@web3-react/core";


function Detalle() {

  const { account } = useWeb3React();
  const parametros = useParams();

  const addressContract = parametros.add;
  const tokenId = parametros.id;

  const {tokenIdOwner, loadingTokenIdOwner} = useOwnerForToken({addressContract, tokenId})

  return (
    <>
      <Link to="/">Regresar</Link>
      <h2>Detalle token</h2>
      <p>Dueño: {tokenIdOwner === account.toLowerCase()? 'Tú': tokenIdOwner}</p>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          xs=8
        </Grid>
        <Grid item xs={5}>
          {loadingTokenIdOwner ? (
            ''
          ):(
            <Venta 
            addressContract={parametros.add} 
            tokenId={parametros.id}
            tokenIdOwner={tokenIdOwner}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Detalle;
