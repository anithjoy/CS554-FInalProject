import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../../../api";
import { helper } from "../../../../helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Sprint = () => {

  const [sprintData, setSprintData] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('')
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const sprintDataTemp = await api.project.getSprintById(router.query.projectId, router.query.sprintId);
        console.log(sprintDataTemp.data);
        setSprintData(sprintDataTemp.data);  
      }catch(e){
        if(e.response.status===500)
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
    if(!sprintData){
      fetchData();
    }
  },[])

  const handleInputChange = (e) => {
    const sprintDataTemp = { ...sprintData };
    if(hasSuccessMessage)
        setHasSuccessMessage(false);
    if(hasError)
        setError(false);
    if (e.target.id === "sprintName") 
      sprintDataTemp.name = e.target.value;
    else if (e.target.id === "sprintDescription")
      sprintDataTemp.description = e.target.value;
    // else if (e.target.id === "sprintStartDate")
    //   sprintDataTemp.startDate = e.target.value;
    setSprintData(sprintDataTemp);
  }

  const validateUpdate = async (e) =>{
    e.preventDefault();
    const sprintDataTemp = {};
    try{
      //console.log(sprintData);
      sprintDataTemp.name = helper.validationFunctions.isValidSprintName(sprintData.name);
      sprintDataTemp.description = helper.validationFunctions.isValidString(sprintData.description, 'Description');
      sprintDataTemp.startDate = helper.validationFunctions.isValidDate(sprintData.startDate);
      if(sprintData.endDate)
        sprintDataTemp.endDate = helper.validationFunctions.isValidDate(sprintData.endDate);
      setHasError(false);
    }catch(e){
      setHasError(true);
      setError(e.message);
      return;
    }

    try{
      const response = await api.project.updateSprint(router.query.projectId, router.query.sprintId ,sprintDataTemp)
      console.log(response)
      setSprintData(response.data);
      setHasError(false);
      setHasSuccessMessage(true);
    }catch(e){
      console.log(e)
      setHasError(true);
      if(!e.response) setError("Error");
      else setError(e.response.data);
      return;
    }
  }
  return (
    <div>
    {hasSuccessMessage && <div className='successMessage'>Successfully updated</div>}
    {hasError && <div className="error">{error}</div>}
       {sprintData && <div  className='container'>
            <form onSubmit={validateUpdate}>
                <br/>
                <div className="sprintInputField"> <label className="sprintInputText" htmlFor="sprintName"> Name : </label> <input placeholder="Sprint Name" id="sprintName" value={sprintData.name} onChange={handleInputChange} type="text" className="sprintInput" autoFocus/></div>
                <br/>
                <label  htmlFor='sprintStartDate'>Start Date : </label>
                <DatePicker className="sprintInputField" id='sprintStartDate' name="sprintStartDate" selected={new Date(sprintData.startDate)} onChange={(date)=>setSprintData({...sprintData, startDate: date})} />
                <br/>
                <label  htmlFor='sprintEndDate'>End Date : </label>
                <DatePicker className="sprintInputField" id='sprintEndDate' name="sprintEndDate" selected={sprintData.endDate && new Date(sprintData.endDate)} onChange={(date)=>setSprintData({...sprintData, endDate: date})} />
                <br/>
                <div className="sprintInputField"> <label className="sprintInputText" htmlFor="sprintDescription"> Description : </label> <textarea placeholder="Description" id="sprintDescription" value={sprintData.description} onChange={handleInputChange} type="text" className="sprintInput" autoFocus/></div>
                <br/>
                <button type="submit" className="updateSprintButton">Update Sprint
                </button>
            </form>
            </div>}
    </div>
  )
}

export default Sprint