import React from 'react';
import UserCard from '../card/userCard'
import VerifyCard from '../card/verifyCard';
import Box from "@mui/material/Box";

const UserList = ({ users }) => {
  const verifiedUsers = users.filter((user) => user.accountVerified === true);
  console.log(verifiedUsers);

  if (verifiedUsers.length > 0)
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
    else{
      return(
        <Box
        sx={{
          m: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}>
          {users.map((user, index) => (
           <VerifyCard user={user} key={index}/>
          ))}

        </Box>
      )
    }
  };

export default UserList;