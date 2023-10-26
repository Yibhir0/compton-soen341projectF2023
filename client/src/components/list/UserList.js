import React from 'react';
import UserCard from '../card/userCard'
import Box from "@mui/material/Box";

const UserList = ({ users }) => {
    

    return (
      <Box
      sx={{
        m: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
      >
            {users.map((user, index) => (
           <UserCard user={user} key={index}/>
          ))}

      </Box>
    );
  };

export default UserList;