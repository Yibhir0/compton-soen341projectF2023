import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import axios from 'axios'

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

const CreateBrokerForm = ({}) =>{

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });

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
    

    return(
        <div>
            <Link onClick={openModal}>Create Broker Account</Link>
            <Modal open={isModalOpen} onClose={closeModal}>

                <Box sx={style}>

                <div>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
                    <FilledInput onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email} name="email"/>
                    </FormControl>
                    
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Password</InputLabel>
                    <FilledInput onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} type='password' name="password" />
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button size="large" variant="contained" onClick={handleState} >Create</Button>
                    </Box>


                </div>

                </Box>
            </Modal>
        </div>
    )
};

export default CreateBrokerForm;