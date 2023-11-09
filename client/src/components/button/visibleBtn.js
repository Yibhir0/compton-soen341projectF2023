
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';


const VisibleBtn = ({ handleVisible, view }) => {

  return (

    <Tooltip title={`View ${view}`}>
      <IconButton onClick={handleVisible} >
        <VisibilityIcon sx={{ color: "#15D32C", fontSize: "xx-large" }} />
      </IconButton>
    </Tooltip>
  )
}

export default VisibleBtn;