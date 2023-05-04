import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../api";
import { helper } from "../helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommentWindow from "./CommentWindow";

const EditTicket = (props) => {
  const [ticketData, setTicketData] = useState("");
  const [allTicket, setAllTicket] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [updateFlag, setUpdateFlag] = useState((props.user.role.toUpperCase() == "MANAGER" || props.user.role.toUpperCase() == "ADMIN" || props.user.role.toUpperCase() == "SUPER-ADMIN"));
  const [transition, setTransition] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const [sprintName, setSprintName] = useState(null);
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            const {data: ticketDataTemp} = await api.ticket.getTicketById(props.ticketId);
            const {data: allTicketDataTemp} = await api.ticket.getAllTicket();
            const {data: stateDataTemp} = await api.state.getAllState();
            const {data: userDataTemp} = await api.user.getAllUser();
            const {data: projectDataTemp} = await api.project.getProjectById(ticketDataTemp.projectId);
            ticketDataTemp.projectName = projectDataTemp.name;
            setProjectName(projectDataTemp.name);
            if(ticketDataTemp.sprintId)
            {
              const {data: sprintTemp} = await api.project.getSprintById(ticketDataTemp.projectId, ticketDataTemp.sprintId);
              ticketDataTemp.sprintName = sprintTemp.name;
              setSprintName(sprintTemp.name)
            }
            setTransition([...stateDataTemp.filter((state)=>{if(state._id == ticketDataTemp.stateId)return state})[0].transition, ticketDataTemp.stateId]);
            setAllTicket(allTicketDataTemp);
            setStateData(stateDataTemp);
            setUserData(userDataTemp);
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
    fetchData();
  },[]);
  const handleInputChange = (e) => {
    if(hasSuccessMessage)
      setHasSuccessMessage(false);
    if(hasError)
      setError(false);
    const ticketDataTemp = {...ticketData};
    if(e.target.id === 'ticketName')
      ticketDataTemp.name = e.target.value;
    else if(e.target.id === 'ticketDescription' ) 
      ticketDataTemp.description = e.target.value;
    else if(e.target.id === 'ticketState' ) 
      ticketDataTemp.stateId = e.target.value;
    else if(e.target.id === 'ticketPriority' ) 
      ticketDataTemp.priority = e.target.value;
    else if(e.target.id === 'ticketAssign' ) 
      ticketDataTemp.assign = e.target.value;
    else if(e.target.id === 'ticketWatchers' ) 
      ticketDataTemp.watchers = Array.from(e.target.selectedOptions, option => option.value);
    else if(e.target.id === 'ticketDependedOnTickets' ) 
      ticketDataTemp.dependedOnTickets = Array.from(e.target.selectedOptions, option => option.value);
    setTicketData(ticketDataTemp);
  }
  const validateTicket = async (e) =>{
      e.preventDefault();
      try
      {
          setTicketData(helper.validationFunctions.isValidTicketData(ticketData));
      }catch(e){
          setHasError(true);
          setError(e.message);
          return;
      }
      
      try{
          const data = helper.validationFunctions.isValidTicketData(ticketData);
          delete data["_id"];
          delete data["projectName"]; 
          delete data["sprintName"];
          delete data["comments"];  
          const {data:ticketDataTemp} = await api.ticket.updateTicket(props.ticketId, data);
          ticketDataTemp.projectName = projectName;
          if(ticketDataTemp.sprintId)
            ticketDataTemp.sprintName = sprintName;
          setTransition([...stateData.filter((state)=>{if(state._id == ticketDataTemp.stateId)return state})[0].transition, ticketDataTemp.stateId]);
          setHasError(false);
          setHasSuccessMessage(true);
          setTicketData(ticketDataTemp);
          setUpdateFlag(!updateFlag);
      }catch(e){
          setHasError(true);
          setError(e.response.data);
          return;
      }
  }
  return (
    <div className='ticketPage'>
        {ticketData && allTicket &&  stateData && ticketData && userData   ?    
        <div className="ticketCard" id="ticketFormWrap">    
          <h1>Ticket</h1>
          {hasSuccessMessage && <div className='successMessage'>Successfully updated</div>}
          {(ticketData.assign === props.user.email || props.user.role.toUpperCase() == "MANAGER" || props.user.role.toUpperCase() == "ADMIN" || props.user.role.toUpperCase() == "SUPER-ADMIN") && <button type="button" onClick={()=>setUpdateFlag(!updateFlag)}>{!updateFlag ? "Edit Ticket" : "Cancel Edit"}</button>}
          <form onSubmit={validateTicket} id="ticketForm">
            <label htmlFor='ticketName'>Name : </label>
            <input disabled={!updateFlag} value={ticketData.name} className="TicketInput" id='ticketName' placeholder="Enter Ticket Name" name="ticketName" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='ticketDescription'>Description : </label>
            <textarea disabled={!updateFlag} value={ticketData.description} className="TicketInput" id='ticketDescription' placeholder="Enter Ticket Description" name="ticketDescription" type="text" onChange={handleInputChange}/>
            <br/>
            <p>Type : {ticketData.type}</p>
            <br/>
            <p>Project : {ticketData.projectName}</p>
            <br/>
            {ticketData.sprintId && <p>Sprint : {ticketData.sprintName}</p>}
            <label htmlFor='ticketState'>State : </label>
            <select disabled={!updateFlag} value={ticketData.state} className="TicketInput" id='ticketState' name="ticketState" onChange={handleInputChange}>
              {stateData.map((state)=>{if(transition.length==1 || transition.includes(state._id))return(<option value={state._id}>{state.name}</option>)})}
            </select >
            <br/>
            <label htmlFor='ticketPriority'>Priority : </label>
            <select disabled={!updateFlag} value={ticketData.priority} className="TicketInput" id='ticketPriority' name="ticketPriority" onChange={handleInputChange}>
              {helper.constants.PRIORITY.map((priority)=>{return(<option value={priority}>{priority}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketAssign'>Assign : </label>
            <select disabled={!updateFlag} value={ticketData.assign} className="TicketInput" id='ticketAssign' name="ticketAssign" onChange={handleInputChange}>
              {userData.map((user)=>{return(<option value={user.email}>{user.email}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketWatchers'>Watchers : </label>
            <select disabled={!updateFlag} value={ticketData.watchers} className="TicketInput" id='ticketWatchers' name="ticketWatchers" onChange={handleInputChange} multiple>
              {userData.map((user)=>{return(<option value={user.email}>{user.email}</option>)})}
            </select >
            <br/>
            <label htmlFor='ticketExpectedDate'>Expected Date : </label>
            <DatePicker disabled={!updateFlag} className="TicketInput" id='ticketExpectedDate' name="ticketExpectedDate" selected={ticketData.expectedDate && new Date(ticketData.expectedDate)} onChange={(date)=>setTicketData({...ticketData, expectedDate: date})} />
            <br/>
            <label htmlFor='ticketCloseDate'>Close Date : </label>
            <DatePicker disabled={!updateFlag} className="TicketInput" id='ticketCloseDate' name="ticketCloseDate" selected={ticketData.closeDate && new Date(ticketData.closeDate)} onChange={(date)=>setTicketData({...ticketData, closeDate: date})} />
            <br/>
            <label htmlFor='ticketReopenDate'>Reopen Date : </label>
            <DatePicker disabled={!updateFlag} className="TicketInput" id='ticketReopenDate' name="ticketReopenDate" selected={ticketData.reopenDate && new Date(ticketData.reopenDate)} onChange={(date)=>setTicketData({...ticketData, reopenDate: date})} />
            <br/>
            { allTicket.length!=0 && allTicket.length!=1 && <><label htmlFor='ticketDependedOnTickets'>Depended On Tickets : </label>
            <select disabled={!updateFlag} className="TicketInput" id='ticketDependedOnTickets' name="ticketDependedOnTickets" onChange={handleInputChange} multiple>
              {allTicket.map((ticket)=>{if(ticket._id!=ticketData._id)return(<option value={ticket._id}>{ticket.name}</option>)})}
            </select>
            <br/></>}
            <br/>
            {updateFlag && <button type="submit" className="createTicketButton">Update Ticket</button>}
          </form>
          {!updateFlag && <div><h2>Comment Section</h2><CommentWindow ticketId = {props.ticketId}/></div>}
          {hasError && <div className="error">{error}</div>}
        </div>
        :
        <div>Loading....</div>}
    </div>
  )
}

export default EditTicket