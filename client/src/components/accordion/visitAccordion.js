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


function VisitAccordion(props) {

    const [visit, setVisit] = useState(props.visit);
    let date;

    if (visit !== null) {
        date = new Date(visit.requestedAt);
    }

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this visit?');
        if (confirmed) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/visit/visits/${visit._id}`, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {
                        alert('Visit deleted successfully');
                        setVisit(null)
                    }
                })
                .catch(error => {
                    console.error('Failed to delete visit', error);
                });
        }
    }

    const ChangeVisitState = async (data) => {
        setVisit((prevState) => ({
            ...prevState,
            data,
        }));
    }

    const handleAccept = async () => {


        let updatedVisit = visit;

        updatedVisit.accepted = !visit.accepted


        await fetch(`${process.env.REACT_APP_BACKEND_URL}/visit/visits/${visit._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedVisit),
            })
            .then(response => response.json())
            .then((data) => {
                ChangeVisitState(data);
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
            {(visit !== null) &&
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
                                <h6 style={{ color: 'gray' }}>From: {visit.email}</h6>
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
                                <p style={{ color: 'gray' }}>Status: {visit.accepted ? 'Accepted' : 'Pending'}</p>
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
                                    <p style={style}>{visit.message}</p>
                                </Box>
                                <Box>
                                    <h4>City</h4>
                                    <p>{visit.city}</p>
                                </Box>
                                <Box>
                                    <h4>Address</h4>
                                    <p>{visit.address}</p>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {!visit.accepted ?
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

export default VisitAccordion;