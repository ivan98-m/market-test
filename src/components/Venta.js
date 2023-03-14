import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import useNFTMarket from "../hooks/useNFTMarket";
import { useContract } from "../hooks/useContract"

function Venta({ addressContract, tokenId, tokenIdOwner, abi }) {
  const { account } = useWeb3React();

  const [cargando, setCargando] = useState(false)

  const market = useNFTMarket();

  const colect = useContract(abi);

  useEffect(()=>{
    const newJ = sessionStorage.getItem("contractCollection1")
    //sessionStorage.setItem("contractCollection1", JSON.stringify(colect.methods))
    //console.log(JSON.parse(newJ))
  },[])

  const [tokenSell, setTokenSell] = useState({
    moneda: "",
    precio: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTokenSell({ ...tokenSell, [name]: value });
  };

  const addMarket = () => {
    const valorMatic = Web3.utils.toWei(tokenSell.precio, "ether");
    market.methods
      .addItemToMarket(addressContract, tokenId, valorMatic)
      .send({
        from: account,
        //gas: 3000000,
      })
      .on("transactionHash", (txHash) => {
        //alert(`Transacción enviada txHash: ${txHash}`);
        setCargando(true)
      })
      .on("receipt", () => {
        setCargando(false)
        alert(`Transaccion Confirmada`);
      })
      .on("error", (error) => {
        setCargando(false)
        alert(`Transacción Fallida`);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(tokenSell.precio);
    const dirMarket = "0xF36D7ea7DB0918755a2a5342A7BFC3456DE80f64";
    colect.methods
      .setApprovalForAll(dirMarket, true)
      .send({
        from: account,
        // value: 10000000000000000,
      })
      .on("error", (error) => {
        alert("transacción fallida", error);
        setCargando(false);
      })
      .on("transactionHash", (txHash) => {
        //alert(`Transacción enviada txHash: ${txHash}`);
        setCargando(true);
      })
      .on("receipt", () => {
        setCargando(false)
        // alert(`Exito! El NFT ahora pertence a: ${cuentaTransfer}`)
        addMarket();
      });
  };

  const [maxSupply, setMaxSupply] = useState();

  const getMaxSupply = useCallback(async () => {
    // validamos que el contrato exista
    if (colect) {
      const result = await colect.methods.totalSupply().call().then(); //console.log("Holaaa",{maxSupply}) //dentro del then
      //console.log(imagenToken.methods);
      setMaxSupply(result);
    }
  },[colect]); // cada que cambie elcontrato secrea esta funcion

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply]); // escucha a cualquier cambie en getMaxSupply

  return (
    <form onSubmit={handleSubmit}>
      {/* {console.log(market)} */}
      {cargando ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>

      ) : (
        ''
      )}
      <h3>
        {maxSupply ? `Total nfts a mintear: ${maxSupply}` : `Esta cargado`}
      </h3>
      <h3>Anunciar artículo para la venta</h3>
      {/* {console.log(account.toLowerCase() === tokenIdOwner? 'es dueño' : 'no es dueño')} */}
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
        {account ? (account.toLowerCase() === tokenIdOwner ? (
          tokenSell.precio === "" ? (
            <Button variant="outlined" disabled>
              Vender
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Vender
            </Button>
          )
        ) : (
          console.log("no es dueño")
        )) :
          ('')}
      </FormControl>
    </form>
  );
}

export default Venta;
