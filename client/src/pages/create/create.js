import "./createProperty.css"
import React, { useState, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {initLocationAutocomplete} from '../../components/autocomplete/autocomplete'

/*This is the property creation pagee of the site.
This would only be accesable by brokers to add a listing of a 
property to their listing.
*/
function CreateProperty() {

  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedImageIDs, setUploadedImageIDs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    initLocationAutocomplete(setCoordinates);
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dbhsjm5a2',
      uploadPreset: 'zm8dul6u'
    }, function (error, result) {
      if (!error && result && result.event === 'success') {
        // provides url to uploaded image with format
        const image_public_ID = result.info.public_id + "." + result.info.format;
        setUploadedImageIDs((prevIDs) => [...prevIDs, image_public_ID]);
      }
    });
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
      geometry: {
        type: "Point",
        coordinates: [coordinates.longitude,coordinates.latitude],
      },
    };


    await fetch(`${process.env.REACT_APP_BACKEND_URL}/property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    })
      .then(response => {
        if (response.ok) {
          alert("Property is created successfully");
          navigate("/my-properties");
        }
        else {
          alert("Sorry! try to create again");
        }
      });

    setUploadedImageIDs([]);
    event.target.reset();
  };
  return (
    <div className="app">
      <header className="app-header">

        <h1>Create Property Listing</h1>

        <form onSubmit={addProperty} >

          <div >

            <div className="d-flex">
              <input required type="address" placeholder="Address" id="address-input" name="address" autoComplete="off" />
            </div>

            <div className="d-flex">
              <input type="text" id="locality-input" name="city" placeholder="City" autoComplete="off" />
            </div>

            <div className="d-flex">
              <input type="text" id="postal_code-input" name="postalCode" placeholder="Postal Code" autoComplete="off" />
            </div>

            <div className="d-flex">
              <label htmlFor="propertyType">Property Type:</label>
              <select name="propertyType" id="propertyType">
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>

            <div className="d-flex">
              <input type="text" id="price" name="price" placeholder="Price" autoComplete="off" />
            </div>

            <div className="d-flex">
              <input type="number" id="numberOfBedrooms" placeholder="Number of Bedrooms" name="numberOfBedrooms" min="1" max="15" autoComplete="off" />
            </div>

            <div className="d-flex">
              <input type="number" id="numberOfBathrooms" placeholder="Number of Bathrooms" name="numberOfBathrooms" min="1" max="15" autoComplete="off" />
            </div>

            <div className="d-flex">
              <label htmlFor="amenities">Amenities:</label><br></br>
              <div className="d-flex-r">
                <input type="checkbox" id="pet_friendly" name="pet_friendly" value="Pet Friendly" />
                <label htmlFor="pet_friendly"> Pet friendly</label>
                <input type="checkbox" id="swimming_pool" name="swimming_pool" value="Swimming Pool" />
                <label htmlFor="swimming_pool"> Swimming Pool</label>
                <input type="checkbox" id="parking" name="parking" value="Parking" />
                <label htmlFor="parking"> Parking</label>
              </div>

            </div>

            <div className="d-flex">
              <button type="button" onClick={() => widgetRef.current.open()}>Upload</button>

              {uploadedImageIDs && (
                <div className="d-flex">
                  <p>Images:</p>
                  <div className="card" style={{ width: '15rem' }}>
                    {uploadedImageIDs.map((image) => (
                      <img className="img-thumbnail" src={"https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/" + image} alt="Uploaded" />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex">
              <Box>
                <button type="submit">Create</button>
              </Box>
              
            </div>

          </div>

        </form>

      </header>


    </div>
  );
}

export default CreateProperty;