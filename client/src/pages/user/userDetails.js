
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AvatarProfile from '../../components/avatar/avatar';
import Box from "@mui/material/Box";
import MyProperties from '../properties/my-properties';
const UserDetail = () => {
  const [broker, setBroker] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/brokers/${id}`
      );
      const data = await result.json();
      setBroker(data);
    };
    fetchData();
  }, [id]);


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
        {broker &&
          < AvatarProfile data={broker} size={100} />
        }
        <h6 className="b-text-font">{broker?.email}</h6>
        <h6 className="b-text-font">{broker?.accountType}</h6>
        <h6 className="b-text-font">Name: {broker?.firstName} {broker?.lastName}</h6>
        <h6 className="b-text-font">Phone Number: {broker?.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</h6>
        <h6 className="b-text-font">License Number: {broker?.licenseNumber}</h6>
        <h6 className="b-text-font">Agency: {broker?.agency}</h6>

      </Box>
      <MyProperties />

    </div>
  )
}

export default UserDetail;