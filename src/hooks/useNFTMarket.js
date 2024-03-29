import { useCallback, useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import NFTMarketArtifacts from "../config/artifacts/NFTMarket";


//address market sin cambiar estado : 0x42943e63e4eF7e672f022227369524aA38C33203
// hook para uso de nuestro contrato inteligente 
//address cambio de estado(venta) no tranfiere el token al market : 0xF36D7ea7DB0918755a2a5342A7BFC3456DE80f64
const { address, abi } = NFTMarketArtifacts; // sacamos de artifacts el address y el abi
const useNFTMarket =()=>{
    const {active, library, chainId}=useWeb3React();

    // creamos un nuevo objeto
    const market = useMemo(()=> {
                              // web3.eth.Contract
        if(active) return new library.eth.Contract(abi, address[chainId] // instanciamos el contrato dependiendo de la red en que nos encontramos
    )},[active, chainId, library?.eth?.Contract])

    return market;
}
export default useNFTMarket;