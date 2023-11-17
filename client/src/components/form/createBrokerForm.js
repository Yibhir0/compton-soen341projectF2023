import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import axios from 'axios'

const linkStyle = {
    marginTop: "6px",
    textDecoration: "none",
    color: 'gold',
    padding: "4px",
    backgroundColor: "#011a3eea",
    borderRadius: "10px"

};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: "flex",
    flexDirection: 'column',
    transform: 'translate(-50%, -50%)',
    width: 540,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

const CreateBrokerForm = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '', accountType: 'broker', firstName: '', lastName: '', phoneNumber: '', licenseNumber: '', agency: '' });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {

        setIsModalOpen(false);
    };

    const handleState = async () => {

        if (!credentials.password || !credentials.email) {
            alert("empty email or password");
            return;
        }

        axios
            .post(process.env.REACT_APP_BACKEND_URL + '/auth/register/', credentials)
            .then(() => {
                alert('Broker account created')
                setCredentials({ email: '', password: '' });
                closeModal();
            })
            .catch((e) => {
                alert(e.response.data.error);
                setCredentials({ email: '', password: '' });
            })

    };


    return (
        <div>
            <Link onClick={openModal} style={linkStyle}>Add Broker</Link>

            <Modal open={isModalOpen} onClose={closeModal}>

                <Box sx={style}>

                    <div>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
                            <FilledInput onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} name="email" />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Password</InputLabel>
                            <FilledInput onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} type='password' name="password" />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">First Name</InputLabel>
                            <FilledInput onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })} value={credentials.firstName} type='text' name="firstName" />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Last Name</InputLabel>
                            <FilledInput onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })} value={credentials.lastName} type='text' name="lastName" />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Phone Number</InputLabel>
                            <FilledInput onChange={(e) => setCredentials({ ...credentials, phoneNumber: e.target.value })} value={credentials.phoneNumber} type='text' name="phoneNumber" />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">License Number</InputLabel>
                            <FilledInput onChange={(e) => setCredentials({ ...credentials, licenseNumber: e.target.value })} value={credentials.licenseNumber} type='text' name="licenseNumber" />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Agency</InputLabel>
                            <FilledInput onChange={(e) => setCredentials({ ...credentials, agency: e.target.value })} value={credentials.agency} type='text' name="agency" />
                        </FormControl>



                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ backgroundColor: "#011a3eea" }} size="large" variant="contained" onClick={handleState} >Create</Button>
                        </Box>


                    </div>

                </Box>
            </Modal>
        </div>
    )
};

export default CreateBrokerForm;