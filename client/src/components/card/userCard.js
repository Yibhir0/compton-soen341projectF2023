import React, { useState } from 'react';
import Box from "@mui/material/Box";
import DeleteBtn from '../button/deleteBtn';
import VisibleBtn from '../button/visibleBtn';
import VerifiedIcon from '@mui/icons-material/Verified';
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';

import AvatarProfile from '../avatar/avatar';


const UserCard = ({ user }) => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(
    user
  );

  const {
    email,
    accountType,
    _id,
  } = user;


  const handleVisibleUser = () => {

    navigate(`/users/user/view/${user._id}`, { state: user });
  }

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


            <VisibleBtn handleVisible={handleVisibleUser} view='User' />
            <DeleteBtn handleDelete={deleteUser} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: 'space-between',
              alignItems: "center",
              flexDirection: 'column'

            }}>

            <AvatarProfile data={user} size={80}

            />
            <h6 className="b-text-font">{email}</h6>
            <h6 className="b-text-font">{accountType}</h6>
            <Tooltip title="Verified">
              <VerifiedIcon sx={{ color: "#40dced", fontSize: "xx-large" }} />
            </Tooltip>
          </Box>
        </Box>

      }
    </div>

  )
}

export default UserCard;