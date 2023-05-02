import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from '../../../../components/authContext';
import { api } from "../../../../api";
import Link from "next/link";

const Sprints = () => {
  const [sprintData, setSprintData] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  //const { projectId } = router.query

  useEffect(() => {
    const fetchData = async () =>{
        try{
            console.log(router.query.projectId);
            const {data: sprintDataTemp} = await api.project.getAllSprint(router.query.projectId);
            console.log(sprintDataTemp)
            setSprintData(sprintDataTemp);
        }
        catch(e){
          console.log(e);
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
    if(!sprintData)
      fetchData();
  },[]);
  return (
    <div>
      {sprintData ? <><Link href={`/project/${router.query.projectId}/sprint/create-sprint`}>
        <button>Create Sprint </button>
      </Link>
      <ul>
        {
          sprintData.map((sprint) => {
            return <li key={sprint._id}>
              <Link href={`/project/${router.query.projectId}/sprint/${sprint._id}`}>{sprint.name}</Link>
            </li>
          })
        }
      </ul>
      </> :
      <div>Loading...</div>}
    </div>
  );
};

export default Sprints