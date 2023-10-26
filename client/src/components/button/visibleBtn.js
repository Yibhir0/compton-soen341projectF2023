
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import { Link} from 'react-router-dom';

const VisibleBtn = ({user})=> {

  return (
    <Link 
    to={{
        pathname: `/users/user/view/${user._id}`,
        state: { user: user }
      }}
    >
    <Tooltip title="Visit User">
    <IconButton >
      <VisibilityIcon sx={{ color: "#15D32C",fontSize:"xx-large"  }}  />
    </IconButton>
    </Tooltip>
</Link>
  )
}

export default VisibleBtn;