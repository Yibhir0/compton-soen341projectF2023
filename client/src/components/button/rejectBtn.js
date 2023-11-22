import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

const RejectBtn = ({ handleReject }) => {
    return (
        <Tooltip title="Reject">
            <IconButton onClick={handleReject}>
                <HighlightOffIcon sx={{ color: "red", fontSize: "xx-large" }} />
            </IconButton>
        </Tooltip>
    )
}

export default RejectBtn;