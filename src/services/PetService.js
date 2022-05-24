import db from "../back-end/firebaseConnect"

import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'


export const createPet = (dados) => {
    return new Promise(async (resolve, reject) => {
        try {
            const docId = await addDoc(collection(db, "pets"), dados)
            resolve(docId)
        } catch (error) {
            reject(error)
        }
    })
}