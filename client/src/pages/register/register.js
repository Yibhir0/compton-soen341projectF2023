import React, {useState} from 'react'
import NavBar from "../../components/menu/navigationBar"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register(){

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();


    const handleRegister = (event) =>{
        event.preventDefault();
        if(!credentials.password || !credentials.email){
            console.log("empty email or password");
            return;
        }
        axios
        .post(process.env.REACT_APP_BACKEND_URL + '/register', credentials)
        .then(()=>{
            alert('Registration Successful')
            setCredentials({ email: '', password: '' });
            navigate('/login')
        })
        .catch((error) =>{
            console.log('Unable to register user');
        })
    }

    return (
    <div className="app">
        <div>
            <NavBar/>
        </div>
        <header className="app-header">
            <h1>Register</h1>
        </header>

        <form onSubmit = {handleRegister} className='h-100 d-flex align-items-center justify-content-center'>
        <div className="mb-3 w-25">
            <br></br>
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value = {credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
            <br></br>
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value = {credentials.password} type="password" className="form-control " id="password"></input>
            <br></br>
            <div className='form-row text-center'>
                <button type='submit' className="btn btn-info">Register</button>
            </div>
        </div>
        </form>

    </div>
    
      )
}

export default Register;