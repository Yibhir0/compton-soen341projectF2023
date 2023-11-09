
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
    offerPrice: "",
    deedSaleDate: "",
    moveInDate: "",
    buyerName: "",
    buyerAddress: "",
    brokerName: "",
    brokerLiscence: "",
    brokerAgency: "",
  });

  const handleState = async () => {
    console.log("BorekerId:" + property.brokerID);
    let date = new Date();
    const offerBody = {
      offerPrice: offers.offerPrice,
      deedSaleDate: offers.deedSaleDate,
      moveInDate: offers.moveInDate,

      buyerName: offers.buyerName,
      email: offers.email,
      buyerAddress: offers.buyerAddress,

      brokerName: offers.brokerName,
      brokerLiscence: offers.brokerLiscence,
      brokerAgency: offers.brokerAgency,

      brokerID: property.brokerID,
      propertyId: property._id,
      address: property.address,
      city: property.city,
      requestedAt: date,
      

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
      offerPrice: "",
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
            <h5>Property</h5>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Address</InputLabel>
              <FilledInput multiline readOnly name="address" onChange={handleChange} defaultValue={property.address} value={offers.address} 
              />
            </FormControl>

            <h5>Offer information</h5>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Offer price</InputLabel>
              <FilledInput multiline name="offerPrice" onChange={handleChange} value={offers.offerPrice}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Deed Sale Date</InputLabel>
              <FilledInput multiline name="deedSaleDate" onChange={handleChange} value={offers.deedSaleDate}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Occupation Date</InputLabel>
              <FilledInput multiline name="moveInDate" onChange={handleChange} value={offers.moveInDate}
              />
            </FormControl>

            <h5>Client information</h5>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Name</InputLabel>
              <FilledInput name="buyerName" onChange={handleChange} value={offers.buyerName}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
              <FilledInput name="email" onChange={handleChange} value={offers.email}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Address</InputLabel>
              <FilledInput name="buyerAddress" onChange={handleChange} value={offers.buyerAddress}
              />
            </FormControl>

            <h5>Broker information</h5>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Name</InputLabel>
              <FilledInput multiline name="brokerName" onChange={handleChange} value={offers.brokerName}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">License Number</InputLabel>
              <FilledInput multiline name="brokerLiscence" onChange={handleChange} value={offers.brokerLiscence}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Agency</InputLabel>
              <FilledInput multiline name="brokerAgency" onChange={handleChange} value={offers.brokerAgency}
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