import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


/*This is the broker registration page of the site.
This would create an new account to the site alerting
an admin that the new user would like broker 
privelages to the site
*/
function BrokerRegister() {

    const [credentials, setCredentials] = useState({ email: '', password: '', accountType: 'broker', firstName: '', lastName: '', phoneNumber: '', licenseNumber:'', agency:'' });
    const navigate = useNavigate();

    const handleRegister = (event) => {


        event.preventDefault();
        if (!credentials.password || !credentials.email) {
            console.log("empty email or password");
            return;
        }

        axios
            .post(process.env.REACT_APP_BACKEND_URL + '/auth/register/', credentials)
            .then(() => {
                alert('Registration Successful')
                setCredentials({ email: '', password: '', accountType: 'broker', firstName: '', lastName: '', phoneNumber: '', licenseNumber:'', agency:'' });
                navigate('/login')
            })
            .catch((error) => {
                console.log('Unable to register user');
            })
    }

    return (
        <div className="app">

            <header className="app-header">
                <h1>Broker Registration Page</h1>
            </header>

            <form onSubmit={handleRegister} className='h-100 d-flex align-items-center justify-content-center'>
                <div className="mb-3 w-25">
                    <br></br>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input required onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
                    
                    <br></br>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input required onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} type="password" className="form-control " id="password"></input>
                    
                    <br></br>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input required onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} value={credentials.firstName} className="form-control" type='text' id="firstName"></input>
                    
                    <br></br>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input required onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} value={credentials.lastName} className="form-control" type='text' id="lastName"></input>
                    
                    <br></br>
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input required onChange={(e) => setCredentials({ ...credentials, phoneNumber: e.target.value })} value={credentials.phoneNumber} className="form-control" type="tel" id="phoneNumber"></input>
                    
                    <br></br>
                    <label htmlFor="licenseNumber" className="form-label">License Number</label>
                    <input required onChange={(e) => setCredentials({ ...credentials, licenseNumber: e.target.value })} value={credentials.licenseNumber} className="form-control" id="licenseNumber"></input>

                    <br></br>
                    <label htmlFor="agency" className="form-label">Agency</label>
                    <input required onChange={(e) => setCredentials({ ...credentials, agency: e.target.value })} value={credentials.agency} className="form-control" id="agency"></input>

                    <br></br>

                    <div className='form-row text-center'>
                        Upon successfully registering, please wait for us to verify your account before signing in. This process may take up to 24 hours, depending on the volume of requests.
                    </div>
                   

                    <br></br>
                    <div className='form-row text-center'>
                        <button type='submit' className="btn btn-info">Register</button>
                    </div>
                </div>
            </form>

        </div>

    )
}

export default BrokerRegister;