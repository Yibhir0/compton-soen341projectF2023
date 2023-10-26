import React, { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Properties from "../properties/properties";
import Users from "../user/users";
function Profile(){
     
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
        <Box component="div" sx={{ display: 'flex',flexDirection:"column",alignItems:"center" }}>
        <Avatar></Avatar>
        <p>{user.email}</p>
        <p>{user.accountType}</p> 
        {user.accountType === "broker" &&
            <Properties />
        }

        {user.accountType === "admin" &&
            <Users/>
        }
        
        </Box>)
                  
}
export default Profile;
