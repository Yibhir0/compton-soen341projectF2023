
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';

const VisibleBtn = ({ handleVisible }) => {

  return (

    <Tooltip title="Visit User">
      <IconButton onClick={handleVisible} >
        <VisibilityIcon sx={{ color: "#15D32C", fontSize: "xx-large" }} />
      </IconButton>
    </Tooltip>
  )
}

export default VisibleBtn;