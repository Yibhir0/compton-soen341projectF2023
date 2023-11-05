
import React, { useState } from 'react';
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
  display: "flex",
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  width: 540,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const OfferForm = ({ property }) => {

  const [offers, setOffer] = useState({
    email: "",
    message: "",
    price: "",

  });

  const handleState = async () => {
    console.log("BorekerId:" + property.brokerID);
    let date = new Date();
    const offerBody = {
      email: offers.email,
      message: offers.message,
      brokerID: property.brokerID,
      propertyId: property._id,
      address: property.address,
      city: property.city,
      requestedAt: date
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/offer/offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerBody),
    })
      .then(response => {
        if (response.ok) {
          alert('Broker will contact you soon!!')
        }
      });

    clearFields();

  };

  /**
   * Clear input fields
   */
  function clearFields() {
    setOffer({
      email: "",
      message: "",
      price: "",
      open: false

    })
  }
  const handleClose = () => {

    setOffer({
      open: !offers.open
    });

  }

  const handleRequest = () => {

    setOffer({
      open: true
    });

  }
  const handleChange = (evt) => {
    const value = evt.target.value;
    setOffer({
      ...offers,
      [evt.target.name]: value,
    });
  };
  return (

    <div>

      <button className="btn btn-secondary mx-auto" onClick={handleRequest}  >Make an Offer</button>

      <Modal
        open={offers.open}
        onClose={handleClose}>

        <Box sx={style}>

          <div>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
              <FilledInput name="email" onChange={handleChange} value={offers.email}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Message</InputLabel>
              <FilledInput multiline name="message" onChange={handleChange} value={offers.message}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Offer price</InputLabel>
              <FilledInput multiline name="price" onChange={handleChange} value={offers.price}
              />
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button size="large" variant="contained" onClick={handleState}  >Make an Offer</Button>

            </Box>


          </div>

        </Box>
      </Modal>

    </div>
  );
}

export default OfferForm;