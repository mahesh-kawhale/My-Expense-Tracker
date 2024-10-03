import {addDoc,collection,serverTimestamp} from "firebase/firestore";
import {db} from "../config/firebase-config";
import {useGetUserInfo} from "./useGetUserInfo";
// function to add transctions in firestore db
export const useAddTransactions = () => {
    const transactionCollectionRef = collection(db,"transactions");  // creating reference of transaction collection
    const { userId } = useGetUserInfo();
    
    const addTransactions = async ({
        description,
        transactionAmount,
        transactionType,
    }) => {
        if(userId){

            await addDoc(transactionCollectionRef, {
                userId,
                description,
                transactionAmount,
                transactionType,
                createdAt: serverTimestamp(),
                
    
            });
            console.log("hii",userId);

        }else{
            
            console.error("userID is undefined");
        }
    };

    return {addTransactions};


};