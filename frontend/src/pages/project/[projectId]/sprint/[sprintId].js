import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../../../api";
import { helper } from "../../../../helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Sprint = () => {

  const [sprintData, setSprintData] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('')
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const sprintDataTemp = await api.project.getSprintById(router.query.projectId, router.query.sprintId);
        console.log(sprintDataTemp.data);
        setSprintData(sprintDataTemp.data)
        setName(sprintDataTemp.data.name)
        setDescription(sprintDataTemp.data.description);
        setStartDate(sprintDataTemp.data.startDate);  
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
    try{
      //console.log(sprintData);
      setName(helper.validationFunctions.isValidSprintName(sprintData.name));
      setDescription(helper.validationFunctions.isValidString(sprintData.description, 'Description'));
      setStartDate(helper.validationFunctions.isValidDate(sprintData.startDate));
      setHasError(false);
    }catch(e){
      setHasError(true);
      setError(e.message);
      return;
    }

    try{
      const data = {"name" : sprintData.name ,"description" : sprintData.description , "startDate" : sprintData.startDate}
      console.log(data)
      const response = await api.project.updateSprint(router.query.projectId, router.query.sprintId ,data)
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