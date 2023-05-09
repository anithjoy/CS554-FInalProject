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

  const validateCreateProjectData = async (e) =>{
    e.preventDefault();
    const projectDataTemp ={}
    try{
      projectDataTemp.description = helper.validationFunctions.isValidDescription(projectData.description);
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
      await api.project.createProject(projectDataTemp);
      router.push("/project");
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
    setHasError(false);
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
    <div className="container">
        <h1>Create Project</h1>
       <div className="CreateUserCard card p-4 shadow-sm">
        {hasError && <div className="error">{error}</div>}
        {userData && <form onSubmit={validateCreateProjectData}>
            <label htmlFor="projectName">Enter Project Name :</label>
            <input placeholder="Starship" id="projectName" value={projectData.name ? projectData.name : ""} onChange={handleInputChange}  type="text" className="form-control" autoFocus/>
            <br/>
            <label htmlFor="projectDesc">Enter Description :</label>
            <textarea placeholder="Project Description" id="projectDesc" value={projectData.description ? projectData.description : ""} onChange={handleInputChange}  className="form-control"/>
            <br/>
            <label htmlFor='projectManagerEmail'>Manager :</label>
            <select value={projectData.manager ? projectData.manager : ""} className="form-control" id='projectManagerEmail' name="projectManagerEmail" onChange={handleInputChange}>
              <option value="">Select Option</option>
              {userData.map((user)=>{if(user.role.toUpperCase()==="MANAGER")return(<option key={user._id} value={user.email}>{user.email}</option>)})}
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
                        checked={projectData.watchers ? projectData.watchers.includes(user.email) : false}
                        onChange={handleWatchersSelect}
                        className="form-check-input form-control"
                        id={user._id}
                      />
                      <label htmlFor={user._id} className="form-check-label">
                        {user.email} - {user.role}
                      </label>
                    </div>)
                  })}
                  </div>
            <br/>
            <button type="submit" className="loginButton btn btn-primary">Create Project</button>
        </form>}
      </div>
    </div>
  );
};

export default CreateProject;
