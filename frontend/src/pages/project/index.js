import { useState, useEffect} from "react";
import { api } from "../../api";
import { useRouter } from "next/router";
import Link from "next/link";
const Projects = () => {
  const [projects,setProjects] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await api.project.getAllProject();
        const {data} = await api.user.getUserInfo();
        setUser(data);
        setProjects(response.data);
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
    if(!projects.length){
      fetchData();
    }
  },[])
  const redirect = (id) =>{
    router.push(`/project/${id}`)
  }
  return (
    <div className="container">
      {hasError && <div className="error">{error}</div>}
      {user && projects && <div>
        {(user.role.toUpperCase() == "MANAGER" || user.role.toUpperCase() == "ADMIN" || user.role.toUpperCase() == "SUPER-ADMIN") && <Link href={'/project/create-project'}><button className='btn btn-primary'>Create New Project</button></Link>}
        <h1>Current Projects</h1>
        {projects!=0 ? <ul className="list-group">
          {
            projects.map((project) => {
              return <li className="list-group-item listHover" key={project._id} onClick={()=>redirect(project._id)}>
                {project.name}
              </li>
            })
          }
        </ul> : <div>No Project found, Please create project</div>}
      </div>}
    </div>
  )
}

export default Projects