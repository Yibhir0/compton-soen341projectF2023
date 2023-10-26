
import React, { useState} from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 540,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const VisitForm = (property) => {
 
    const [visit, setVisit] = useState({
        email:"",
        message:"",  
        
    });

    const handleState = async  () => {
        
        const visitBody = {
            email:visit.email,
            message:visit.message,
            brokerId:property.brokerId,
            propertyId: property.propertyId

        };

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/visit/visit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(visitBody),
          })
            .then(response =>{
              if(response.ok){
                
              }
            });
            
            clearFields();
          
          };

  
    /**
     * Clear input fields
     */
    function clearFields(){
      setVisit({
        email:"",  
        message :"",
        open:false
      
      })
    }
    const handleClose = () => {
 
        setVisit({
          open:!visit.open
      });  

    }

    const handleRequest = () => {
 
        setVisit({
          open:true
      });  

    }
    const handleChange = (evt) => {
        const value = evt.target.value;
        setVisit({
          ...visit,
          [evt.target.name]: value,
        });
      };  
  return (

    <div>

    <button onClick={handleRequest}  >Request</button>

    <Modal 
        open={visit.open}
        onClose={handleClose}>
        
    <Box sx={style}>
    
      <div>
        <FormControl fullWidth sx={{ m: 1,width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
          <FilledInput name="address" onChange={handleChange} value={visit.email}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1,width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Message</InputLabel>
          <FilledInput multiline name="city" onChange={handleChange} value={visit.message}
          />
        </FormControl>
        
         <Box sx={{ m:1,display: 'flex', justifyContent: 'space-between' }}>
            <Button size="large" variant="contained" onClick= { handleState}  >Request</Button>
    
        </Box> 
      
      
      </div>
    
    </Box>
    </Modal>
            
    </div>
  );
}

export default VisitForm;