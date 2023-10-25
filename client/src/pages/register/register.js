import React, {useState} from 'react'
import NavBar from "../../components/menu/navigationBar"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleRegister = (event) =>{
        event.preventDefault();
        if(!password || !email){
            console.log("empty email or password");
            return;
        }
        axios
        .post(process.env.REACT_APP_BACKEND_URL + '/register', {email,password})
        .then(()=>{
            alert('Registration Successful')
            setEmail('')
            setPassword('')
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
            <input onChange={(e) => setEmail(e.target.value)} value = {email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
            <br></br>
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value = {password} type="password" className="form-control " id="password"></input>
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