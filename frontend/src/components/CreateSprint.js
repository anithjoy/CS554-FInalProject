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
    setError(false);
    const sprintDataTemp = { ...sprintData };
    if (e.target.id === "sprintName")
    {
      if(e.target.value=="")
      {
        delete sprintDataTemp.name
        setSprintData(sprintDataTemp)
        return;
      } 
      sprintDataTemp.name = e.target.value;
    }
    else if (e.target.id === "sprintDescription")
    {
      if(e.target.value=="")
      {
        delete sprintDataTemp.description
        setSprintData(sprintDataTemp)
        return;
      }
      sprintDataTemp.description = e.target.value;
    }
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
    <div>
        <h1>Sprint</h1>
        {hasError && <div className="error">{error}</div>}   
        <div className="CreateUserCard card p-4 shadow-sm" id="sprintFormWrap">    
          <form onSubmit={validateSprint} id="sprintForm">
            <label htmlFor='sprintName'>Name : </label>
            <input value={sprintData.name ? sprintData.name : ""} className="SprintInput loginInput form-control" id='sprintName' placeholder="Enter Sprint Name" name="sprintName" type="text" onChange={handleInputChange}/>
            <br/>
            <label htmlFor='sprintDescription'>Description : </label>
            <textarea value={sprintData.description ? sprintData.description : ""} className="SprintInput loginInput form-control" id='sprintDescription' placeholder="Enter Sprint Description" name="sprintDescription" type="text" onChange={handleInputChange}/>
            <br/>
            <label  htmlFor='sprintStartDate'>Start Date : </label>
            <DatePicker selected={sprintData.startDate && new Date(sprintData.startDate)} className="SprintInput loginInput form-control" id='sprintStartDate' name="sprintStartDate" onChange={(date)=>setSprintData({...sprintData, startDate: date})}/>
            <br/>
            <br/>
            <button type="submit" className="createSprintButton btn btn-primary">Create Sprint</button>
          </form>
        </div>
    </div>
  )
}

export default CreateSprint