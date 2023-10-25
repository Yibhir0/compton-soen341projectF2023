import React, { useState } from 'react';
import axios from 'axios';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const handleReset = () => {
    axios.post('/api/resetPassword', { email })
      .then(response => {
        setResetStatus('Password reset email sent');
      })
      .catch(error => {
        setResetStatus('Error: ' + error.message);
      });
  };

  return (
    <div className="app">
    <header className="app-header">
    <NavBar/>
        <h1>Forgot Password</h1>
    </header>

    <form className='h-100 d-flex align-items-center justify-content-center'>
    <div className="mb-3 w-25">
        <br></br>
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br></br>
        <div className='form-row text-center'>
        <br></br>
          <button onClick={handleReset}type='submit' className="btn btn-info">Reset Password</button>
          <p>{resetStatus}</p>
        </div>
      </div>
    </form>

    </div>
  );
}
export default PasswordReset;
