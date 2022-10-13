import React, { useState } from "react";
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


function Venta({address, tokenId}) {

  const {account} = useWeb3React()

  const market = useNFTMarket()

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

    console.log(market.methods)
    //PRICE 5000000000000000
    market.methods.addItemToMarket(address, tokenId, tokenSell.precio)
    .send({
      from:account,
      gas: 1000000,
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

    // result.then(response => {
    //   console.log(response);
    //   console.log('item add')
    // })
    // .catch(err => {
    //   console.log("Error occured while adding a new item");
    // });


  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Anunciar artículo para la venta</h3>
      <Box sx={{ minWidth: 120 }} mt={2} mb={2}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="moneda"
                value={tokenSell.moneda}
                label="Moneda"
                onChange={handleChange}
              >
                <MenuItem value={"eth"}>ETH</MenuItem>
                <MenuItem value={"matic"}>MATIC</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Precio"
                variant="outlined"
                name="precio"
                value={tokenSell.precio}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <FormControl fullWidth>
        {tokenSell.precio === "" ? (
          <Button variant="outlined" disabled>
            Vender
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Vender
          </Button>
        )}
      </FormControl>
    </form>
  );
}

export default Venta;
