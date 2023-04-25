import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithCustomToken
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { useRouter } from "next/router";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          token: await user.getIdToken(),
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = async(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).catch((e)=>console.log(e));
  }

  const login = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password).catch((e)=>console.log(e));
  }

  const customTokenLogin = async(token) => {
      return signInWithCustomToken(auth, token).catch((e)=>console.log(e));
  }  
  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, customTokenLogin }}>
      {loading ? <div> loading.... </div> : children}
    </AuthContext.Provider>
  )
}