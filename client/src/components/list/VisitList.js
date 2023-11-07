import React from 'react';
import Visit from '../accordion/visitAccordion'
import Box from "@mui/material/Box";

const VisitList = ({ visits }) => {
    

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
            {visits.map((visit, index) => (
           <Visit visit={visit} key={index}/>
          ))}
      </Box>
    );
  };

export default VisitList;