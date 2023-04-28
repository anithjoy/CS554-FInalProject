import React, { useState, useEffect } from 'react';
import {helper} from "../../../helper"
import { api } from "../../../api";
import { useRouter } from 'next/router'

const Project = () => {
  const [data, setData] = useState('');
  const [manager , setManager] = useState('');
  const [name , setProjectName] = useState('');
  const [description , setDescription] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
  const router = useRouter()
  
  const handleInputChange = (e) => {
    if(hasSuccessMessage)
        setHasSuccessMessage(false);
    if(hasError)
        setError(false);
    if(e.target.id === 'projectName')
      setProjectName(e.target.value); 
    else 
    if(e.target.id === 'projectManagerEmail')
      setManager(e.target.value); 
    else 
    if(e.target.id === 'projectDesc')
      setDescription(e.target.value);
  }

  const validateUpdate = async (e) =>{
    e.preventDefault();
    try{
      setManager(helper.validationFunctions.isValidEmail(manager));
      setProjectName(helper.validationFunctions.isValidProjectName(name));
      setDescription(helper.validationFunctions.isValidString(description,"description"))
      setHasError(false);
    }catch(e){
      setHasError(true);
      setError(e.message);
      return;
    }

    try{
      const data = {"name" : name ,"manager" : manager ,"description" : description }
      console.log(data)
      const response = await api.project.updateProject(router.query.projectId,data)
      console.log(response)
      setData(response.data);
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
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await api.project.getProjectById(router.query.projectId);
        console.log(response);
        setData(response.data)
        setManager(response.data.manager)
        setProjectName(response.data.name); 
        setDescription(response.data.description);
        console.log(response.data.watchers);
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
    if(!data){
      fetchData();
    }
  },[])
  return (
    <div>
    {hasSuccessMessage && <div className='successMessage'>Successfully updated</div>}
    {hasError && <div className="error">{error}</div>}
       {data && <div  className='container'>
            <form onSubmit={validateUpdate}>
                <br/>
                <div className="profileInputField"> <label className="profileInputText" htmlFor="profileName"> Name : </label> <input placeholder="Starship" id="projectName" value={name} onChange={handleInputChange} type="text" className="profileInput" autoFocus/></div>
                <br/>
                <div className="profileInputField"><span className="profileInputText" > Creator : </span> <span id="projectCreator">{data.creator}</span> </div>
                <br/>
                <div className="profileInputField"> <label className="profileInputText" htmlFor="profileManager"> Manager : </label> <input placeholder="username@example.com" id="projectManagerEmail" value={manager} onChange={handleInputChange} type="email" className="profileInput" autoFocus/></div>
                <br/>
                <div className="profileInputField"><span className="profileInputText" > Sprints : </span> <span id="profileSprint">
                {
                  data.sprint.map((sprint) =>{
                    return <li key={sprint}> {sprint}</li>
                  })
                }</span> </div>
                <br/>
                <div className="profileInputField"><span className="profileInputText" > Watchers : </span> <span id="profileWatcher">
                {
                  data.watchers.map((watcher) =>{
                    return <li key={watcher}> {watcher}</li>
                  })
                }</span> </div>
                <br/>
                <div className="profileInputField"> <label className="profileInputText" htmlFor="profileDesc"> Description : </label> <textarea placeholder="Starship" id="projectDesc" value={description} onChange={handleInputChange} type="text" className="profileInput" autoFocus/></div>
                <br/>
                <button type="submit" className="updateProfileButton">Update Project
                </button>
            </form>
            </div>}
    </div>
  )
}

export default Project