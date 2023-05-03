import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from './authContext'
import NavBar from './NavBar'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return <>{user ? <div><NavBar/>{children}</div> : null}</>
}

export default ProtectedRoute