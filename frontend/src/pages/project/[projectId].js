import React, { useState } from 'react';
import { useRouter } from 'next/router'
import ProjectDetail from '@/components/ProjectDetail';
import DisplaySprints from '../../components/DisplaySptints';
import CreateSprint from '@/components/CreateSprint';
import DisplayTickets from '@/components/DisplayTickets';
import CreateTicket from '@/components/CreateTicket';
import EditTicket from '@/components/EditTicket';
import EditSprint from '@/components/EditSprint';

const Project = () => {
  const [tab, setTab] = useState("Details");
  const [assignToMeFlag, setAssignToMeFlag] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [sprintId, setSprintId] = useState(null);
  const router = useRouter();
  return (
    <div>
      <div>
        <ul>
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
      {tab==="All-Sprints" && <button onClick={()=>setTab("Create-Sprint")}>Create Sprint</button>}
      {tab==="Tickets" && <button onClick={()=>setTab("Create-Ticket")}>Create Ticket</button>}
      {tab==="Tickets" && <button onClick={()=>{setAssignToMeFlag(!assignToMeFlag)}}>{assignToMeFlag ? "All Type Ticket":"Assign To Me Ticket"}</button>}
      {tab==="Details" && <ProjectDetail projectId={router.query.projectId}/>}
      {tab==="All-Sprints" && <DisplaySprints projectId={router.query.projectId} setTab={setTab} setSprintId={setSprintId}/>}
      {tab==="Create-Sprint" && <CreateSprint projectId={router.query.projectId} setTab={setTab}/>}
      {tab==="Edit-Sprint" && <EditSprint projectId={router.query.projectId} sprintId={sprintId} setTab={setTab}/>}
      {tab==="Tickets" && <DisplayTickets projectId={router.query.projectId} assignToMeFlag={assignToMeFlag} setTab={setTab} setTicketId={setTicketId}/>}
      {tab==="Create-Ticket" && <CreateTicket projectId={router.query.projectId} setTab={setTab}/> }
      {tab==="Edit-Ticket" && <EditTicket projectId={router.query.projectId} ticketId={ticketId} setTab={setTab}/>}
    </div>
  )
}

export default Project