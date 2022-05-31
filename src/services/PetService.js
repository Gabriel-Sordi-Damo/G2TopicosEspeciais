import db from "../back-end/firebaseConnect"

import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { searchByAddress } from "./LocationService"


export const createPet = (dados) => {
    return new Promise(async (resolve, reject) => {
        try {
            let coordenadas = await searchByAddress(dados.endereco)
            let lat = coordenadas.lat
            let lng = coordenadas.lng
            dados.lat = lat
            dados.lng = lng
            const docId = await addDoc(collection(db, "pets"), dados)
            resolve(docId)
        } catch (error) {
            reject(error)
        }
    })
}


export const getPets = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const querySnapshot = await getDocs(collection(db, "pets"))
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


export const deletePet = (key) => {
    console.log("Delete", key)
    return new Promise(async (resolve, reject) => {

        try {
            await deleteDoc(doc(db, "pets", key))
            resolve()
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}