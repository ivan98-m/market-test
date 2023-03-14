import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";


const useContract =(collection)=>{
    const { address, abi } = collection;
    const {active, library, chainId}=useWeb3React();

    //sessionStorage.removeItem("contractCollection") 

    // creamos un nuevo objeto
    const colect = useMemo(()=> {
                              // web3.eth.Contract
        if(active) return new library.eth.Contract(abi, address[chainId] // instanciamos el contrato dependiendo de la red en que nos encontramos
    )},[active, chainId, library?.eth?.Contract])

    //console.log(colect.methods)
    const play = {
        name : 'Uncle Vanya'
    }
    //sessionStorage.setItem("contractCollection1", JSON.stringify(colect.methods))
    return colect;
}
export {useContract};