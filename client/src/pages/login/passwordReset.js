import React, { useState } from 'react';
import NavBar from "../../components/menu/navigationBar"
import axios from 'axios'

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    //to do
    // request server to send a reset code to the user's email.
    // errors or success messages 
  };

  const handlePasswordChange = async () => {
    // Send a request to your server to change the password.
    // errors or success messages 
  };

  return (
    <div className="app">
      <header className="app-header">
          <h1>Password Reset</h1>
      </header> 

      <div className='h-100 d-flex align-items-center justify-content-center'> 
        <div className="mb-3 w-25">
        <br></br>
          <label htmlFor="email" className="form-label align-items-center">Email address</label>
          <br></br>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
          <br></br>
          <div className='form-row text-center'>
          <button onClick={handleResetPassword} className="btn btn-info">Send Reset Code</button>
          </div>
          {code && (
            <div className='form-row text-center'>
              <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp"/>
              <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
              <button onClick={handlePasswordChange} className="btn btn-info" >Reset Password</button>
            </div>
          )}
          <p>{message}</p>
        </div>
      </div>  
      </div>  
    );
  
/*
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
            <br></br>
            <div className='form-row text-center'>
            <p>Forgot password?: <a href="/passwordReset">Reset Password</a></p>
            </div>
        </div>
        </form>
        );*/
}

export default PasswordReset;

