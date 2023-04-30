import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { helper } from "../helper";
import { useAuth } from "../components/authContext";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    if (e.target.type === "email") setEmail(e.target.value);
    else setPassword(e.target.value);
  };
  const validateLogin = async (e) => {
    e.preventDefault();
    try {
      setEmail(helper.validationFunctions.isValidEmail(email));
      setPassword(helper.validationFunctions.isValidPassword(password));
    } catch (e) {
      setHasError(true);
      setError(e.message);
      return;
    }

    try {
      const data = {
        email: helper.validationFunctions.isValidEmail(email),
        password: helper.validationFunctions.isValidPassword(password),
      };
      const { user } = await login(data.email, data.password);
      await AsyncLocalStorage.setItem(
        "token_data",
        JSON.stringify(user.accessToken)
      );
      router.push("/dashboard");
    } catch (e) {
      setHasError(true);
      setError(e.response.data);
      return;
    }
  };
  return (
    <div className="loginPage">
      <div className="loginCard card" id="login-form-wrap">
        <h1 className="card-title">Login</h1>
        <form onSubmit={validateLogin} id="login-form">
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              type="email"
              className="form-control"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              type="password"
              className="form-control"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div id="create-account-wrap" className="mt-3">
          <Link href="/register">Register</Link>
        </div>
        {hasError && (
          <div className="error alert alert-danger mt-3">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
