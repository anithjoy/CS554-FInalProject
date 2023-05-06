import React, { useState, useEffect } from 'react';
import EditTicket from '@/components/EditTicket';
import { useRouter } from "next/router";
import {api} from "../../api";

const Ticket = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async()=>{
      try{
        const {data} = await api.user.getUserInfo();
        setUser(data);
      }catch(e){
        if(!e.response || !e.response.status || e.response.status===500)
          router.push("/error");
        else if(e.response.status===401 )
        {
          localStorage.clear();
          router.push("/login");
        }else{
          setHasError(true);
          setError(e.response.data);
        }
      }
    }
    fetchData();
  }, [])
  return (
    <div className='ticketPage'>
        {hasError && <div className="error">{error}</div>}
        {user && <EditTicket ticketId={router.query.ticketId} user={user}/>}
    </div>
  )
}

export default Ticket