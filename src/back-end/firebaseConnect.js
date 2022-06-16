import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

//Personalize com as suas chaves de conexão
const firebaseConfig = {
    apiKey: "AIzaSyB6njzvtZipjwSbuGTOoTR9qClGeiaE9Jw",
    authDomain: "g2topicosespeciais-59f73.firebaseapp.com",
    projectId: "g2topicosespeciais-59f73",
    storageBucket: "g2topicosespeciais-59f73.appspot.com",
    messagingSenderId: "947250928853",
    appId: "1:947250928853:web:c795aea961ecdc307b565c"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db


