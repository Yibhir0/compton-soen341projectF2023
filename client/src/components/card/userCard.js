import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import DeleteBtn from '../button/deleteBtn';
import ThumbBtn from '../button/thumbBtn';
import VisibleBtn from '../button/visibleBtn';


const UserCard = ({ user }) => {
  const [userInfo, setUserInfo] = useState(
    user
  );

  const {
    email,
    accountType,
    _id,
  } = user;

  const deleteUser = async (event) => {
    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/users/${_id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            alert('User deleted successfully');
            setUserInfo({ user: null })
          }
        })
        .catch(error => {
          console.error('Failed to delete user', error);
        });
    }
  }

  return (

    <div>
      {(userInfo.user !== null) &&
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            width: "27ch",
            m: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: 'space-between',

            }}>
            <ThumbBtn />
            <VisibleBtn user={user} />
            <DeleteBtn handleDelete={deleteUser} />
          </Box>

          <Avatar
            alt=""
            sx={{ width: 100, height: 100 }}
          />
          <h6 className="b-text-font">{email}</h6>
          <h6 className="b-text-font">{accountType}</h6>
        </Box>

      }
    </div>

  )
}

export default UserCard;