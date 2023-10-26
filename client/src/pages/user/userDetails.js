
import React, {  } from 'react';
import { useLocation} from "react-router-dom";
const UserDetail = () => {
  
    const { state } = useLocation();
    console.log(state);
    console.log(state)

  return (
    <div></div>
  )
}

export default UserDetail;