import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import "../../pages/create/createProperty.css";
import { initLocationAutocomplete } from '../../components/autocomplete/autocomplete'



/*This is the property editing page of the site.
This would be a page exclusive to the broker listing the property.
This would allow the user to make changes to the information
of the property
*/


function PropertyEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);

    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}`)
            .then(response => response.json())
            .then(data => {
                setProperty(data);
                initLocationAutocomplete(setCoordinates);
                const decodedToken = jwtDecode(token);

                //prevents brokers from modifying other broker's property listings using direct link
                if (data.brokerID !== decodedToken.brokerId) {
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Failed to fetch property details:', error);
            });

    },);

    const editProperty = async (event) => {

        console.log(coordinates)

        event.preventDefault();
        property.address = event.target.address.value;
        property.city = event.target.city.value;
        property.postalCode = event.target.postalCode.value;
        property.propertyType = event.target.propertyType.value;
        property.price = event.target.price.value;
        property.numberOfBedrooms = event.target.numberOfBedrooms.value;
        property.numberOfBathrooms = event.target.numberOfBathrooms.value;
        property.geometry = {
            type: "Point",
            coordinates: [coordinates.longitude, coordinates.latitude],
        };

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectedAmenities = [];

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedAmenities.push(checkbox.value);
            }
        });
        property.amenities = selectedAmenities;

        const confirmed = window.confirm('Are you sure you want to save changes?');

        if (confirmed) {
            if (confirmed) {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(property),
                })
                    .then(response => {
                        if (response.ok) {
                            alert('Changes successful.');
                            navigate(-1);
                        }
                    });
            }
        }


    }

    return (
        <div>
            <div className="app">
                <header className="app-header">
                    <h1>Edit Property Listing</h1>
                    {property != null ? (
                        <div>
                            <form onSubmit={editProperty}>
                                <div className="d-flex">
                                    <input defaultValue={property.address} type="address" placeholder="Address" id="address-input" name="address" autoComplete="off" />
                                </div>

                                <div className="d-flex">

                                    <input defaultValue={property.city} type="text" id="locality-input" placeholder="City" name="city" autoComplete="off" />
                                </div>

                                <div className="d-flex">
                                    <input defaultValue={property.postalCode} placeholder="Postal Code" type="text" id="postal_code-input" name="postalCode" autoComplete="off" />
                                </div>

                                <div className="d-flex">
                                    <label htmlFor="propertyType">Property Type</label>
                                    <select defaultValue={property.propertyType} name="propertyType" id="propertyType">
                                        <option value="Sale">For Sale</option>
                                        <option value="Rent">For Rent</option>
                                    </select>
                                </div>

                                <div className="d-flex">

                                    <input defaultValue={property.price} type="text" placeholder='Price' id="price" name="price" autoComplete="off" />
                                </div>

                                <div className="d-flex">
                                    <input defaultValue={property.numberOfBedrooms} type="number" placeholder='Number of Bedrooms' id="numberOfBedrooms" name="numberOfBedrooms" min="1" max="15" autoComplete="off" />
                                </div>

                                <div className="d-flex">
                                    <input defaultValue={property.numberOfBathrooms} type="number" placeholder='Number of Bathrooms' id="numberOfBathrooms" name="numberOfBathrooms" min="1" max="15" autoComplete="off" />
                                </div>

                                <div className="d-flex">
                                    <label htmlFor="amenities">Amenities:</label><br></br>
                                    <div className="d-flex-r">
                                        <input defaultChecked={property.amenities.includes("Pet Friendly")} type="checkbox" id="pet_friendly" name="pet_friendly" value="Pet Friendly" />
                                        <label htmlFor="pet_friendly"> Pet friendly</label>
                                        <input defaultChecked={property.amenities.includes("Swimming Pool")} type="checkbox" id="swimming_pool" name="swimming_pool" value="Swimming Pool" />
                                        <label htmlFor="swimming_pool"> Swimming Pool</label>
                                        <input defaultChecked={property.amenities.includes("Parking")} type="checkbox" id="parking" name="parking" value="Parking" />
                                        <label htmlFor="parking"> Parking</label>
                                    </div>
                                </div>

                                <button type="sumbit" className="btn btn-dark"> Save changes </button>

                            </form>
                            <div className='d-flex align-items-center justify-content-center text-center'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark"> Cancel </button>
                            </div>


                        </div>
                    ) : (
                        <div>
                        </div>
                    )}

                </header>
            </div>
        </div>
    );
}

export default PropertyEdit;