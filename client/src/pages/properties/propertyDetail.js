import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import VisitForm from '../../components/form/visitForm';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import DeleteBtn from '../../components/button/deleteBtn';
import EditBtn from '../../components/button/editBtn';
import PlayBtn from '../../components/button/playBtn';

import './properties.css';


function PropertyView() {
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.images.length === 0) {
                    data.images.push('default')
                }
                setProperty(data);
            })
            .catch(error => {
                console.error('Failed to fetch property details:', error);
            });
    }, [id]);



    const deleteListing = async (event) => {
        event.preventDefault();
        const confirmed = window.confirm('Are you sure you want to delete this property?');

        if (confirmed) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${id}`, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {

                        alert('Property deleted successfully');
                        navigate(-1);
                    }
                })
                .catch(error => {
                    console.error('Failed to delete property', error);
                });
        }
    }



    const isBrokerSignedIn = !!localStorage.getItem('token');
    let decodedToken = "";
    if (isBrokerSignedIn) {
        const token = localStorage.getItem('token');
        decodedToken = jwtDecode(token);
    }

    const editListing = () => {
        navigate(`/edit/${id}`);

    };

    const playVideo = () => {
        navigate(`/properties/${property._id}/player`);

    };


    return (
        <div >
            {property !== null &&
                <Carousel>
                    {
                        property.images.map((img, i) => {
                            return (
                                <Paper key={i}>
                                    <div className='property-card-container'>
                                        <h1 className='property-header'>Property Details</h1>
                                        <div className="property-detail">
                                            <div className="property-poster">
                                                {img === 'default' ?
                                                    <img src={require('../../assets/images/landingpage_background1.jpg')} alt="Photos" />
                                                    :
                                                    <img src={`https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/${img}`} alt="Photos" />



                                                }

                                            </div>
                                            <div className="property-info">
                                                <h4>For : {property.propertyType}</h4>
                                                <h5>Price : {property.price} <span style={{ color: "gold" }}>$</span></h5>
                                                <h5>{property.address}</h5>
                                                <h5>{property.city} , {property.postalCode} </h5>
                                                <h5>{property.numberOfBedrooms} Bedrooms</h5>
                                                <h5>{property.numberOfBathrooms} Bathrooms</h5>
                                                <ul>
                                                    {property.amenities?.map((amenity, index) => (
                                                        <li key={index}>{amenity}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="property-buttons-container">
                                                <VisitForm property={property} />
                                                <PlayBtn handlePlay={playVideo} />
                                                {isBrokerSignedIn && property.brokerID === decodedToken.brokerId && (
                                                    <div className="property-buttons-container">
                                                        <DeleteBtn handleDelete={deleteListing} />
                                                        <EditBtn handleEdit={editListing} />
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                </Paper>
                            )
                        }
                        )
                    }

                </Carousel>

            }

        </div>

    )
}

export default PropertyView;