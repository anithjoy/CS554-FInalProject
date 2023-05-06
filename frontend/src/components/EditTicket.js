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
  const [updateFlag, setUpdateFlag] = useState(false);
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
  },[]);
  const handleInputChange = (e) => {
    if(hasSuccessMessage)
      setHasSuccessMessage(false);
    if(hasError)
      setError(false);
    const ticketDataTemp = {...ticketData};
    if(e.target.id === 'ticketName')
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.name
        setTicketData(ticketDataTemp)
      }
      ticketDataTemp.name = e.target.value;
    }
    else if(e.target.id === 'ticketDescription' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.name
        setTicketData(ticketDataTemp)
      }
      ticketDataTemp.description = e.target.value;
    }
    else if(e.target.id === 'ticketState' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.name
        setTicketData(ticketDataTemp)
      }
      ticketDataTemp.stateId = e.target.value;
    }
    else if(e.target.id === 'ticketPriority' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.name
        setTicketData(ticketDataTemp)
      }
      ticketDataTemp.priority = e.target.value;
    }
    else if(e.target.id === 'ticketAssign' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.name
        setTicketData(ticketDataTemp)
      }
      ticketDataTemp.assign = e.target.value;
    }
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

  const handleWatchersSelect = (e) => {
    if(hasSuccessMessage)
      setHasSuccessMessage(false);
    if(hasError)
      setError(false);
    const option = e.target.value;
    if(!ticketData.watchers)
      setTicketData({...ticketData, watchers: [e.target.value]})
    else{
      const options = ticketData.watchers.includes(option)
      ? ticketData.watchers.filter((t) => t !== option)
      : [...ticketData.watchers, option];
    setTicketData({...ticketData, watchers:options});
    }
  };

  const handleDependedOnTicketsSelect = (e) => {
    if(hasSuccessMessage)
      setHasSuccessMessage(false);
    if(hasError)
      setError(false);
    const option = e.target.value;
    if(!ticketData.dependedOnTickets)
      setTicketData({...ticketData, dependedOnTickets: [e.target.value]})
    else{
      const options = ticketData.dependedOnTickets.includes(option)
      ? ticketData.dependedOnTickets.filter((t) => t !== option)
      : [...ticketData.dependedOnTickets, option];
    setTicketData({...ticketData, dependedOnTickets:options});
    }
  };

  return (
    <div className='ticketPage'>
        {ticketData && allTicket &&  stateData && ticketData && userData   ?    
        <div className="ticketCard" id="ticketFormWrap">    
          <h1>Ticket</h1>
          {hasError && <div className="error">{error}</div>}
          {hasSuccessMessage && <div className='successMessage'>Successfully updated</div>}
          {(ticketData.assign === props.user.email || props.user.role.toUpperCase() == "MANAGER" || props.user.role.toUpperCase() == "ADMIN" || props.user.role.toUpperCase() == "SUPER-ADMIN") && <button type="button" onClick={()=>setUpdateFlag(!updateFlag)}>{!updateFlag ? "Edit Ticket" : "Cancel Edit"}</button>}
          <form onSubmit={validateTicket} id="ticketForm">
            <label htmlFor='ticketName'>Name : </label>
            <input disabled={!updateFlag} value={ticketData.name ? ticketData.name : ""} className="TicketInput" id='ticketName' placeholder="Enter Ticket Name" name="ticketName" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='ticketDescription'>Description : </label>
            <textarea disabled={!updateFlag} value={ticketData.description? ticketData.description : ""} className="TicketInput" id='ticketDescription' placeholder="Enter Ticket Description" name="ticketDescription" type="text" onChange={handleInputChange}/>
            <br/>
            <p>Type : {ticketData.type}</p>
            <br/>
            <p>Project : {ticketData.projectName}</p>
            <br/>
            {ticketData.sprintId && <p>Sprint : {ticketData.sprintName}</p>}
            <label htmlFor='ticketState'>State : </label>
            <select disabled={!updateFlag} value={ticketData.state ? ticketData.state : ""} className="TicketInput" id='ticketState' name="ticketState" onChange={handleInputChange}>
              {stateData.map((state)=>{if(transition.length==1 || transition.includes(state._id))return(<option key={state._id} value={state._id}>{state.name}</option>)})}
            </select >
            <br/>
            <label htmlFor='ticketPriority'>Priority : </label>
            <select disabled={!updateFlag} value={ticketData.priority ? ticketData.priority : ""} className="TicketInput" id='ticketPriority' name="ticketPriority" onChange={handleInputChange}>
              {helper.constants.PRIORITY.map((priority, index)=>{return(<option value={priority} key={index}>{priority}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketAssign'>Assign : </label>
            <select disabled={!updateFlag} value={ticketData.assign ? ticketData.assign : ""} className="TicketInput" id='ticketAssign' name="ticketAssign" onChange={handleInputChange}>
              {userData.map((user)=>{return(<option key={user._id} value={user.email}>{user.email} - {user.role}</option>)})}
            </select>
            <br/>
            <div className="form-switch">
              <label>
                Watchers:
                  {userData.map((user)=>{
                    return(
                    <div key={user._id} className="form-check mb-2">
                      <input
                        disabled={!updateFlag}
                        type="checkbox"
                        name="watchers"
                        value={user.email}
                        checked={ticketData.watchers ? ticketData.watchers.includes(user.email) : false}
                        onChange={handleWatchersSelect}
                        className="form-check-input"
                        id={user._id}
                      />
                      <label htmlFor={user._id} className="form-check-label">
                        {user.email} - {user.role}
                      </label>
                    </div>)
                  })}
              </label>
            </div>
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
            { allTicket.length!=0 && allTicket.length!=1 && <div className="form-switch">
              <label>
                Depended On Tickets: 
                  {allTicket.map((ticket)=>{
                    return(
                    <div key={ticket._id} className="form-check mb-2">
                      <input
                        disabled={!updateFlag}
                        type="checkbox"
                        name="ticketDependedOnTickets"
                        value={ticket._id}
                        checked={ticketData.dependedOnTickets ? ticketData.dependedOnTickets.includes(ticket._id) : false}
                        onChange={handleDependedOnTicketsSelect}
                        className="form-check-input"
                        id={ticket._id}
                      />
                      <label htmlFor={ticket._id} className="form-check-label">
                        {ticket.name}
                      </label>
                    </div>)
                  })}
              </label>
            </div>}
            <br/>
            {updateFlag && <button type="submit" className="createTicketButton">Update Ticket</button>}
          </form>
          {!updateFlag && <div><h2>Comment Section</h2><CommentWindow ticketId = {props.ticketId}/></div>}
        </div>
        :
        hasError ? <div className="error">You can not access this ticket ask for access permission to your manager</div> :<div>Loading....</div>}
    </div>
  )
}

export default EditTicket