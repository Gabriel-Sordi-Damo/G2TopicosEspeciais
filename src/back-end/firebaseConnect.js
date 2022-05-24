import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

//Personalize com as suas chaves de conexão
const firebaseConfig = {
    apiKey: "AIzaSyA1VNGWs9KhLDatTRj-mYwlpH4OmWGHPc8",
    authDomain: "catfinder-57d59.firebaseapp.com",
    projectId: "catfinder-57d59",
    storageBucket: "catfinder-57d59.appspot.com",
    messagingSenderId: "708287731668",
    appId: "1:708287731668:web:7aa640653b258b5bd02841"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db


