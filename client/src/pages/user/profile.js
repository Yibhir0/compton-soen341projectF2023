import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MyProperties from "../properties/my-properties";
import Users from "../user/users";
import { Link } from 'react-router-dom';
import CreateBrokerForm from '../../components/form/createBrokerForm';

function Profile() {

  const id = localStorage.getItem('id');

  const [user, setUser] = useState({
  });


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/users/${id}`
      );
      const data = await result.json();
      setUser(data);

    };
    fetchData();
  }, []);

  return (
    <div>
    <Box component="div" sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <Avatar></Avatar>
      <p>{user.email}</p>
      <p>{user.accountType}</p>
    </Box >
      {
        user.accountType === "broker" ? (
          <Box>
            <Box
              sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
              <span>
                <Link to="/visits" className='navItem'>Visits</Link>
              </span>

              <span>
                <Link to="/create" className='navItem'>Add Property</Link>
              </span>
            </Box>
            <Box>
              <MyProperties />
            </Box>
          </Box>

        ): user.accountType === "homebuyer" ? (
          <Box  sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
            Homebuyer profile page
          </Box>
        ):(
          <Box>
            <Box
              sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
              <span>
                <CreateBrokerForm></CreateBrokerForm>
              </span>
              <span>
                <Link to="/verify" className='navItem'>Verify Brokers</Link>
              </span>
            </Box>
            <Users />
          </Box >
      )}

    
    </div>
    )

}
export default Profile;
