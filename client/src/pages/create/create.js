
import "./demo.css"
import React, { useState,useEffect, useRef } from 'react';
import NavBar from "../../components/menu/navigationBar";
import jwtDecode from 'jwt-decode';



 function Demo() {

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedImageIDs, setUploadedImageIDs] = useState([]);
  

    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:'dbhsjm5a2',
            uploadPreset: 'zm8dul6u'
        }, function(error,result){
            if (!error && result && result.event === 'success') {
                // provides url to uploaded image with format
                const image_public_ID = result.info.public_id + "." + result.info.format;
                setUploadedImageIDs((prevIDs) => [...prevIDs, image_public_ID]);
            }
        });
    }, [])

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

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedAmenities = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedAmenities.push(checkbox.value);
      }
    });

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    
    const newProperty = {
      brokerID: decodedToken.brokerId,
      address: event.target.address.value,
      city: event.target.city.value,
      postalCode: event.target.postalCode.value,
      propertyType: event.target.propertyType.value,
      price: event.target.price.value,
      numberOfBedrooms: event.target.numberOfBedrooms.value,
      numberOfBathrooms: event.target.numberOfBathrooms.value,
      amenities: selectedAmenities,
      images: uploadedImageIDs,
    };

    
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    })
      .then(response =>{
        if(response.ok){
          setProperties(oldArray => [...oldArray, newProperty]);
        }
      });
      
      setUploadedImageIDs([]);
      event.target.reset();
    };
  return (
    <div className="app">

      <div>
      <NavBar/>
      </div>
     
  <header className="app-header">
    <h1>Create Property Listing</h1>
    
    <form onSubmit={addProperty}>

      <div>
        <label htmlFor="address">Address:</label>
        <input type="address" id="address" name="address" autoComplete="off" />
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" autoComplete="off" />
      </div>

      <div>
        <label htmlFor="postalCode">Postal Code:</label>
        <input type="text" id="postalCode" name="postalCode" autoComplete="off" />
      </div>

      <div>
        <label htmlFor="propertyType">Property Type</label>
        <select name="propertyType" id="propertyType">
          <option value ="Sale">For Sale</option>
          <option value ="Rent">For Rent</option>
        </select>
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" autoComplete="off" />
      </div>

      <div>
        <label htmlFor="numberOfBedrooms">Number of bedrooms:</label>
        <input type="number" id="numberOfBedrooms" name="numberOfBedrooms" min="1" max="15" autoComplete="off" />
      </div>

      <div>
        <label htmlFor="numberOfBathrooms">Number of bathrooms:</label>
        <input type="number" id="numberOfBathrooms" name="numberOfBathrooms" min="1" max="15" autoComplete="off" />
      </div>

      <div>
        <label htmlFor="amenities">Amenities:</label><br></br>
        <input type="checkbox" id="pet_friendly" name="pet_friendly" value="Pet Friendly"/>
        <label htmlFor="pet_friendly"> Pet friendly</label>
        <input type="checkbox" id="swimming_pool" name="swimming_pool" value="Swimming Pool"/>
        <label htmlFor="swimming_pool"> Swimming Pool</label>
        <input type="checkbox" id="parking" name="parking" value="Parking"/>
        <label htmlFor="parking"> Parking</label>
      </div>

      <div>
          <button type = "button" onClick={() => widgetRef.current.open()}>Upload</button>
          
          {uploadedImageIDs && (
            <div>
              <p>Images:</p>
              <div className="card" style={{ width: '15rem' }}>
                {uploadedImageIDs.map((image) => (
                  <img className="img-thumbnail" src={"https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/" + image} alt="Uploaded" />
                ))}
              </div>
            </div>
          )}
      </div>

      <button type="submit">Create</button>
      
    </form>
    
  </header>
 
{/* <main className="app-main">
<h2>Properties</h2>

{properties && properties.length > 0 ? (
  <ul>
    {properties.map((property) => (
      <li key={property._id}>
        {property.brokerID} - {property.address} -  {property.city} -  {property.postalCode} -  {property.propertyType} - {property.price} - {property.numberOfBedrooms}  
        - {property.numberOfBathrooms} - {property.amenities.join(', ')} - {property.images.join(', ')}
      </li>
    ))}
  </ul>
) : (
  <p>No properties yet</p>
)}
</main> */}
</div>
  );
}

export default Demo;