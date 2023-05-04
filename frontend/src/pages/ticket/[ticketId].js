import React, { useState, useEffect } from 'react';
import EditTicket from '@/components/EditTicket';
import { useRouter } from "next/router";
import {api} from "../../api";

const Ticket = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async()=>{
      const {data} = await api.user.getUserInfo();
      setUser(data);
    }
    fetchData();
  }, [])
  return (
    <div className='ticketPage'>
        {user && <EditTicket ticketId={router.query.ticketId} user={user}/>}
    </div>
  )
}

export default Ticket