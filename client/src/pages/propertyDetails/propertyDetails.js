import NavBar from "../../components/menu/navigationBar"
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import jwtDecode from 'jwt-decode';


function PropertyView(){
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
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



    const deleteListing = async (event) => {
      event.preventDefault();
      const confirmed = window.confirm('Are you sure you want to delete this property?');

      if(confirmed){
        fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}`,{method: 'DELETE'})
        .then((response) =>{
          if(response.ok){

            alert('Property deleted successfully');
            navigate(-1);
          }
        })
        .catch(error =>{
          console.error('Failed to delete property', error);
        });
      }
    }

    const isBrokerSignedIn = !!localStorage.getItem('token');
    let decodedToken = "";
    if(isBrokerSignedIn){
      const token = localStorage.getItem('token');
      decodedToken = jwtDecode(token);
    }
    

    return(
        <div className="app">
        <div>
        <header className="app-header">
          <h1>Property Details</h1>
          <div className="d-flex justify-content-center text-center font-weight-bold">
          <button onClick={() => navigate(-1)} className="btn btn-dark"> Back </button>
          </div>
          <br></br>
          {property !== null ? (
            <div>
              <div className="d-flex align-items-center justify-content-center text-center">
                <div>
                  <img style={{ width: '100%', height: '250px' }} src={"https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/" + property.images[0]} alt="Uploaded"></img>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center text-center">
                For {property.propertyType}
              </div>
              <div className="d-flex align-items-center justify-content-center text-center">
                Price: $ {property && property.price ? property.price.toLocaleString() : ''}
              </div>
              <div className="d-flex align-items-center justify-content-center text-center">
                {property.address}
              </div>
              <div className="d-flex align-items-center justify-content-center text-center">
                {property.city}, {property.postalCode}
              </div>
              <div className="d-flex align-items-center justify-content-center text-center">
                Number of bedrooms: {property.numberOfBedrooms}
              </div>
              <div className="d-flex align-items-center justify-content-center text-center">
                Number of bathrooms: {property.numberOfBathrooms}
              </div>
              {property.amenities.length > 0 && (
                <div className="d-flex align-items-center justify-content-center text-center">
                  
                  <br></br>
                  <ul>
                    {property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <div className="d-flex align-items-center justify-content-center text-center font-weight-bold">
                      Property Images
                </div>
              {property.images.length > 0 && (
                <div className="d-flex align-items-center justify-content-center text-center">
                  <br></br>
                    {property.images.map((images, index) => (
                      <div>

                      <img style={{ width: '75%', height: '200px' }} src={`https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/${images}`} alt="Uploaded"></img>
                      </div>
                    ))}
                    
                    
                </div>

                
              )}
              </div>
              
              {isBrokerSignedIn && property.brokerID === decodedToken.brokerId && (
                <div className="d-flex align-items-center justify-content-center text-center font-weight-bold m-5">
                  <button onClick={deleteListing} className="btn btn-danger m-2">Delete</button>
                  <button className="btn btn-warning">Edit</button>
                </div>
              )}

            </div>
          ) : (
            <div>

            </div>
          )}
        </header>
      </div>
    </div>


    )
}

export default PropertyView;