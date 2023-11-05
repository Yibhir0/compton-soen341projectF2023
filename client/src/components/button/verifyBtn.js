import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

const VerifyBtn = ({ handleVerify }) => {
  return (
    <Tooltip title="Verify">
      <IconButton onClick={handleVerify}>
        <DoneIcon sx={{ color: "lightgreen", fontSize: "xx-large" }} />
      </IconButton>
    </Tooltip>
  )
}

export default VerifyBtn;