import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from './authContext';
import { api } from "../api";
import Link from "next/link";
import { helper } from "@/helper";

const DisplayTickets = (props) => {
  const [ticketData, setTicketData] = useState('');
  const [stateData, setStateData] = useState('');
  const [assignToMeFlag, setAssignToMeFlag] = useState(false);
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [state, setState] = useState('');
  const [searchTearm, setSearchTearm] = useState('');
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
            setStateData(stateDataTemp);
            setTicketData(ticketDataTemp);
        }
        catch(e){
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
    if(!ticketData)
      fetchData();
  },[]);
  
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
        <tr key={ticket._id} onClick={()=>redirect(ticket._id)}>
          <td>{ticket.name}</td>
          <td>{ticket.type}</td>
          <td>{ticket.priority}</td>
          <td>{ticket.state.name}</td>
          <td>{ticket.assign}</td>
        </tr>
    );
  }

  const createTicketTable = () =>{
    let ticketDataTemp = [...ticketData];
    if(type!=='')
      ticketDataTemp = ticketDataTemp.filter(ticket=>{
        if(ticket.type===type)
      return ticket});
    if(priority!=='')
      ticketDataTemp = ticketDataTemp.filter(ticket=>{
        if(ticket.priority===priority)
      return ticket});
    if(state!=='')
      ticketDataTemp = ticketDataTemp.filter(ticket=>{
        if(ticket.state.name===state)
      return ticket});
    if(searchTearm!=='')
      ticketDataTemp = ticketDataTemp.filter(ticket=>{
        if(ticket.name.toLowerCase().includes(searchTearm.toLowerCase()) || ticket.assign.toLowerCase().includes(searchTearm.toLowerCase()))
      return ticket});
    return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Priority</th>
          <th>State</th>
          <th>Assign</th>
        </tr>
      </thead>
      <tbody>
        {ticketDataTemp.map((ticket)=>{
          if(assignToMeFlag)
          {
            if(ticket.assign === user.email)
              return (getTicketRow(ticket));
          }else{
            return (getTicketRow(ticket));
          }
          })}
      </tbody>
    </table>
    )
  }
  return (
    <div>
      {hasError && <div className="error">{error}</div>}
      {ticketData && stateData && <div>
      {!props.projectId ? <Link href={`/ticket/create-ticket`}>
        <button className='btn btn-primary'>Create Ticket</button>
      </Link> : <button onClick={()=>props.setTab("Create-Ticket")} className='btn btn-primary' >Create Ticket</button>}
      <select onChange={(e)=>{setPriority(e.target.value)}}>
        <option value="">All Priority</option>
        {helper.constants.PRIORITY.map(p=>{return(<option value={p}>{p}</option>)})}
      </select>
      <select onChange={(e)=>{setType(e.target.value)}}>
        <option value="">All Type</option>
        {helper.constants.TICKET_TYPE.map(p=>{return(<option value={p}>{p}</option>)})}
      </select>
      <input type="text" onChange={(e)=>{setSearchTearm(e.target.value.trim())}}/>
      <select onChange={(e)=>{setState(e.target.value)}}>
        <option value="">All State</option>
        {stateData.map(p=>{return(<option value={p.name}>{p.name}</option>)})}
      </select>
      <button className="btn-right btn btn-primary"onClick={()=>{setAssignToMeFlag(!assignToMeFlag)}}>{assignToMeFlag ? "All Ticket":"Ticket Assigned To Me"}</button>
      </div>}
      {ticketData && createTicketTable()}
    </div>
  )
}

export default DisplayTickets