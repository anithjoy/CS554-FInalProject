import React, { useState, useEffect } from 'react';
import {helper} from "../helper"
import { api } from "../api";
import { useRouter } from 'next/router'

const ProjectDetail = (props) => {
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
            const {data} = await api.project.getProjectById(props.projectId);
            setProjectData(data);
            setUserData(userDataTemp);
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
        const projectDataTemp = {...projectData};
    if(e.target.id === 'projectName')
    {
      if(e.target.value=="")
      {
        delete projectDataTemp.name
        setProjectData(projectDataTemp)
        return;
      }
      projectDataTemp.name = e.target.value;
    } 
    else if(e.target.id === 'projectManagerEmail')
    {
      if(e.target.value=="")
      {
        delete projectDataTemp.manager
        setProjectData(projectDataTemp)
        return;
      }
      projectDataTemp.manager = e.target.value; 
    }
    else if(e.target.id === 'projectDesc')
    {
      if(e.target.value=="")
      {
        delete projectDataTemp.description
        setProjectData(projectDataTemp)
        return;
      }
      projectDataTemp.description = e.target.value;
    }
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
      const {data} = await api.project.updateProject(props.projectId, projectDataTemp);
      setHasError(false);
      setHasSuccessMessage(true);
      setUpdateFlag(false);
      setProjectData(data);
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
    if(!projectData.watchers)
      setProjectData({...projectData, watchers: [e.target.value]})
    else{
      const options = projectData.watchers.includes(option)
      ? projectData.watchers.filter((t) => t !== option)
      : [...projectData.watchers, option];
    setProjectData({...projectData, watchers:options});
    }
  };

  return (
    <div>
    {hasSuccessMessage && <div className='successMessage'>Successfully updated</div>}
    {hasError && <div className="error">{error}</div>}
       {projectData && userData && <div  className='container'>
            {(props.user.role.toUpperCase() == "MANAGER" || props.user.role.toUpperCase() == "ADMIN" || props.user.role.toUpperCase() == "SUPER-ADMIN") && <button type="button" onClick={()=>setUpdateFlag(!updateFlag)}>{!updateFlag ? "Edit Project" : "Cancel Edit"}</button>}
            <form onSubmit={validateUpdate}>
                <label htmlFor="projectName">Project Name</label>
                <input disabled={!updateFlag} placeholder="Starship" id="projectName" value={projectData.name ? projectData.name : ""} onChange={handleInputChange}  type="text" className="projectinput" autoFocus/>
                <br/>
                <label htmlFor="projectDesc">description</label>
                <textarea disabled={!updateFlag} placeholder="Project Description" id="projectDesc" value={projectData.description ? projectData.description : ""} onChange={handleInputChange}  className="projectinput" autoFocus/>
                <br/>
                <div className="profileInputField"><span className="profileInputText" > Creator : </span> <span id="projectName">{projectData.creator}</span> </div>
                <br/>
                <label htmlFor='projectManagerEmail'>Manager : </label>
                <select disabled={!updateFlag} value={projectData.manager ? projectData.manager : ""} className="projectinput" id='projectManagerEmail' name="projectManagerEmail" onChange={handleInputChange}>
                  <option value="">Select Option</option>
                  {userData.map((user)=>{if(user.role.toUpperCase()==="MANAGER")return(<option key={user._id} value={user.email}>{user.email}</option>)})}
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
                            checked={projectData.watchers ? projectData.watchers.includes(user.email) : false}
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
                {updateFlag &&<button type="submit" className="updateProfileButton">Update Project</button>}
            </form>
            </div>}
    </div>
  )
}

export default ProjectDetail