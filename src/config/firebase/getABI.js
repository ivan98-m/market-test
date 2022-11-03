import { db } from "./firebase"
import { doc, getDoc } from "firebase/firestore";

const getABI = (id) => {
    try {
        const docRef = doc(db, "ABIS", id);
        const docSnap = getDoc(docRef);

        return docSnap
    } catch (error) {
        console.log(error)
        return error
    }
}

export default getABI;