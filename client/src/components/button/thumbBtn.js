import React, { useState } from 'react';
import Tooltip from "@mui/material/Tooltip";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
const ThumbBtn = () => {
    const [thumb, setThumb] = useState(true);

    function handleThumb(){
        setThumb(!thumb);
    }
    return (
        <Tooltip title={thumb ? "Satisfied":"Unsatisfied"}>
        <IconButton  onClick={handleThumb}>
        {thumb
        ? <ThumbUpIcon sx={{ color: "#15C5D3",fontSize:"xx-large"  }}   />
        : <ThumbDownIcon sx={{ color: "#D3D315",fontSize:"xx-large"  }} />
      }
        </IconButton>
    </Tooltip>
    )
  }
  
  export default ThumbBtn;