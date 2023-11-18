import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AvatarProfile from '../../components/avatar/avatar';
import Box from "@mui/material/Box";
import PropertyList from "../../components/list/PropertyList";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const UserDetail = () => {
  const [broker, setBroker] = useState();
  const [properties, setProperties] = useState([]);
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

    const fetchProperties = async() =>{
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getactivelistings/${id}`
      );
      const data = await result.json();
      setProperties(data);
    }
    fetchProperties();
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
        <br></br>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '200px' , textAlign:'center'}}>
            <h3>Contact Information</h3>
            <h6 className="b-text-font"><EmailIcon></EmailIcon> {broker?.email}</h6>
            <h6 className="b-text-font"><PhoneIcon></PhoneIcon> {broker?.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</h6>
          </div>
  
        <div style={{ textAlign:'center'}}>
          <h4>Broker Information</h4>
          <h6 className="b-text-font">{broker?.firstName} {broker?.lastName}</h6>
          <h6 className="b-text-font">{broker?.agency} Real Estate Agency</h6>
        </div>
      </div>

        
      </Box>
      
      <Box>
        <h1 style={{ textAlign: "center" }}>Active Listings</h1>
      </Box>
      <PropertyList properties={properties} />

    </div>
  )
}

export default UserDetail;