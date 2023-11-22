// eslint-disable-next-line no-unused-vars
import React from "react";

import Box from "@mui/material/Box";

import VisibleBtn from '../button/visibleBtn';

const PropertyTooltip = ({ property, handleVisible }) => {
  return (
    <div >
      {property && (
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            border: "1",
            borderColor: "gold",
            p: 2,
            width: "27ch",
            m: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <h5>For {property.propertyType}</h5>
          <h6>{property.price} <span style={{ color: "gold" }}>$</span></h6>
          {property.images.length === 0 ?
            <img style={{ width: '160px', height: "auto" }} src={require('../../assets/images/landingpage_background1.jpg')} alt="Photos" />
            :
            <img style={{ width: '160px', height: "auto" }} src={`https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/${property.images[0]}`} alt="Photos" />
          }
          <VisibleBtn handleVisible={handleVisible} view="Property" />
        </Box>
      )}
    </div>
  )
};


export default PropertyTooltip;