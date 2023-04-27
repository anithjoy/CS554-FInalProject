import React, { useState, useEffect } from 'react';
import {ROLE} from "../../helper/constants" 
import {helper} from "../../helper"
import { api } from "../../api";
import { useRouter } from 'next/router'

const User = () => {
    const [data, setData] = useState('');
    const [fullName, setName] = useState('');
    const [role, setRole] = useState('');
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const fetchData = async()=>{
            try{
                const response = await api.user.getUserInfo(router.query.userId)
                console.log(response)
                setName(response.data.name);
                setRole(response.data.role);
                setData(response.data);
                setHasError(false);
            }catch(e){
            if(e.response.status===500)
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
        if(!data)
        {
            fetchData();
        }
    },[]);

    const handleInputChange = async(e) => {
        if(hasSuccessMessage)
            setHasSuccessMessage(false);
        if(hasError)
            setError(false);
        if(e.target.id === 'profileName')
            setName(e.target.value);
        else if(e.target.id === 'profileRole')
            setRole(e.target.value);
    }
    
    const validateUpdate = async (e) =>{
        e.preventDefault();
        try
        {
          setName(helper.validationFunctions.isValidName(fullName));
          setRole(helper.validationFunctions.isValidRole(role));
        }catch(e){
            setHasError(true);
            setError(e.message);
            return;
        }
        
        try{
            if(fullName!==data.name || role!==data.role)
            {
                const doctorData = {"name":fullName, "role":role}
                const response = await api.user.updateUser(router.query.userId,doctorData);
                setData(response.data);
                setHasError(false);
                setHasSuccessMessage(true);
            }
        }catch(e){
          if(e.response.status===500)
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
  return (
    <>
    <div> 
        {/* {data && <components.Navbar doctorId={data.doctor._id}/>} */}
        {hasSuccessMessage && <div className='successMessage'>Successfully updated</div>}
        {hasError && <div className="error">{error}</div>}
        {data && <div  className='container'>
            <form onSubmit={validateUpdate}>
                <br/>
                <div className="profileInputField"><span className="profileInputText" > Email : </span> <span id="profileEmail">{data.email}</span> </div>
                <br/>
                <div className="profileInputField"> <span className="profileInputText"> Role : </span> 
                  <select id="profileRole" value={role} onChange={handleInputChange}>
                  {
                      ROLE.map((spec, index) => {
                          return <option value={spec} key={index}>{spec}</option>;
                      })
                  }
                  </select> 
                </div>
                <br/>
                <div className="profileInputField"> <label className="profileInputText" htmlFor="profileName"> Name : </label> <input placeholder="Patrik Hill" id="profileName" value={fullName} onChange={handleInputChange} type="text" className="profileInput" autoFocus/></div>
                <br/>
                <button type="submit" className="updateProfileButton">Update User
                </button>
            </form>
            </div>}
    </div>
    </>
  )
}

export default User;
