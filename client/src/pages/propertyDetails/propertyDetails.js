import NavBar from "../../components/menu/navigationBar"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PropertyView(){

  const [property, setProperty] = useState([]);

    const { id } = useParams();
    useEffect(()=>{
      fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}`)
      .then(response => response.json())
      .then(data => {
        setProperty(data);
      })
      .catch(error => {
        console.error('Failed to fetch property details:', error);
      });
    },[id]);

    return(
        <div className="app">
        <div>
        <NavBar/>
        </div>
        <div>
        <header className="app-header">
          <h1>Property Details</h1>
          <div className="d-flex align-items-center justify-content-center text-center">
            
            
            <div>
              Address: {property.address}
            </div>
          </div>
        </header>
        </div>
        
      </div>


    )
}

export default PropertyView;