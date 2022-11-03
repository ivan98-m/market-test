import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useNFTMarket from "../hooks/useNFTMarket";
import { useWeb3React } from "@web3-react/core";
import { useGetCollection } from "../config/firebase/useGetCollection";
import { useContract } from "../hooks/useContract"

import NFTMarketArtifacts from "../config/artifacts/NFTMarket";
import getABI from "../config/firebase/getABI";


function Venta({ addressContract, tokenId, tokenIdOwner }) {

  const { account } = useWeb3React()

  const market = useNFTMarket()

  
  const { colArtifacts, loading } =  useGetCollection(addressContract) ;
  
  //const colect = useContract(NFTMarketArtifacts)

  const abi = async() =>{
    const colAbi = await getABI(addressContract);
    const abidb = Object.values(colAbi.data());
        const abi = {
            address: { 80001: addressContract },
            abi: abidb,
        }

    //const colect = useContract(abi)
    console.log(abi)
  }

  useEffect(()=>{
    abi();
  },[])

  const colect = useContract(NFTMarketArtifacts)

  const [tokenSell, setTokenSell] = useState({
    moneda: "",
    precio: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTokenSell({ ...tokenSell, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(tokenSell.precio);

  };


  return (
    <>
    {
      console.log(colect)
        // loading ? console.log('esta cargando') : useContract(colArtifacts)
      }
    </>
    // <form onSubmit={handleSubmit}>
    //   <h3>Anunciar artículo para la venta</h3>
    //   {/* {console.log(account.toLowerCase() === tokenIdOwner? 'es dueño' : 'no es dueño')} */}
    //   <Box sx={{ minWidth: 120 }} mt={2} mb={2}>
    //     <Grid container spacing={1}>
    //       <Grid item xs={4}>
    //         <FormControl fullWidth>
    //           <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
    //           <Select
    //             labelId="demo-simple-select-label"
    //             id="demo-simple-select"
    //             name="moneda"
    //             value={tokenSell.moneda}
    //             label="Moneda"
    //             onChange={handleChange}
    //           >
    //             <MenuItem value={"eth"}>ETH</MenuItem>
    //             <MenuItem value={"matic"}>MATIC</MenuItem>
    //           </Select>
    //         </FormControl>
    //       </Grid>
    //       <Grid item xs={8}>
    //         <FormControl fullWidth>
    //           <TextField
    //             id="outlined-basic"
    //             label="Precio"
    //             variant="outlined"
    //             name="precio"
    //             value={tokenSell.precio}
    //             onChange={handleChange}
    //           />
    //         </FormControl>
    //       </Grid>
    //     </Grid>
    //   </Box>
    //   <FormControl fullWidth>
    //     {account.toLowerCase() === tokenIdOwner ? (
    //       tokenSell.precio === "" ? (
    //         <Button variant="outlined" disabled>
    //           Vender
    //         </Button>
    //       ) : (
    //         <Button type="submit" variant="contained">
    //           Vender
    //         </Button>
    //       )
    //     ) : (
    //       console.log('no es dueño')
    //     )}
    //   </FormControl>
    // </form>
  );
}

export default Venta;
