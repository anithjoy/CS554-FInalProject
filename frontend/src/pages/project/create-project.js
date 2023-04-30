import { useState, useEffect} from "react";
import { api } from "../../api";
import {helper} from "../../helper"
import { useRouter } from "next/router";

const CreateProject = () => {
  const [projectData, setProjectData] = useState({});
  const [userData, setUserData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            const {data: userDataTemp} = await api.user.getAllUser();
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
    setHasError(false);
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

  const validateCreateProjectData = async (e) =>{
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
      const response =  await api.project.createProject(projectDataTemp);
      router.push("/project");
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
        <div className="loginHeading">Create Project</div>
       <div className="CreateUserCard">
        {userData && <form onSubmit={validateCreateProjectData}>
            <label htmlFor="projectName">Enter Project Name</label>
            <input placeholder="Starship" id="projectName" value={projectData.name} onChange={handleInputChange}  type="text" className="projectinput" autoFocus/>
            <br/>
            <label htmlFor="projectDesc">Enter description</label>
            <textarea placeholder="Project Description" id="projectDesc" value={projectData.description} onChange={handleInputChange}  className="projectinput" autoFocus/>
            <br/>
            <label htmlFor='projectManagerEmail'>Manager : </label>
            <select value={projectData.manager} className="projectinput" id='projectManagerEmail' name="projectManagerEmail" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {userData.map((user)=>{if(user.role.toUpperCase()==="MANAGER")return(<option value={user.email}>{user.email}</option>)})}
            </select>
            <br/>
            <label htmlFor='projectWatchers'>Watchers : </label>
            <select value={projectData.watchers} className="projectinput" id='projectWatchers' name="projectWatchers" onChange={handleInputChange} multiple>
              {userData.map((user)=>{return(<option value={user.email}>{user.email}</option>)})}
            </select >
            <br/>
            <button type="submit" className="loginButton">Create Project</button>
        </form>}
        {hasError && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CreateProject;
