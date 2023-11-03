
import React, { } from 'react';
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MyProperties from '../properties/my-properties';
const UserDetail = () => {

  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Broker Details</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: 'space-between',
          alignItems: "center"
        }}>
        <Avatar
          alt=""
          sx={{ width: 160, height: 160 }}
        />
        <h6 className="b-text-font">{state.email}</h6>
        <h6 className="b-text-font">{state.accountType}</h6>
        <MyProperties id={state._id} />
      </Box>

    </div>
  )
}

export default UserDetail;