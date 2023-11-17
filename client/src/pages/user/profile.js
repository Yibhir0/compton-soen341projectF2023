import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MyProperties from "../properties/my-properties";
import Users from "../user/users";
import { Link } from 'react-router-dom';
import CreateBrokerForm from '../../components/form/createBrokerForm';
import AvatarProfile from '../../components/avatar/avatar';
import UpdateBrokerForm from '../../components/form/updateBrokerForm';

const linkStyle = {
  marginTop: "10px",
  textDecoration: "none",
  color: 'gold',
  padding: "4px",
  backgroundColor: "#011a3eea",
  borderRadius: "10px"

};


/*This is the profile page of a specified user.
This would dislpay the profile of a given user
*/
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
  }, [id]);


  return (

    <div>

      <Box component="div" sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
        {user &&
          <AvatarProfile data={user} size={80} />
        }
        <p>{user?.email}</p>
        <p>{user?.accountType}</p>

      </Box >
      {
        user.accountType === "broker" ? (
          <Box >
            <Box
              sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'space-between' }}>

              <Link to="/visits" className='navItem' style={linkStyle}>Visits</Link>


              <Link to="/offers" className='navItem' style={linkStyle}>Offers</Link>

              <Link to="/create" className='navItem' style={linkStyle}>Add Property</Link>

              <span>
                <Link to="/create" className='navItem'>Add Property</Link>
              </span>
              <div className="property-buttons-container">
                <UpdateBrokerForm id={id} />
              </div>

            </Box>
            <div>
              <MyProperties />
            </div>
          </Box>

        ) : user.accountType === "homebuyer" ? (
          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
            Homebuyer profile page
          </Box>

        ) : (
          <Box>
            <Box
              sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>

              <CreateBrokerForm></CreateBrokerForm>

              <Link to="/verify" className='navItem' style={linkStyle}>Verify Brokers</Link>

            </Box>
            <Users />
          </Box >
        )}


    </div>

  )

}
export default Profile;
