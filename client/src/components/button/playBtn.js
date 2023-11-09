
import React from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

const PlayBtn = ({ handlePlay }) => {
    return (
        <Tooltip title="Watch">
            <IconButton onClick={handlePlay}>
                <PlayCircleIcon sx={{ color: "#B1B8C2", fontSize: "xxx-large" }} />
            </IconButton>
        </Tooltip>
    )
}

export default PlayBtn;