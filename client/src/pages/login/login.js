import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { isSignedIn } from '../../utils/auth'

/*This is the login page of the site.
This would allow thoses with account to the site
to access their accounts given their Email address 
and password
*/

function Login() {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn()) {
      navigate('/');
    }
  },);

  if (isSignedIn()) {
    return;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!credentials.password || !credentials.email) {
      console.log("Password and email cannot be empty");
      return;
    }
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/login', credentials);
      const token = await response.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('id', response.data.id);
      setCredentials({ email: '', password: '' });
      alert("login is successful");
      navigate('/');

    } catch (e) {
      alert(e.response.data.error);
    }
  }

  return (
    <div className="app">

      <header className="app-header">
        <h1>Login</h1>
      </header>

      <form onSubmit={handleLogin} className='h-100 d-flex align-items-center justify-content-center'>
        <div className="mb-3 w-25">
          <br></br>
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
          <br></br>
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} type="password" className="form-control " id="password"></input>
          <br></br>
          <div className='form-row text-center'>
            <button type='submit' className="btn btn-info">Login</button>
          </div>
          <br></br>
          <div className='form-row text-center'>
            <p>Forgot password? <a href="/passwordReset">Reset Password</a></p>
          </div>
        </div>
      </form>

    </div>

  )
}

export default Login;
