import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../api";
import { helper } from "../helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTicket = (props) => {
  const [ticketData, setTicketData] = useState({});
  const [allTicket, setAllTicket] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [sprintData, setSprintData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            const {data: allTicketDataTemp} = await api.ticket.getAllTicket();
            const {data: stateDataTemp} = await api.state.getAllState();
            const {data: userDataTemp} = await api.user.getAllUser();
            const {data: projectDataTemp} = await api.project.getAllProject();
            let allSprint = {}
            for(let i=0;i<projectDataTemp.length;i++)
            {
              const {data: sprintDataTemp} = await api.project.getAllSprint(projectDataTemp[i]._id);
              allSprint[projectDataTemp[i]._id] = sprintDataTemp
            }

            setAllTicket(allTicketDataTemp);
            setStateData(stateDataTemp);
            setUserData(userDataTemp);
            setProjectData(projectDataTemp);
            setSprintData(allSprint);
            if(props.projectId)
                setTicketData({...ticketData, projectId:props.projectId});
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
    setHasError(false);
    const ticketDataTemp = {...ticketData};
    if(e.target.id === 'ticketName')
      ticketDataTemp.name = e.target.value;
    else if(e.target.id === 'ticketDescription' ) 
      ticketDataTemp.description = e.target.value;
    else if(e.target.id === 'ticketType' ) 
      ticketDataTemp.type = e.target.value;
    else if(e.target.id === 'ticketProject' ) 
      ticketDataTemp.projectId = e.target.value;
    else if(e.target.id === 'ticketSprint' ) 
      ticketDataTemp.sprintId = e.target.value;
    else if(e.target.id === 'ticketState' ) 
      ticketDataTemp.stateId = e.target.value;
    else if(e.target.id === 'ticketPriority' ) 
      ticketDataTemp.priority = e.target.value;
    else if(e.target.id === 'ticketAssign' ) 
      ticketDataTemp.assign = e.target.value;
    else if(e.target.id === 'ticketWatchers' ) 
      ticketDataTemp.watchers = Array.from(e.target.selectedOptions, option => option.value);
    else if(e.target.id === 'ticketExpectedDate' ) 
      ticketDataTemp.expectedDate = e.target.value;
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
          await api.ticket.createTicket(data);
          if(props.projectId)
            props.setTab("Tickets")
          else
            router.push("/ticket");
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
  return (
    <div className='ticketPage'>
        {hasError && <div className="error">{error}</div>}
        {allTicket &&  stateData && stateData.length!=0 && projectData && projectData.length!=0 && userData  && userData.length!=0 ?    
        <div className="ticketCard" id="ticketFormWrap">    
          <h1>Ticket</h1>
          <form onSubmit={validateTicket} id="ticketForm">
            <label htmlFor='ticketName'>Name : </label>
            <input value={ticketData.name} className="TicketInput" id='ticketName' placeholder="Enter Ticket Name" name="ticketName" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='ticketDescription'>Description : </label>
            <textarea value={ticketData.description} className="TicketInput" id='ticketDescription' placeholder="Enter Ticket Description" name="ticketDescription" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='ticketType'>Type : </label>
            <select value={ticketData.type} className="TicketInput" id='ticketType' name="ticketType" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {helper.constants.TICKET_TYPE.map((type)=>{return(<option value={type}>{type}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketProject'>Project : </label>
            <select disabled={props.projectId ? true : false} value={props.projectId ? props.projectId : ticketData.projectId} className="TicketInput" id='ticketProject' name="ticketProject" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {projectData.map((project)=>{return(<option value={project._id}>{project.name}</option>)})}
            </select>
            <br/>
            {sprintData[ticketData.projectId] && sprintData[ticketData.projectId].length!=0 && <><label htmlFor='ticketSprint'>Sprint : </label>
            <select value={ticketData.spritnId} className="TicketInput" id='ticketSprint' name="ticketSprint" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {sprintData[ticketData.projectId].map((sprint)=>{return(<option value={sprint._id}>{sprint.name}</option>)})}
            </select>
            <br/></>}
            <label htmlFor='ticketState'>State : </label>
            <select value={ticketData.state} className="TicketInput" id='ticketState' name="ticketState" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {stateData.map((state)=>{return(<option value={state._id}>{state.name}</option>)})}
            </select >
            <br/>
            <label htmlFor='ticketPriority'>Priority : </label>
            <select value={ticketData.priority} className="TicketInput" id='ticketPriority' name="ticketPriority" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {helper.constants.PRIORITY.map((priority)=>{return(<option value={priority}>{priority}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketAssign'>Assign : </label>
            <select value={ticketData.assign} className="TicketInput" id='ticketAssign' name="ticketAssign" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {userData.map((user)=>{return(<option value={user.email}>{user.email}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketWatchers'>Watchers : </label>
            <select value={ticketData.watchers} className="TicketInput" id='ticketWatchers' name="ticketWatchers" onChange={handleInputChange} multiple>
              {userData.map((user)=>{return(<option value={user.email}>{user.email}</option>)})}
            </select >
            <br/>
            <label  htmlFor='ticketExpectedDate'>Expected Date : </label>
            <DatePicker selected={ticketData.expectedDate && new Date(ticketData.expectedDate)} className="TicketInput" id='ticketExpectedDate' name="ticketExpectedDate" onChange={(date)=>setTicketData({...ticketData, expectedDate: date})}/>
            <br/>
            { allTicket.length!=0 && <><label htmlFor='ticketDependedOnTickets'>Depended On Tickets : </label>
            <select value={ticketData.dependedOnTickets} className="TicketInput" id='ticketDependedOnTickets' name="ticketDependedOnTickets" onChange={handleInputChange} multiple>
              {allTicket.map((ticket)=>{return(<option value={ticket._id}>{ticket.name}</option>)})}
            </select>
            <br/></>}
            <button type="submit" className="createTicketButton">Create Ticket</button>
              
          </form>
        </div>
        : projectData !== null && projectData.length==0 ?
        <div>Please create project to create ticket</div>
        : stateData !== null && stateData.length==0 ?
        <div>Please create state to create ticket</div>
        :
        <div>Loading....</div>}
    </div>
  )
}

export default CreateTicket