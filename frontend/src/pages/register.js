import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "../api";
import { helper } from "../helper";
import { useAuth } from "../components/authContext";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [EIN, setEIN] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token_data')))
    {
      router.push("/dashboard");
    }
  },[]);

  const handleInputChange = (e) => {
    if (e.target.id === "registerEmail") setEmail(e.target.value);
    else if (e.target.id === "registerEIN") setEIN(e.target.value);
    else if (e.target.id === "registerPassword") setPassword(e.target.value);
    else if (e.target.id === "registerRepassword")
      setRepassword(e.target.value);
    else if (e.target.id === "registerName") setName(e.target.value);
  };

  const validateSignUp = async (e) => {
    e.preventDefault();
    try {
      setEmail(helper.validationFunctions.isValidEmail(email));
      setEIN(helper.validationFunctions.isValidEIN(EIN));
      setPassword(helper.validationFunctions.isValidPassword(password));
      setRepassword(
        helper.validationFunctions.isPasswordSame(repassword, password)
      );
      setName(helper.validationFunctions.isValidCompanyName(name));
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

    try {
      const data = {
        email: helper.validationFunctions.isValidEmail(email),
        EIN: helper.validationFunctions.isValidEIN(EIN),
        password: helper.validationFunctions.isValidPassword(password),
        name: helper.validationFunctions.isValidCompanyName(name),
      };
      await api.register.post(data);
      const { user } = await signup(data.email, data.password);
      await AsyncLocalStorage.setItem(
        "token_data",
        JSON.stringify(user.accessToken)
      );
      router.push("/dashboard");
      setHasError(false);
    } catch (e) {
      setHasError(true);
      if (!e.response) setError("Error");
      else setError(e.response.data);
      return;
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card my-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Company Register</h3>
              <div className="d-flex justify-content-end mb-3">
                <Link href="/login" className="btn btn-link">
                  Login
                </Link>
              </div>
              <form onSubmit={validateSignUp}>
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">
                    Company (Super Admin) Email
                  </label>
                  <input
                    placeholder="username@example.com"
                    id="registerEmail"
                    value={email}
                    onChange={handleInputChange}
                    type="email"
                    className="form-control"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">
                    Enter Password
                  </label>
                  <input
                    placeholder="********"
                    id="registerPassword"
                    value={password}
                    onChange={handleInputChange}
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerRepassword" className="form-label">
                    Re-enter password
                  </label>
                  <input
                    placeholder="********"
                    id="registerRepassword"
                    value={repassword}
                    onChange={handleInputChange}
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerEIN" className="form-label">
                    Employer Identification Number (EIN)
                  </label>
                  <input
                    placeholder="123456789"
                    id="registerEIN"
                    value={EIN}
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">
                    Enter Name
                  </label>
                  <input
                    placeholder="MSI"
                    id="registerName"
                    value={name}
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
              {hasError && (
                <div className="alert alert-danger mt-3">{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
