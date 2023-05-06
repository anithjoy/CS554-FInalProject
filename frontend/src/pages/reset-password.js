import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { helper } from "../helper";
import { useAuth } from '../components/authContext';
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import { api } from "../api";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const { customTokenLogin, signup } = useAuth();
    const router = useRouter();
    const {token} = router.query
  
    useEffect(() => {
        const checkToken = async (token) =>{
            try{
                const {user} = await customTokenLogin(token);
                setEmail(user.uid);
            }
            catch{
                router.push("/login");
            }
        }
        if(token)
        {
            checkToken(token);
        }else{
            router.push("/login");
        }
      },[]);
    const handleInputChange = (e) => {
        if(e.target.id === 'resetPassword')
            setPassword(e.target.value);
        else if(e.target.id === 'resetRepassword')
            setRepassword(e.target.value);
    }
    const validateLogin = async (e) =>{
        e.preventDefault();
        try
        {
            setPassword(helper.validationFunctions.isValidPassword(password));
            setRepassword(helper.validationFunctions.isPasswordSame(repassword,password));
        }catch(e){
            setHasError(true);
            setError(e.message);
            return;
        }
        
        try{
            const data = {"email" : helper.validationFunctions.isValidEmail(email), "password" : helper.validationFunctions.isValidPassword(password)}
            const {user} = await signup(data.email, data.password);
            await AsyncLocalStorage.setItem('token_data', JSON.stringify(user.accessToken));
            await api.login.post({email});
            router.push("/dashboard");
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
    return (
      <div className='resetPasswordPage'>
          <div className="resetPasswordCard" id="resetPassword-form-wrap">    
          <h1>Reset Password</h1>
          <form onSubmit={validateLogin} id="resetPassword-form">             
            <label htmlFor='resetPassword'>Password</label>
            <input id='resetPassword' placeholder="********" name="password" value={password} onChange={handleInputChange} type="password" className="loginInput" />
            <br/>
            <label htmlFor='resetRepassword'>Re-enter Password</label>
            <input id='resetRepassword' placeholder="********" name="password" value={repassword} onChange={handleInputChange} type="password" className="loginInput" />
            <br/>
            <button type="submit" className="loginButton">ResetPassword</button>
          </form>
          <div id="create-account-wrap">
          </div>
          {hasError && <div className="error">{error}</div>}
          </div>
      </div>
    )
}

export default ResetPassword