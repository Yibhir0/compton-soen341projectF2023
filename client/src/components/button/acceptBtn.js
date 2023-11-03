import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

const AcceptBtn = ({ handleAccept }) => {
    return (
        <Tooltip title="Accept">
            <IconButton onClick={handleAccept}>
                <TaskAltIcon sx={{ color: "#22DA8F", fontSize: "xx-large" }} />
            </IconButton>
        </Tooltip>
    )
}

export default AcceptBtn;