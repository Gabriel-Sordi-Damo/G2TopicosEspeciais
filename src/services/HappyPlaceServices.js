import db from "../firebase/firebaseConnect"

import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'
import { searchByAddress } from "./LocationService"

export const createHappyPlace = (data, uid) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("dados", data)
            let coordenadas = await searchByAddress(data.address)
            let lat = coordenadas.lat
            let lng = coordenadas.lng
            data.lat = lat
            data.lng = lng
            data.uid = uid
            console.log("cooodreadads", coordenadas)
            const docId = await addDoc(collection(db, "locations"), data)
            resolve(docId)
        } catch (error) {
            reject(error)
        }
    })
}

export const getHappyPlaceUid = (uid) => {

    return new Promise(async (resolve, reject) => {
        try {
            const colecao = collection(db, "locations")
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

export const getHappyPlaces = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const querySnapshot = await getDocs(collection(db, "locations"))
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

export const deleteHappyPlace = (key) => {
    console.log("Delete", key)
    return new Promise(async (resolve, reject) => {

        try {
            await deleteDoc(doc(db, "locations", key))
            resolve()
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}