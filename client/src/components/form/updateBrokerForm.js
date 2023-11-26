import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

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


const linkStyle = {
  marginTop: "10px",
  textDecoration: "none",
  color: 'gold',
  padding: "4px",
  backgroundColor: "#011a3eea",
  borderRadius: "10px"

};

const UpdateBrokerForm = ({ id }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '', accountType: 'broker', firstName: '', lastName: '', phoneNumber: '', licenseNumber: '', agency: '' });

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
        accountType: data.accountType,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        licenseNumber: data.licenseNumber,
        agency: data.agency,
      });
    };
    fetchData();
  }, [credentials, id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleState = async () => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + '/update/update-info', credentials)
      .then(() => {
        alert('Account details updated.')
        closeModal();
      })
      .catch((e) => {
        alert("Error");
      })
  };

  return (
    <div>

      <button style={linkStyle} onClick={openModal}  >Update Account </button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={style}>
          <div>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
              <FilledInput readOnly defaultValue={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} name="email" />
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
