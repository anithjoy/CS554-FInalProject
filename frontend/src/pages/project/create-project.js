import { useState, useEffect} from "react";
import { api } from "../../api";
import {ROLE} from "../../helper/constants" 
import {helper} from "../../helper"
import { useRouter } from "next/router";
import { createProject } from "@/api/project";
// import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [managerEmail, setManagerEmail]  = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    if(e.target.id === 'projectName')
      setProjectName(e.target.value); 
    else 
    if(e.target.id === 'projectManagerEmail')
      setManagerEmail(e.target.value); 
    else 
    if(e.target.id === 'projectDesc')
      setDescription(e.target.value);
  }

  const validateCreateProjectData = async (e) =>{
    e.preventDefault();
    try{
      helper.validationFunctions.isValidEmail(managerEmail);
      helper.validationFunctions.isValidProjectName(projectName);
      setHasError(false);
    }catch(e){
      setHasError(true);
      setError(e.message);
      return;
    }

    try{
      const data = {"name" : projectName ,"manager" : managerEmail ,"description" : description }
      const response =  await api.project.createProject(data);
      alert("Project Created");
      router.push("/project");
      setHasError(false);
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
        <form onSubmit={validateCreateProjectData}>
            <label htmlFor="projectName">Enter Project Name</label>
            <input placeholder="Starship" id="projectName" value={projectName} onChange={handleInputChange}  type="text" className="projectinput" autoFocus/>
            <br/>
            <label htmlFor="projectManagerEmail">Enter Manager Email</label>
            <input placeholder="username@example.com" id="projectManagerEmail" value={managerEmail} onChange={handleInputChange}  type="email" className="projectinput" autoFocus/>
            <br/>
            <label htmlFor="projectDesc">Enter description</label>
            <textarea placeholder="Project Description" id="projectDesc" value={description} onChange={handleInputChange}  className="projectinput" autoFocus/>
            <br/>
            <button type="submit" className="loginButton">Create Project</button>
        </form>
        {hasError && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CreateProject;
