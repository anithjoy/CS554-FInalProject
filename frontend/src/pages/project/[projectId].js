import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import ProjectDetail from '@/components/ProjectDetail';
import DisplaySprints from '../../components/DisplaySprints';
import CreateSprint from '@/components/CreateSprint';
import DisplayTickets from '@/components/DisplayTickets';
import CreateTicket from '@/components/CreateTicket';
import EditTicket from '@/components/EditTicket';
import EditSprint from '@/components/EditSprint';
import {api} from "../../api";

const Project = () => {
  const [tab, setTab] = useState("Details");
  const [assignToMeFlag, setAssignToMeFlag] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [sprintId, setSprintId] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
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
    <div className="container">
      {hasError && <div className="error">{error}</div>}
      {user && <div>
        <div className="links-container">
          <ul className="links">
            <li onClick={()=>setTab("Details")}>
              Details
            </li>
            <li onClick={()=>setTab("All-Sprints")}>
              Sprints
            </li>
            <li onClick={()=>setTab("Tickets")}>
              Tickets
            </li>
          </ul>
        </div>
        {tab==="All-Sprints" && (user.role.toUpperCase() == "MANAGER" || user.role.toUpperCase() == "ADMIN" || user.role.toUpperCase() == "SUPER-ADMIN") && <button className='btn btn-primary' onClick={()=>setTab("Create-Sprint")}>Create Sprint</button>}
        {tab==="Tickets" && <button onClick={()=>setTab("Create-Ticket")} className='btn btn-primary' >Create Ticket</button>}
        {tab==="Tickets" && <button className='btn btn-primary btn-right' onClick={()=>{setAssignToMeFlag(!assignToMeFlag)}}>{assignToMeFlag ? "All Type Ticket":"Assign To Me Ticket"}</button>}
        {tab==="Details" && <ProjectDetail projectId={router.query.projectId} user={user}/>}
        {tab==="All-Sprints" && <DisplaySprints projectId={router.query.projectId} setTab={setTab} setSprintId={setSprintId}/>}
        {tab==="Create-Sprint" && <CreateSprint projectId={router.query.projectId} setTab={setTab}/>}
        {tab==="Edit-Sprint" && <EditSprint projectId={router.query.projectId} user={user} sprintId={sprintId} setTab={setTab}/>}
        {tab==="Tickets" && <DisplayTickets projectId={router.query.projectId} assignToMeFlag={assignToMeFlag} setTab={setTab} setTicketId={setTicketId}/>}
        {tab==="Create-Ticket" && <CreateTicket projectId={router.query.projectId} setTab={setTab}/> }
        {tab==="Edit-Ticket" && <EditTicket projectId={router.query.projectId} user={user} ticketId={ticketId} setTab={setTab}/>}
      </div>}
    </div>
  )
}

export default Project