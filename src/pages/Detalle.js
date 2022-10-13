import React from "react";
import { Link, useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Grid } from "@mui/material";
import Venta from "../components/Venta";


function Detalle() {
  const { account } = useWeb3React();
  const parametros = useParams();


  return (
    <>
      {console.log(account)}
      <Link to="/">Regresar</Link>
      <h2>Detalle tokenk</h2>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          xs=8
        </Grid>
        <Grid item xs={5}>
          <Venta address={parametros.add} tokenId={parametros.id}/>
        </Grid>
      </Grid>
    </>
  );
}

export default Detalle;
