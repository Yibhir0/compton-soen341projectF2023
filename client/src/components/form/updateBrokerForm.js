import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  width: 540,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateBrokerForm = ({id}) => {
/*
  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {

        //setIsModalOpen(false);

        //try 

        setCredentials({
          open: !credentials.open
        });
    };
*/
useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/users/${id}`
      );
      const data = await result.json();
      setCredentials({
        ...credentials,
        email: data.email,
        password: data.password,
        accountType: 'broker',
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        licenseNumber: data.licenseNumber,
        agency: data.agency,
    });
    };
    fetchData();
  }, []); 

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    accountType: 'broker',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    licenseNumber: '',
    agency: '',
  });

  

console.log(credentials)
  const handleState = async () => {
    if (!credentials.password || !credentials.email) {
      alert('empty email or password');
      return;
    }

    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/update/broker', credentials);
      alert('Information changed successfully');
      window.location.reload();
    } catch (error) {
      alert(error);
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred: ' + error.message);
      }
    }

    
  };
  const clearFields = () => {
    setCredentials({
      email: '',
      password: '',
      accountType: 'broker',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      licenseNumber: '',
      agency: '',
    });
  };
  const handleRequest = () => {

    setCredentials({
      open: true
    });
  };

  const handleClose = () => {

    setCredentials({
      open: !credentials.open
    });

  }
  return (
    <div>
     <button className="btn btn-secondary mx-auto" onClick={handleRequest}  >Update Broker information</button>
     <Modal open={credentials.open} onClose={handleClose}>
        <Box sx={style}>
          <div>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
          <FilledInput defaultValue={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} name="email"/>
          </FormControl>
                  

          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">First Name</InputLabel>
          <FilledInput defaultValue={credentials.firstName} onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} value={credentials.firstName} type='text' name="firstName" />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Last Name</InputLabel>
          <FilledInput defaultValue={credentials.lastName} onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} value={credentials.lastName} type='text' name="lastName" />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Phone Number</InputLabel>
          <FilledInput defaultValue={credentials.phoneNumber} onChange={(e) => setCredentials({ ...credentials, phoneNumber: e.target.value })} value={credentials.phoneNumber} type='text' name="phoneNumber" />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">License Number</InputLabel>
          <FilledInput defaultValue={credentials.licenseNumber} onChange={(e) => setCredentials({ ...credentials, licenseNumber: e.target.value })} value={credentials.licenseNumber} type='text' name="licenseNumber" />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Agency</InputLabel>
          <FilledInput defaultValue={credentials.agency} onChange={(e) => setCredentials({ ...credentials, agency: e.target.value })} value={credentials.agency} type='text' name="agency" />
          </FormControl>             

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button size="large" variant="contained" onClick={handleState}> Update info</Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateBrokerForm;
