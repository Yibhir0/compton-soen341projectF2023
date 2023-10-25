import React, {useState} from 'react'
import NavBar from "../../components/menu/navigationBar"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login(){

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();


    const handleLogin = async (event) =>{
        event.preventDefault();

        if (!credentials.password || !credentials.email){
            console.log("Password and email cannot be empty");
            return;
        }
        try{
          const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/login', credentials);
          const token = response.data.token;
          console.log(response.data);
          setCredentials({ email: '', password: '' });
           localStorage.setItem('token',token);
          navigate('/');
          window.location.reload()
         
        }catch(e){
          alert("Incorrect email or password");
        }
    }

    return (
    <div className="app">
        <div>
            <NavBar/>
        </div>
        <header className="app-header">
            <h1>Login</h1>
        </header>

        <form onSubmit = {handleLogin} className='h-100 d-flex align-items-center justify-content-center'>
        <div className="mb-3 w-25">
            <br></br>
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value = {credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
            <br></br>
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value = {credentials.password} type="password" className="form-control " id="password"></input>
            <br></br>
            <div className='form-row text-center'>
                <button type='submit' className="btn btn-info">Login</button>
            </div>
                <a href="/resetPassword">Forgot password , Reset password</a>
        </div>
        </form>

    </div>
    
      )
}

export default Login;