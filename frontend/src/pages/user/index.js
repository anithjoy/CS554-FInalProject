import { useState, useEffect} from "react";
import { api } from "../../api";
import {ROLE} from "../../helper/constants" 
import {helper} from "../../helper"
import { useRouter } from "next/router";
import Link from "next/link";

const Users = () => {
  const [email, setEmail] = useState(''); 
  const [fullName, setName] = useState('');
  const [Role, setRole] = useState('');
  const [users,setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async()=>{
        try{
            const response = await api.user.getAllUser();
            console.log(response);
            setUsers(response.data)
            setHasError(false);
        }catch(e){
        if(e.response.status===500)
            router.push('/error')
        else{
            setHasError(true);
            setError(e.response.data);
        }
        }
    }
    if(!users.length)
    {
        fetchData();
    }
  },[]);

  return (
    <div>
        <Link href={'/user/create-user'}>Create New User</Link>
        <br></br>
        <h1>Company Users</h1>
        <ul>
        {
          users.map((user) => {
            return <li key={user._id}>
              <Link href={`/user/${user._id}`}>{user.name}</Link>
              </li>
          })
        }
        </ul>
    </div>
  );
};

export default Users;
