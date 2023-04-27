import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from '../../components/authContext';
import { api } from "../../api";
import Link from "next/link";

const Tickets = () => {
  const [ticketData, setTicketData] = useState('');
  const [assignToMeFlag, setAssignToMeFlag] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            let {data: ticketDataTemp} = await api.ticket.getAllTicket();
            const {data: stateDataTemp} = await api.state.getAllState();
            ticketDataTemp = ticketDataTemp.map((ticket)=>{
              ticket.state = stateDataTemp.filter((state)=>{
                if(state._id==ticket.stateId)
                  return state
              })[0]
              return ticket;
            })
            setTicketData(ticketDataTemp);
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
  const getTicketRow = (ticket) =>{
    return(
      <Link href={`/ticket/${ticket._id}`}>
        <tr>
          <td>{ticket.name}</td>
          <td>{ticket.priority}</td>
          <td>{ticket.state.name}</td>
          <td>{ticket.assign}</td>
        </tr>
      </Link>
    );
  }

  const createTicketTable = () =>{
    return (
    <table>
      <tr>
        <th>Name</th>
        <th>Priority</th>
        <th>State</th>
        <th>Assign</th>
      </tr>
      {ticketData.map((ticket)=>{
        if(assignToMeFlag)
        {
          if(ticket.assign === user.email)
            return (getTicketRow(ticket));
        }else{
          return (getTicketRow(ticket));
        }
        })}
    </table>
    )
  }
  return (
    <div>
      {hasError && <div className="error">{error}</div>}
      <Link href={`/state/create-state`}>
        <button>Create State </button>
      </Link>
      <button onClick={()=>{setAssignToMeFlag(!assignToMeFlag)}}>{assignToMeFlag ? "All Type Ticket":"Assign To Me Ticket"}</button>
      {ticketData && createTicketTable()}
    </div>
  )
}

export default Tickets