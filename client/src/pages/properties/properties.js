import React, { useState,useEffect } from 'react';
import NavBar from "../../components/menu/navigationBar"

function Properties(){

  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/properties`
      );
      const data = await result.json();
      setProperties(data);
    };
    fetchData();
  }, []);


  return (
    <div>

    
      <div className="app">
        <div>
        <NavBar/>
        </div>
      </div>

      <header className="app-header">
          <h1>My listed properties</h1>
          <br></br>
          {properties && properties.length > 0 ? (
            <div className="mx-auto" style={{ maxWidth: "1300px" }}>
            <div className="row">
              {properties.map((property, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4" >
                    <img style={{ width: '100%', height: '300px' }} src={"https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/" + property.images[0]} className="card-img-top mx-auto my-auto" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">$ {property && property.price ? property.price.toLocaleString() : ''}</h5>
                      <p className="card-text"> For {property.propertyType}</p>
                      <p className="card-text">{property.address}</p>
                      <div className='align-items-center justify-content-center text-center'>
                        <a href="" className="btn btn-primary m-2">View details</a>
                        <a href="" className="btn btn-warning m-2">Edit</a>
                        <a href="" className="btn btn-danger m-2">Delete</a>  
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            
          ) : (
            <div className="mx-auto" style={{ maxWidth: "1300px" }}>
            <p>No properties yet</p>
            </div>
          )}
          </header>
    </div>

  )
}
export default Properties;
