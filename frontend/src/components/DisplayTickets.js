import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from './authContext';
import { api } from "../api";
import Link from "next/link";

const DisplayTickets = (props) => {
  const [ticketData, setTicketData] = useState('');
  const [assignToMeFlag, setAssignToMeFlag] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            let ticketDataTemp;
            if(props.projectId)
            {
                const {data} = await api.project.getAllTicketByProjectId(props.projectId);
                ticketDataTemp = data;
            }
            else{
                const {data} = await api.ticket.getAllTicket();
                ticketDataTemp = data;
            }   
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

  useEffect(()=>{
    setAssignToMeFlag(props.assignToMeFlag);
  },[props.assignToMeFlag]);
  
  const redirect = (id) =>{
    if(props.projectId)
    {
      props.setTicketId(id);
      props.setTab("Edit-Ticket")
    }
    else
      router.push(`/ticket/${id}`)
  }
  const getTicketRow = (ticket) =>{
    return(
        <tr onClick={()=>redirect(ticket._id)}>
          <td>{ticket.name}</td>
          <td>{ticket.priority}</td>
          <td>{ticket.state.name}</td>
          <td>{ticket.assign}</td>
        </tr>
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
      {!props.projectId && <Link href={`/ticket/create-ticket`}>
        <button>Create Ticket </button>
      </Link>}
      {!props.projectId && <button onClick={()=>{setAssignToMeFlag(!assignToMeFlag)}}>{assignToMeFlag ? "All Type Ticket":"Assign To Me Ticket"}</button>}
      {ticketData && createTicketTable()}
    </div>
  )
}

export default DisplayTickets