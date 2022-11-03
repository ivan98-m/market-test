import { useEffect, useState } from "react";
import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore";


const useGetCollection = (id) => {

    const [colArtifacts, setColArtifacts] = useState();
    const [loading, setLoading] = useState(true);

    const getABI = async(id) => {
        setLoading(true)
        //let abi1 = await db.collection('ABIS').doc(id).get();
        try {
            const docRef = doc(db, "ABIS", id);
            const docSnap = await getDoc(docRef);
            const abidb = Object.values(docSnap.data());
            const abi = {
                address: { 80001: id },
                abi: abidb,
            }
            setColArtifacts(abi);
            //const collection = useCollection(abi);
            //console.log(collection)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getABI(id);
    }, [id])

    return {
        colArtifacts,
        loading,
    }
}

export { useGetCollection }