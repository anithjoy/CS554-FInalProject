import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { api } from "../api";
import { helper } from "../helper";
import { useAuth } from '../components/authContext'
import AsyncLocalStorage from '@createnextapp/async-local-storage';

const Register = () => {
  const [email, setEmail] = useState('');
  const [EIN,setEIN] = useState(''); 
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [name, setName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  const {signup} = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
      if(e.target.id === 'registerEmail')
          setEmail(e.target.value); 
      else if(e.target.id === 'registerEIN')
          setEIN(e.target.value);
      else if(e.target.id === 'registerPassword')
          setPassword(e.target.value);
      else if(e.target.id === 'registerRepassword')
          setRepassword(e.target.value);
      else if(e.target.id === 'registerName')
          setName(e.target.value);
  }

  const validateSignUp = async (e) =>{
      e.preventDefault();
      try
      {
          setEmail(helper.validationFunctions.isValidEmail(email));
          setEIN(helper.validationFunctions.isValidEIN(EIN));
          setPassword(helper.validationFunctions.isValidPassword(password));
          setRepassword(helper.validationFunctions.isPasswordSame(repassword,password));
          setName(helper.validationFunctions.isValidCompanyName(name));
          setHasError(false);
      }catch(e){
          setHasError(true);
          setError(e.message);
          return;
      }
              
      try{
          const data = {"email" : helper.validationFunctions.isValidEmail(email), 'EIN':helper.validationFunctions.isValidEIN(EIN), "password" : helper.validationFunctions.isValidPassword(password), "name":helper.validationFunctions.isValidCompanyName(name)};
          console.log(signup);
          const {user} = await signup(data.email, data.password);
          await AsyncLocalStorage.setItem('token_data', JSON.stringify(user.accessToken));
          await api.register.post(data);
          router.push("/dashboard");
          setHasError(false);
      }catch(e){
          setHasError(true);
          if(!e.response) setError("Error");
          else setError(e.response.data);
          return;
      }
  }
  return (
    <div>
        <div className="loginHeading">Company Register</div>
        <div id="login-wrap">
        <Link href='/login'>
        Login
        </Link>
        </div>
      <div className="loginCard">
        <form onSubmit={validateSignUp}>
            <label htmlFor="registerEmail">Company(Super Admin) Email</label>
            <input placeholder="username@example.com" id="registerEmail" value={email} onChange={handleInputChange} type="email" className="loginInput" autoFocus/>
            <br/>
            <label htmlFor="registerPassword">Enter Password</label>
            <input placeholder="********" id="registerPassword" value={password} onChange={handleInputChange} type="password" className="loginInput" />
            <br/>
            <label htmlFor="registerRepassword">Re-enter password</label>
            <input placeholder="********" id="registerRepassword" value={repassword} onChange={handleInputChange} type="password" className="loginInput" />
            <br/>
            <br/>
            <label htmlFor="registerEIN">Employer Identification Number (EIN)</label>
            <input placeholder="123456789" id="registerEIN" value={EIN} onChange={handleInputChange} type="text" className="loginInput" />
            <br/>
            <label htmlFor="registerName">Enter Name</label>
            <input placeholder="MSI" id="registerName" value={name} onChange={handleInputChange} type="text" className="loginInput" />
            <br/>
            <button type="submit" className="loginButton">Register</button>
        </form>
        {hasError && <div className="error">{error}</div>}
      </div>
    </div>
  )
}

export default Register