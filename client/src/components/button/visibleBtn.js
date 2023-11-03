
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const VisibleBtn = ({ user }) => {

  const navigate = useNavigate();


  const handleClick = () => {

    navigate(`/users/user/view/${user._id}`, { state: user });
  }

  return (

    <Tooltip title="Visit User">
      <IconButton onClick={handleClick} >
        <VisibilityIcon sx={{ color: "#15D32C", fontSize: "xx-large" }} />
      </IconButton>
    </Tooltip>
  )
}

export default VisibleBtn;