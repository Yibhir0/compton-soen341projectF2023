import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function PropertyEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}`)
            .then(response => response.json())
            .then(data => {
                setProperty(data);
                const decodedToken = jwtDecode(token);

                //prevents brokers from modifying other broker's property listings using direct link
                if (data.brokerID !== decodedToken.brokerId) {
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Failed to fetch property details:', error);
            });
    }, [id]);



    const editProperty = async (event) => {
        event.preventDefault();
        property.address = event.target.address.value;
        property.city = event.target.city.value;
        property.postalCode = event.target.postalCode.value;
        property.propertyType = event.target.propertyType.value;
        property.price = event.target.price.value;
        property.numberOfBedrooms = event.target.numberOfBedrooms.value;
        property.numberOfBathrooms = event.target.numberOfBathrooms.value;

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
                                <div>
                                    <label htmlFor="address">Address:</label>
                                    <input defaultValue={property.address} type="address" id="address" name="address" autoComplete="off" />
                                </div>

                                <div>
                                    <label htmlFor="city">City:</label>
                                    <input defaultValue={property.city} type="text" id="city" name="city" autoComplete="off" />
                                </div>

                                <div>
                                    <label htmlFor="postalCode">Postal Code:</label>
                                    <input defaultValue={property.postalCode} type="text" id="postalCode" name="postalCode" autoComplete="off" />
                                </div>

                                <div>
                                    <label htmlFor="propertyType">Property Type</label>
                                    <select defaultValue={property.propertyType} name="propertyType" id="propertyType">
                                        <option value="Sale">For Sale</option>
                                        <option value="Rent">For Rent</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="price">Price:</label>
                                    <input defaultValue={property.price} type="text" id="price" name="price" autoComplete="off" />
                                </div>

                                <div>
                                    <label htmlFor="numberOfBedrooms">Number of bedrooms:</label>
                                    <input defaultValue={property.numberOfBedrooms} type="number" id="numberOfBedrooms" name="numberOfBedrooms" min="1" max="15" autoComplete="off" />
                                </div>

                                <div>
                                    <label htmlFor="numberOfBathrooms">Number of bathrooms:</label>
                                    <input defaultValue={property.numberOfBathrooms} type="number" id="numberOfBathrooms" name="numberOfBathrooms" min="1" max="15" autoComplete="off" />
                                </div>

                                <div>
                                    <label htmlFor="amenities">Amenities:</label><br></br>
                                    <input defaultChecked={property.amenities.includes("Pet Friendly")} type="checkbox" id="pet_friendly" name="pet_friendly" value="Pet Friendly" />
                                    <label htmlFor="pet_friendly"> Pet friendly</label>
                                    <input defaultChecked={property.amenities.includes("Swimming Pool")} type="checkbox" id="swimming_pool" name="swimming_pool" value="Swimming Pool" />
                                    <label htmlFor="swimming_pool"> Swimming Pool</label>
                                    <input defaultChecked={property.amenities.includes("Parking")} type="checkbox" id="parking" name="parking" value="Parking" />
                                    <label htmlFor="parking"> Parking</label>
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