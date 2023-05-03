import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../api";
import Link from "next/link";

const DisplaySprints = (props) => {
  const [sprintData, setSprintData] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const projectId  = props.projectId;

  useEffect(() => {
    const fetchData = async () =>{
        try{
            console.log(projectId);
            const {data: sprintDataTemp} = await api.project.getAllSprint(projectId);
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
      {sprintData ? <>
      <ul>
        {
          sprintData.map((sprint) => {
            return <li key={sprint._id} id={sprint._id} onClick={(e)=>{props.setSprintId(e.target.id);
              props.setTab("Edit-Sprint")}}>
              {sprint.name}
            </li>
          })
        }
      </ul>
      </> :
      <div>Loading...</div>}
    </div>
  );
};

export default DisplaySprints