import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import AcceptBtn from '../button/acceptBtn';
import RejectBtn from '../button/rejectBtn';


function OfferAccordion(props) {

    const [offer, setOffer] = useState(props.offer);

    let date;

    if (offer !== null) {
        date = new Date(offer.requestedAt);
    }

    const handleReject = async () => {
        const confirmed = window.confirm('Are you sure you want to reject this offer?');
        if (confirmed) {
            offer.status = "Rejected"
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/offer/offers/update/${offer._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(offer),
            })
            .then(response => response.json())
            .then((data) => {
                ChangeOfferState(data);
            })
            .catch(console.error);

        }
    }

    const ChangeOfferState = async (data) => {
        setOffer((prevState) => ({
            ...prevState,
            data,
        }));
    }

    const handleAccept = async () => {
        let property = {};
        const confirmed = window.confirm('Are you sure you want to accept this offer?');
        if (confirmed) {
            offer.status = "Accepted"
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/offer/offers/update/${offer._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(offer),
            })
            .then(response => response.json())
            .then((data) => {
                ChangeOfferState(data);
            })
            .catch(console.error);

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${offer.propertyId}`)
            .then(response => response.json())
            .then(pr => {
                property = pr;
            })
            .catch(error => {
                console.error('Failed to fetch property details:', error);
            });

            property.propertyType = "Sold"

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${property._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(property),
            })
                .then(response => {
                    if (response.ok) {
                        alert('Changes successful.');
                    }
                });
        
        }

    }
    const style = {
        width: '200px',
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
    };

    return (
        <div>
            {(offer !== null) &&
                <Accordion
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: 2,
                        border: "1px solid #011a3eea",
                        p: 2,
                        m: 2,
                        minWidth: 1000,
                    }}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Box
                                sx={{
                                    p: 2,
                                    mr: 20,
                                }}>
                                <h6 style={{ color: 'gray' }}>Offer from {offer.brokerName}</h6>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',


                                }}>
                                <p style={{ color: 'gray' }}> Time : {date.toLocaleTimeString()}</p>
                                <p style={{ color: 'gray' }}> Date : {date.toLocaleDateString()}</p>
                            </Box>
                            <Box

                                sx={{
                                    ml: 20,
                                }}
                            >
                                <p style={{ color: 'gray' }}>Status: {offer.status}</p>
                            </Box>
                        </Box>
                        {/* </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: "150ch" }}>
                        <Typography >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',

                                    }}>
                                    <h3>Buyer </h3>
                                    <h6>Name: {offer.buyerName}</h6>
                                    <h6>Email: {offer.email}</h6>
                                    <h6 style={style}>Address: {offer.buyerAddress}</h6>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',

                                    }}>
                                    <h3>Broker </h3>
                                    <h6>Name: {offer.brokerName}</h6>
                                    <h6>Liscence: {offer.brokerLiscence}</h6>
                                    <h6>Agency: {offer.brokerAgency}</h6>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',

                                    }}>
                                    <h3>Offer </h3>
                                    <h6>Price: {offer.offerPrice}</h6>
                                    <h6>Deed Sale Date: {offer.deedSaleDate}</h6>
                                    <h6>Occupation Date: {offer.moveInDate}</h6>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',

                                    }}>
                                    <h3>Property </h3>
                                    <h6 style={style}>Address: {offer.address}</h6>
                                    <h6>City: {offer.city}</h6>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                
                                <AcceptBtn handleAccept={handleAccept} />
                                <RejectBtn handleReject={handleReject} />
                            </Box>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    );
}

export default OfferAccordion;