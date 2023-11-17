import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Mortgageform from '../../components/mortgage/mortgageform';

/*This is the property creation pagee of the site.
This would only be accesable by brokers to add a listing of a 
property to their listing.
*/
function mortgage(){
  return (
    <Mortgageform/>

  );
}

export default mortgage;