import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";

const DeleteBtn = ({handleDelete}) => {
  return (
    <Tooltip title="Delete">
      <IconButton onClick={handleDelete}>
        <DeleteIcon sx={{ color: "#FF5733",fontSize:"xx-large" }}  />
      </IconButton>
  </Tooltip>
  )
}

export default DeleteBtn;