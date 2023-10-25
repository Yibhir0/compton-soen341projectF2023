import NavBar from "../../components/menu/navigationBar"
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PropertyView(){

    const { id } = useParams();
    useEffect(()=>{

    },[id]);

    return(
        <div className="app">
        <div>
        <NavBar/>
        </div>
      </div>
    )
}

export default PropertyView;