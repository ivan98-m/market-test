import { useEffect, useState, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

const useCollection = (colArtifacts) => {
    //const { address, abi } = colArtifacts;
    //console.log(address)
    const [collection, setCollection] = useState()

    const Contract = (colArtifacts) => {
        const { address, abi } = colArtifacts;
        const { active, library, chainId } = useWeb3React();

        // creamos un nuevo objeto
        const colect = useMemo(() => {
            // web3.eth.Contract
            if (active) return new library.eth.Contract(abi, address[chainId] // instanciamos el contrato dependiendo de la red en que nos encontramos
            )
        }, [active, chainId, library?.eth?.Contract])

        setCollection(colect);
        console.log(colect);
    }

    useEffect(() => {
        Contract(colArtifacts)
    }, [colArtifacts])
    
    return {
        collection
    }

}
export {useCollection};