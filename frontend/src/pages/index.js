import React, { useEffect } from 'react';
import { useAuth } from '../components/authContext';
import { useRouter } from "next/router";

const Home = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])
  return (
    <h1>Welcome to WorkMate</h1>
  )
}

export default Home;