import React, {useState} from 'react'
import NavBar from "../../components/menu/navigationBar"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (event) =>{
        event.preventDefault();

        if(!password || !email){
            console.log("Password and email cannot be empty");
            return;
        }
        try{
          const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/login', {email,password});
          const token = response.data.token;
          console.log(response.data);
          setEmail('')
          setPassword('')
          navigate('/')
          window.location.reload()
          localStorage.setItem('token',token);
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
            <input onChange={(e) => setEmail(e.target.value)} value = {email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
            <br></br>
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value = {password} type="password" className="form-control " id="password"></input>
            <br></br>
            <div className='form-row text-center'>
                <button type='submit' className="btn btn-info">Login</button>
            </div>
        </div>
        </form>

    </div>
    
      )
}

export default Login;