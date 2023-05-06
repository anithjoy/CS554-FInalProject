import { useState } from "react";
import { api } from "../api";
import { helper } from "../helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSprint = (props) => {

  const [sprintData, setSprintData] = useState({});
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('')
  const projectId  = props.projectId;
  
  const handleInputChange = (e) => {
    const sprintDataTemp = { ...sprintData };
    if (e.target.id === "sprintName") 
      sprintDataTemp.name = e.target.value;
    else if (e.target.id === "sprintDescription")
      sprintDataTemp.description = e.target.value;
    else if (e.target.id === "sprintStartDate")
      sprintDataTemp.startDate = e.target.value;
    setSprintData(sprintDataTemp);
  };

  const validateSprint = async (e) =>{
    e.preventDefault();
    try
    {
        setSprintData(helper.validationFunctions.isValidSprintData(sprintData));
    }catch(e){
        console.log(e);
        setHasError(true);
        setError(e.message);
        return;
    }
    
    try{
        const data = helper.validationFunctions.isValidSprintData(sprintData);
        await api.project.createSprint(projectId, data);
        props.setTab("All-Sprints");
        setHasError(false);
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
    <div className='sprintPage'>
        {hasError && <div className="error">{error}</div>}   
        <div className="sprintCard" id="sprintFormWrap">    
          <h1>Sprint</h1>
          <form onSubmit={validateSprint} id="sprintForm">
            <label htmlFor='sprintName'>Name : </label>
            <input value={sprintData.name} className="SprintInput" id='sprintName' placeholder="Enter Sprint Name" name="sprintName" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='sprintDescription'>Description : </label>
            <textarea value={sprintData.description} className="SprintInput" id='sprintDescription' placeholder="Enter Sprint Description" name="sprintDescription" type="text" onChange={handleInputChange}/>
            <br/>
            <label  htmlFor='sprintStartDate'>Start Date : </label>
            <DatePicker selected={sprintData.startDate && new Date(sprintData.startDate)} className="SprintInput" id='sprintStartDate' name="sprintStartDate" onChange={(date)=>setSprintData({...sprintData, startDate: date})}/>
            <br/>
            <button type="submit" className="createSprintButton">Create Sprint</button>
              
          </form>
        </div>
    </div>
  )
}

export default CreateSprint