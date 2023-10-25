import React, { useState,useEffect } from 'react';
import NavBar from "../../components/menu/navigationBar"
import SearchForm from "../../components/form/searchform";


function Properties(){

  const [properties, setProperties] = useState([]);
  
  function handleState(myProperties) {
    setProperties(myProperties);
 }
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
        <SearchForm change = {handleState}/>
      </div>

      <main className="app-main">

          <h2>Properties</h2>
          {properties && properties.length > 0 ? (

          <div className="card" style={{ width: '30rem' }}>
            {properties.map((property,i) => (
              <ul class="list-group list-group-flush">
                <li key={i} class="list-group-item">{property._id} - {property.brokerID} - {property.address}<button type="button" class="btn btn-danger btn-sm">Delete listing</button></li>
              </ul>
            ))}
          </div>
          ) : (
            <p>No properties yet</p>
          )}
          </main>
    </div>

  )
}
export default Properties;
