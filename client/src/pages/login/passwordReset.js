import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function PasswordReset() {
  const navigate = useNavigate();
  const [codeSent, setCodeSent] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', code: '', password: ''});

  const handleResetPassword = async (event) => {//send reset code
    event.preventDefault();

    if (!credentials.email) {
      alert("Email cannot be empty");
      return;
    }

    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/reset/code', credentials);
      
      setCodeSent(true); // Update the codeSent state

      alert("Code sent successfully");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred: " + error.message);
      }
    }
  }


  const handlePasswordChange = async (event) => {//change password
    event.preventDefault();

      if (!credentials.email || !credentials.code || !credentials.password) {
        alert("Field must all be complete");
        return;
      }
      try {
        await axios.post(process.env.REACT_APP_BACKEND_URL + '/reset/password', credentials);
        
        setCredentials({ email: '', code: '', password: '' });
      
        alert("Password changed successfully");
        setCodeSent(false); // Update the codeSent state
        navigate('/');
        window.location.reload()
      } catch (error) {
        alert(error)
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("An error occurred: " + error.message);
        }
      }



  }
  const Reset = codeSent ? (
    <>
      <label htmlFor="email" className="form-label align-items-center">Email address</label>
      <br></br>
      <input readOnly defaultValue={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value = {credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
      <br></br>
      <label htmlFor="newPassword" className="form-label align-items-center">New password</label>
      <br></br>
      <input onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value = {credentials.password} type="password" className="form-control " id="password"></input>
      <br></br>
      <label htmlFor="code" className="form-label align-items-center">verification Code</label>
      <br></br>
      <input onChange={(e) => setCredentials({ ...credentials, code: e.target.value })} value = {credentials.code} type="code" className="form-control" id="code" ></input>
      <br></br>
<div className='form-row text-center'>
  <button onClick={handlePasswordChange} className="btn btn-info">Change Password</button>
</div>
    </>
  ) : (
    //Available navbar links only if codeSent is false
    <>
     <label htmlFor="email" className="form-label align-items-center">Email address</label>
      <br></br>
      <input onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value = {credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
      <br></br>
<div className='form-row text-center'>
  <button onClick={handleResetPassword} className="btn btn-info">Send Reset Code</button>
</div>

    </>
  );

  return (
  
    <div className="app">
      <header className="app-header">
          <h1>Password Reset</h1>
      </header> 

      <div className='h-100 d-flex align-items-center justify-content-center'> 
        <div className="mb-3 w-25">
        <br></br>
          {Reset}
        </div>
      </div>
    </div>     
    );
}

export default PasswordReset;

