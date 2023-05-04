import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from '../components/authContext';
import { api } from "../api";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const Dashboard = () => {
  const [ticketData, setTicketData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            const {data:ticketDataTemp} = await api.ticket.getAllTicket();
            const ticketDataTemp2 = [];
            ticketDataTemp.filter((ticket)=>{
              if(ticket.assign === user.email && ticket.expectedDate)
              {
                let start = new Date();
                let end = new Date(ticket.expectedDate);
                if(start>end)
                  start=end;
                  ticketDataTemp2.push( {
                  id: ticket._id,
                  title: ticket.name,
                  start: start,
                  end: end
                });
              }
            });
            console.log(ticketDataTemp2);
            setTicketData(ticketDataTemp2);
        }
        catch(e){
          if(e.response.status===500)
            router.push("/error");
          else if(e.response.status===401 )
          {
            router.push("/login");
          }else{
            setHasError(true);
            setError(e.response.data);
          }
        }
    }
    if(!ticketData)
      fetchData();
  },[]);

  const redirect = (e) =>{
    router.push(`/ticket/${e.id}`)
  }
  return (
    <div>
      {hasError && <div className="error">{error}</div>}
      {ticketData && <Calendar onSelectEvent={(e)=>redirect(e)} localizer={momentLocalizer(moment)} events={ticketData} startAccessor="start" endAccessor="end" defaultDate={new Date()} /> }
    </div>
  )
}

export default Dashboard