import { useState, useEffect } from "react";
import { api } from "../../api";
import { ROLE } from "../../helper/constants";
import { helper } from "../../helper";
import { useRouter } from "next/router";
// import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [Role, setRole] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setHasError(false);
    if (e.target.id === "signUpEmail") setEmail(e.target.value);
    else if (e.target.id === "signUpRole") setRole(e.target.value);
    else if (e.target.id === "signUpName") setName(e.target.value);
  };

  const validateCreateUserData = async (e) => {
    e.preventDefault();
    try {
      setEmail(helper.validationFunctions.isValidEmail(email));
      setRole(helper.validationFunctions.isValidRole(Role));
      setName(helper.validationFunctions.isValidName(fullName));
      setHasError(false);
    } catch (e) {
      setHasError(true);
      setError(e.message);
      return;
    }

    try {
      const data = { email: helper.validationFunctions.isValidEmail(email), role: helper.validationFunctions.isValidRole(Role), name: helper.validationFunctions.isValidName(fullName) };
      await api.user.createUser(data);
      router.push("/user");
      setHasError(false);
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
    <div className="container">
      <div className="loginHeading">Create User</div>
      {hasError && (
          <div className="error alert alert-danger mt-3">{error}</div>
        )}
      <div className="CreateUserCard card p-4 shadow-sm">
        <form onSubmit={validateCreateUserData}>
          <div className="form-group">
            <label htmlFor="signUpEmail" className="form-label">
              Enter Name
            </label>
            <input
              placeholder="Elon Musk"
              id="signUpName"
              value={fullName}
              onChange={handleInputChange}
              type="text"
              className="loginInput form-control"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="signUpEmail" className="form-label">
              Enter Email
            </label>
            <input
              placeholder="username@example.com"
              id="signUpEmail"
              value={email}
              onChange={handleInputChange}
              type="email"
              className="loginInput form-control"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="signUpRole" className="form-label">
              Choose a Role
            </label>
            <select
              id="signUpRole"
              value={Role}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">--Choose a Role--</option>
              {ROLE.map((spec, index) => {
                return (
                  <option value={spec} key={index}>
                    {spec}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="loginButton btn btn-primary">
            Register User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
