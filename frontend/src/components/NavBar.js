import React, { useEffect, useState } from 'react';
import {api} from "../api";
import Link from "next/link";
import {helper} from '../helper'
import { useAuth } from './authContext'
import { useRouter } from "next/router";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = (e) =>{
    if(e.target.id === '6')
      logout();
  }
  useEffect(() => {
    const fetchData = async()=>{
      const {data} = await api.user.getUserInfo();
      setUser(data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(user)
      if((router.pathname=="/user" || router.pathname=="/user/create-user" || router.pathname=="/user/[userId]") && (user.role.toUpperCase() == "MANAGER" || user.role.toUpperCase() == "DEVELOPER" || user.role.toUpperCase() == "QA" || user.role.toUpperCase() == "SUPPORT"))
        router.push('/dashboard');
      else if((router.pathname=="/state" || router.pathname=="/state/create-state" || router.pathname=="/state/[stateId]")  && (user.role.toUpperCase() == "DEVELOPER" || user.role.toUpperCase() == "QA" || user.role.toUpperCase() == "SUPPORT"))
        router.push('/dashboard');
      else if(router.pathname=="/project/create-project"  && (user.role.toUpperCase() == "DEVELOPER" || user.role.toUpperCase() == "QA" || user.role.toUpperCase() == "SUPPORT"))
        router.push('/dashboard');
  }, [router.pathname, user])
  return (
    <nav>
   {user && <div className="nav-center">
      <div className="nav-header">
        <Link href="/dashboard">
          <p>WorkMate</p>
        </Link>
      </div>
      <div className="links-container">
        <ul className="links">
          {helper.constants.NAV_LINKS.map((link) => {
            const { id, url, text } = link;
            if( text=="Users" && (user.role.toUpperCase() == "MANAGER" || user.role.toUpperCase() == "DEVELOPER" || user.role.toUpperCase() == "QA" || user.role.toUpperCase() == "SUPPORT"))
              return;
            if( text=="States" && (user.role.toUpperCase() == "DEVELOPER" || user.role.toUpperCase() == "QA" || user.role.toUpperCase() == "SUPPORT"))
              return;
            return (
              <li key={id} >
                <Link href={`${url}`} id={id} onClick={handleLogout}>{text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>}
  </nav>
  )
}

export default NavBar