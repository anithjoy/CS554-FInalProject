import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB7_Pw-oAsQd1ElfO2RdghTO411FzqIGhc",
  authDomain: "workmate-65bb5.firebaseapp.com",
  projectId: "workmate-65bb5",
  storageBucket: "workmate-65bb5.appspot.com",
  messagingSenderId: "933186810509",
  appId: "1:933186810509:web:978cc65021c6297b0828c4"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()