import React, { useState, useEffect } from 'react';
import {helper} from "../../../helper"
import { api } from "../../../api";
import { useRouter } from 'next/router'

const Project = () => {
  const [projectData, setProjectData] = useState({});
  const [userData, setUserData] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
  const router = useRouter()
  
  useEffect(() => {
    const fetchData = async () =>{
        try{
            const {data: userDataTemp} = await api.user.getAllUser();
            const {data} = await api.project.getProjectById(router.query.projectId);
            setProjectData(data);
            setUserData(userDataTemp);
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
        const projectDataTemp = {...projectData};
    if(e.target.id === 'projectName')
    projectDataTemp.name = e.target.value; 
    else if(e.target.id === 'projectManagerEmail')
      projectDataTemp.manager = e.target.value; 
    else if(e.target.id === 'projectDesc')
      projectDataTemp.description = e.target.value;
    else if(e.target.id === 'projectWatchers' ) 
      projectDataTemp.watchers = Array.from(e.target.selectedOptions, option => option.value);
    setProjectData(projectDataTemp); 
  }

  const validateUpdate = async (e) =>{
    e.preventDefault();
    const projectDataTemp ={}
    try{
      projectDataTemp.description = helper.validationFunctions.isValidString(projectData.description);
      projectDataTemp.name  = helper.validationFunctions.isValidProjectName(projectData.name);
      projectDataTemp.manager = helper.validationFunctions.isValidEmail(projectData.manager);
      projectDataTemp.watchers = helper.validationFunctions.isValidWatchers(projectData.watchers);
      setProjectData(projectDataTemp);
    }catch(e){
      setHasError(true);
      setError(e.message);
      return;
    }


    try{
      delete projectDataTemp["_id"];
      delete projectDataTemp["companyId"];
      const {data} = await api.project.updateProject(router.query.projectId, projectDataTemp);
      setHasError(false);
      setHasSuccessMessage(true);
      setProjectData(data);
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
       {projectData && userData && <div  className='container'>
            <button type="button" onClick={()=>setUpdateFlag(!updateFlag)}>{!updateFlag ? "Edit Project" : "Cancel Edit"}</button>
            <form onSubmit={validateUpdate}>
                <label htmlFor="projectName">Project Name</label>
                <input disabled={!updateFlag} placeholder="Starship" id="projectName" value={projectData.name} onChange={handleInputChange}  type="text" className="projectinput" autoFocus/>
                <br/>
                <label htmlFor="projectDesc">description</label>
                <textarea disabled={!updateFlag} placeholder="Project Description" id="projectDesc" value={projectData.description} onChange={handleInputChange}  className="projectinput" autoFocus/>
                <br/>
                <div className="profileInputField"><span className="profileInputText" > Creator : </span> <span id="projectName">{projectData.creator}</span> </div>
                <br/>
                <label htmlFor='projectManagerEmail'>Manager : </label>
                <select disabled={!updateFlag} value={projectData.manager} className="projectinput" id='projectManagerEmail' name="projectManagerEmail" onChange={handleInputChange}>
                  <option value="">Select Option</option>
                  {userData.map((user)=>{if(user.role.toUpperCase()==="MANAGER")return(<option value={user.email}>{user.email}</option>)})}
                </select>
                <br/>
                <label htmlFor='projectWatchers'>Watchers : </label>
                <select disabled={!updateFlag} value={projectData.watchers} className="projectinput" id='projectWatchers' name="projectWatchers" onChange={handleInputChange} multiple>
                  {userData.map((user)=>{return(<option value={user.email}>{user.email}</option>)})}
                </select >
                <br/>
                {updateFlag &&<button type="submit" className="updateProfileButton">Update Project</button>}
            </form>
            </div>}
    </div>
  )
}

export default Project