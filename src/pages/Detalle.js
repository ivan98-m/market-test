import React, { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Venta from "../components/Venta";
import { useOwnerForToken } from "../hooks/useNfTData";
import { useWeb3React } from "@web3-react/core";
import { useGetCollection } from "../config/firebase/useGetCollection";


function Detalle() {

  const { account, active } = useWeb3React();

  const parametros = useParams();

  const addressContract = parametros.add;
  const tokenId = parametros.id;

  const { tokenIdOwner, loadingTokenIdOwner } = useOwnerForToken({ addressContract, tokenId })

  const { colArtifacts, loading } = useGetCollection(addressContract);

  const[acc, setAcc] = useState();
  const[contractCollection, setContractCollection] = useState();

  useEffect(()=>{
    //sessionStorage.removeItem("account") 

    if (active){
      let accnt = sessionStorage.getItem("account")
      sessionStorage.setItem("account", account)
      setAcc(accnt)
      //setContractCollection((sessionStorage.contractCollection))
    }
  },[active])

  //const acc = account.toLowerCase();
  const timestamp = new Date().getTime();

  const tiempo = () => {
    const date = new Date(timestamp)
    console.log(date.toString())
    return date.toString()
  }

  return (
    <>
      {!loading && !loadingTokenIdOwner ? (
        <>
          {console.log(tiempo())}
          <Link to="/">Regresar</Link>
          <h2>Detalle token</h2>
          <p2>{tiempo()}</p2>
          <p>Dueño: {account ? (tokenIdOwner === account.toLowerCase() ? 'Tú' : tokenIdOwner) : ('no hay')}</p>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              xs=8
            </Grid>
            <Grid item xs={5}>
              {colArtifacts && colArtifacts.length === 0 ? (
                <h3>Error al cargar db</h3>
              ) : (
                <Venta
                  addressContract={parametros.add}
                  tokenId={parametros.id}
                  tokenIdOwner={tokenIdOwner}
                  abi={colArtifacts}
                />
              )
              }
            </Grid>
          </Grid>
        </>) : (<h1>.... ..</h1>)
      }
    </>
  );
}

export default Detalle;
