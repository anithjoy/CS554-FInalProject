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
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.name
        setTicketData(ticketDataTemp)
        return;
      }
      ticketDataTemp.name = e.target.value;
    }
    else if(e.target.id === 'ticketDescription' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.description
        setTicketData(ticketDataTemp)
        return;
      }
      ticketDataTemp.description = e.target.value;
    }
    else if(e.target.id === 'ticketType' )
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.type
        setTicketData(ticketDataTemp)
        return;
      } 
      ticketDataTemp.type = e.target.value;
    }
    else if(e.target.id === 'ticketProject' )
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.projectId
        setTicketData(ticketDataTemp)
        return;
      } 
      ticketDataTemp.projectId = e.target.value;
    }
    else if(e.target.id === 'ticketSprint' )
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.sprintId
        setTicketData(ticketDataTemp)
        return;
      } 
      ticketDataTemp.sprintId = e.target.value;
    }
    else if(e.target.id === 'ticketState' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.stateId
        setTicketData(ticketDataTemp)
        return;
      }
      ticketDataTemp.stateId = e.target.value;
    }
    else if(e.target.id === 'ticketPriority' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.priority
        setTicketData(ticketDataTemp)
        return;
      }
      ticketDataTemp.priority = e.target.value;
    }
    else if(e.target.id === 'ticketAssign' ) 
    {
      if(e.target.value=="")
      {
        delete ticketDataTemp.assign
        setTicketData(ticketDataTemp)
        return;
      }
      ticketDataTemp.assign = e.target.value;
    }
    setTicketData(ticketDataTemp);
  };

  const handleWatchersSelect = (e) => {
    setHasError(false);
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
    setHasError(false);
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
    <div className="CreateUserCard card p-4 shadow-sm">
        {hasError && <div className="error">{error}</div>}
        {allTicket &&  stateData && stateData.length!=0 && projectData && projectData.length!=0 && userData  && userData.length!=0 ?    
        <div className="ticketCard" id="ticketFormWrap">    
          <form onSubmit={validateTicket} id="ticketForm">
            <label htmlFor='ticketName'>Name : </label>
            <input value={ticketData.name ? ticketData.name : ""} className="loginInput form-control" id='ticketName' placeholder="Enter Ticket Name" name="ticketName" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='ticketDescription'>Description : </label>
            <textarea value={ticketData.description ? ticketData.description : ""} className="loginInput form-control" id='ticketDescription' placeholder="Enter Ticket Description" name="ticketDescription" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='ticketType'>Type : </label>
            <select value={ticketData.type ? ticketData.type : ""} className="loginInput form-control" id='ticketType' name="ticketType" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {helper.constants.TICKET_TYPE.map((type, index)=>{return(<option key={index} value={type}>{type}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketProject'>Project : </label>
            <select disabled={props.projectId ? true : false} value={props.projectId ? props.projectId : ticketData.projectId ? ticketData.projectId : ""} className="loginInput form-control" id='ticketProject' name="ticketProject" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {projectData.map((project)=>{return(<option key={project._id} value={project._id}>{project.name}</option>)})}
            </select>
            <br/>
            {sprintData[ticketData.projectId] && sprintData[ticketData.projectId].length!=0 && <><label htmlFor='ticketSprint'>Sprint : </label>
            <select value={ticketData.sprintId ? ticketData.sprintId : ""} className="loginInput form-control" id='ticketSprint' name="ticketSprint" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {sprintData[ticketData.projectId].map((sprint)=>{return(<option key={sprint._id} value={sprint._id}>{sprint.name}</option>)})}
            </select>
            <br/></>}
            <label htmlFor='ticketState'>State : </label>
            <select value={ticketData.stateId ? ticketData.stateId : ""} className="loginInput form-control" id='ticketState' name="ticketState" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {stateData.map((state)=>{return(<option key={state._id} value={state._id}>{state.name}</option>)})}
            </select >
            <br/>
            <label htmlFor='ticketPriority'>Priority : </label>
            <select value={ticketData.priority ? ticketData.priority : ""} className="loginInput form-control" id='ticketPriority' name="ticketPriority" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {helper.constants.PRIORITY.map((priority, index)=>{return(<option key={index} value={priority}>{priority}</option>)})}
            </select>
            <br/>
            <label htmlFor='ticketAssign'>Assign : </label>
            <select value={ticketData.assign ? ticketData.assign : ""} className="loginInput form-control" id='ticketAssign' name="ticketAssign" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {userData.map((user)=>{return(<option key={user._id} value={user.email}>{user.email} - {user.role}</option>)})}
            </select>
            <br/>
              <label className="form-label">
                Watchers :
              </label>
            <div className="form-switch">
                  {userData.map((user)=>{
                    return(
                    <div key={user._id} className="form-check mb-2">
                      <input
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
            </div>
            <br/>
            <label  htmlFor='ticketExpectedDate'>Expected Date : </label>
            <DatePicker selected={ticketData.expectedDate && new Date(ticketData.expectedDate)} className="loginInput form-control" id='ticketExpectedDate' name="ticketExpectedDate" onChange={(date)=>setTicketData({...ticketData, expectedDate: date})}/>
            <br/>
            <br/>
            { allTicket.length!=0 && <>
              <label className="form-label">
                Depended On Tickets : 
              </label><div className="form-switch">
                  {allTicket.map((ticket)=>{
                    return(
                    <div key={ticket._id} className="form-check mb-2">
                      <input
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
            </div><br/></>}
            <button type="submit" className="createTicketButton btn btn-primary">Create Ticket</button>
              
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
