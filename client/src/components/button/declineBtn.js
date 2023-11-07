import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";


const DeclineBtn = ({ handleDecline }) => {
    return (
        <Tooltip title="Decline">
            <IconButton onClick={handleDecline}>
                <HighlightOffIcon sx={{ color: "#DA9722", fontSize: "xx-large" }} />
            </IconButton>
        </Tooltip>
    )
}

export default DeclineBtn;