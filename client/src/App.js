

import './App.css';

import React, { useState,useEffect } from 'react';

function App() {
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
  
  const addProperty = async (event) => {
  
    event.preventDefault();
    
    const newProperty = {
      name: event.target.property.value,
      address: event.target.address.value,
      propertyType: event.target.propertyType.value,
    };

  
    
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    });
  
    setProperties(oldArray => [...oldArray,newProperty] );

  
    
    event.target.property.value = ""; // sets input empty after clicking submit
    event.target.address.value = ""; 
    event.target.propertyType.value = "";// sets input empty after clicking submit
    // window.location.reload(); // reloads the window after sending request
    };
  return (
    <div className="app">
  <header className="app-header">
    <h1>Real Estate</h1>
    
    <form onSubmit={addProperty}>
      <div>
        <label htmlFor="property">Property Name:</label>
        <input
          type="text"
          id="property"
          name="property"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="address" id="address" name="address" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="propertyType">Type:</label>
        <input type="propertyType" id="propertyType" name="propertyType" autoComplete="off" />
      </div>
      <button type="submit" >Add</button>
    </form>
  </header>
 
<main className="app-main">
<h2>Today</h2>

{properties && properties.length > 0 ? (
  <ol>
    {properties.map((property) => (
      <li key={property._id}>
        {property.name} - {property.address} -  {property.propertyType}
      </li>
    ))}
  </ol>
) : (
  <p>No activities yet</p>
)}
</main>
</div>
  );
}

export default App;
