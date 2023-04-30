import { useState, useEffect} from "react";
import { api } from "../../api";
import { useRouter } from "next/router";
import Link from "next/link";
const Projects = () => {
  const [projects,setProjects] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
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
  const redirect = (id) =>{
    router.push(`/project/${id}`)
  }
  return (
    <div>
      <Link href={'/project/create-project'}><button>Create New Project</button></Link>
      <h1>Current Projects</h1>
      <ul>
        {
          projects.map((project) => {
            return <li key={project._id} onClick={()=>redirect(project._id)}>
              {project.name}
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Projects