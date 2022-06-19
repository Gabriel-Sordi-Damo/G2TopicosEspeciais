import db from "../firebase/firebaseConnect"

import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'

export const createFavoriteHappyPlace = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const docId = await addDoc(collection(db, "favorites"), data)
            resolve(docId)
        } catch (error) {
            reject(error)
        }
    })
}

export const getFavoritePlaceUid = (uid) => {

    return new Promise(async (resolve, reject) => {
        try {
            const colecao = collection(db, "favorites")
            const q = query(colecao, where("uid", "==", uid))
            const querySnapshot = await getDocs(q)
            let registros = []
            querySnapshot.forEach((item) => {
                let data = item.data()
                data.key = item.id
                registros.push(data)
            })
            resolve(registros)
        } catch (error) {
            console.log("Erro:", error)
            reject()
        }
    })
}

export const deleteFavoritePlace = (key) => {
    console.log("Delete", key)
    return new Promise(async (resolve, reject) => {

        try {
            await deleteDoc(doc(db, "favorites", key))
            resolve()
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}