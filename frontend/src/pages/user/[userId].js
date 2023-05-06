import React, { useState, useEffect } from "react";
import { ROLE } from "../../helper/constants";
import { helper } from "../../helper";
import { api } from "../../api";
import { useRouter } from "next/router";

const User = () => {
  const [data, setData] = useState("");
  const [fullName, setName] = useState("");
  const [role, setRole] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const [hasSuccessMessage, setHasSuccessMessage] = useState(false);
  const router = useRouter();
    useEffect(() => {
        const fetchData = async()=>{
            try{
                const response = await api.user.getUserById(router.query.userId)
                console.log(response)
                setName(response.data.name);
                setRole(response.data.role);
                setData(response.data);
                setHasError(false);
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
    if (!data) {
      fetchData();
    }
  }, []);

  const handleInputChange = async (e) => {
    if (hasSuccessMessage) setHasSuccessMessage(false);
    if (hasError) setError(false);
    if (e.target.id === "profileName") setName(e.target.value);
    else if (e.target.id === "profileRole") setRole(e.target.value);
  };

  const validateUpdate = async (e) => {
    e.preventDefault();
    try {
      setName(helper.validationFunctions.isValidName(fullName));
      setRole(helper.validationFunctions.isValidRole(role));
    } catch (e) {
      setHasError(true);
      setError(e.message);
      return;
    }

    try {
      if (helper.validationFunctions.isValidName(fullName) !== data.name || helper.validationFunctions.isValidRole(role) !== data.role) {
        const doctorData = { name: helper.validationFunctions.isValidName(fullName), role: helper.validationFunctions.isValidRole(role) };
        const response = await api.user.updateUser(
          router.query.userId,
          doctorData
        );
        setData(response.data);
        setHasError(false);
        setHasSuccessMessage(true);
      }
    } catch (e) {
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
  };
  return (
    <>
      <div className="container">
        {hasError && <div className="alert alert-danger">{error}</div>}
        {hasSuccessMessage && (
          <div className="alert alert-success">Successfully updated</div>
        )}
        {data && (
          <form onSubmit={validateUpdate}>
            <div className="form-group">
              <label htmlFor="profileEmail">Email :</label>
              <span id="profileEmail">{data.email}</span>
            </div>
            <div className="form-group">
              <label htmlFor="profileRole">Role :</label>
              <select
                id="profileRole"
                value={role}
                onChange={handleInputChange}
                className="form-control"
              >
                {ROLE.map((spec, index) => {
                  return (
                    <option value={spec} key={index}>
                      {spec}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="profileName">Name :</label>
              <input
                placeholder="Patrik Hill"
                id="profileName"
                value={fullName}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update User
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default User;
