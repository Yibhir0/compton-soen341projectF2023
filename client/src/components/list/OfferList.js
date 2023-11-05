import React from 'react';
import Offer from '../accordion/offerAccordion.js'
import Box from "@mui/material/Box";

const OfferList = ({ offers }) => {

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
            {offers.map((offers, index) => (
           <Offer offers={offers} key={index}/>
          ))}
      </Box>
    );
  };

export default OfferList;