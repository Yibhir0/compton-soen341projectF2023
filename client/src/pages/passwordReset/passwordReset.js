import React, {useState} from 'react'
import NavBar from "../../components/menu/navigationBar"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function PasswordReset(){

    const [credentials, setCredentials] = useState({ email: '' });
    const navigate = useNavigate();


    const handlePasswordReset = async (event) =>{
        event.preventDefault();

        if (!credentials.email){
            console.log("email cannot be empty");
            return;
        }
        else{
          console.log("If an account with the corresponding email, an email will be sent");
        }
    }

    return (
    <div className="app">
        <div>
            <NavBar/>
        </div>
        <header className="app-header">
            <h1>Password Reset</h1>
        </header>

        <form onSubmit = {handlePasswordReset} className='h-100 d-flex align-items-center justify-content-center'>
        <div className="mb-3 w-25">
            <br></br>
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value = {credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
            <br></br>
            <div className='form-row text-center'>
                <button type='submit' className="btn btn-info">Reset</button>
            </div>
        </div>
        </form>

    </div>
    
      )
}

export default PasswordReset;