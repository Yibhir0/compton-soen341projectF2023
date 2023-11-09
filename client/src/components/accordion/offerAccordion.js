import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import DeclineBtn from '../button/declineBtn';
import AcceptBtn from '../button/acceptBtn';
import DeleteBtn from '../button/deleteBtn';


function OfferAccordion(props) {

    const [offer, setOffer] = useState(props.offer);
    let date;

    if (offer !== null) {
        date = new Date(offer.requestedAt);
    }


    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this offer?');
        if (confirmed) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/offer/offers/${offer._id}`, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {
                        alert('Offer deleted successfully');
                        setOffer(null)
                    }
                })
                .catch(error => {
                    console.error('Failed to delete offer', error);
                });
        }
    }

    const ChangeOfferState = async (data) => {
        setOffer((prevState) => ({
            ...prevState,
            data,
        }));
    }

    const handleAccept = async () => {


        let updatedOffer = offer;

        updatedOffer.accepted = !offer.accepted


        await fetch(`${process.env.REACT_APP_BACKEND_URL}/offer/offers/${offer._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedOffer),
            })
            .then(response => response.json())
            .then((data) => {
                ChangeOfferState(data);
            })
            .catch(console.error);
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
                        p: 2,
                        m: 2,
                        minWidth: 300,
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
                                <h6 style={{ color: 'gray' }}>Offer From {offer.buyerName}</h6>
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
                                <p style={{ color: 'gray' }}>Status: {offer.accepted ? 'Accepted' : 'Pending'}</p>
                            </Box>
                        </Box>
                        {/* </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: "100ch" }}>
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
                                    <h5>Buyer </h5>
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
                                    <h5>Broker </h5>
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
                                    <h5>Offer </h5>
                                    <h6>Price: {offer.offerPrice}</h6>
                                    <h6>Deed Sale Date: {offer.deedSaleDate}</h6>
                                    <h6>occupation Date: {offer.moveInDate}</h6>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',

                                    }}>
                                    <h5>Property </h5>
                                    <h6 style={style}>Address: {offer.address}</h6>
                                    <h6>City: {offer.city}</h6>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {!offer.accepted ?
                                    <AcceptBtn handleAccept={handleAccept} />
                                    :
                                    <DeclineBtn handleDecline={handleAccept} />
                                }
                                <DeleteBtn handleDelete={handleDelete} />
                            </Box>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    );
}

export default OfferAccordion;