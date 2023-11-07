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
                                <h6 style={{ color: 'gray' }}>From: {offer.email}</h6>
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
                                <Box>
                                    <h4>Message</h4>
                                    <p style={style}>{offer.message}</p>
                                </Box>
                                <Box>
                                    <h4>Offer Price</h4>
                                    <p style={style}>{offer.offerPrice}</p>
                                </Box>
                                <Box>
                                    <h4>City</h4>
                                    <p>{offer.city}</p>
                                </Box>
                                <Box>
                                    <h4>Address</h4>
                                    <p>{offer.address}</p>
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