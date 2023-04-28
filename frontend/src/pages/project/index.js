import { useState, useEffect} from "react";
import { api } from "../../api";
import {helper} from "../../helper"
import { useRouter } from "next/router";
import Link from "next/link";
const Projects = () => {
  const [projects,setProjects] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await api.project.getAllProject();
        console.log(response);
        setProjects(response.data);
      }catch(e){
        if(e.response.status===500)
            router.push('/error')
        else{
            setHasError(true);
            setError(e.response.data);
        }
      }
    }
    if(!projects.length){
      fetchData();
    }
  },[])
  return (
    <div>
      <Link href={'/project/create-project'}>Create New Project</Link>
      <h1>Current Projects</h1>
      <ul>
        {
          projects.map((project) => {
            return <li key={project._id}>
              <Link href={`/project/${project._id}`}>{project.name}</Link>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Projects