import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

const EditBtn = ({ handleEdit }) => {
    return (
        <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
                <EditIcon sx={{ color: "#fcba03", fontSize: "xx-large" }} />
            </IconButton>
        </Tooltip>
    )
}

export default EditBtn;