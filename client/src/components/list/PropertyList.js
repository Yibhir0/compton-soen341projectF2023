import React from 'react';
import { Link } from 'react-router-dom';


const PropertyList = ({ properties }) => {
    return (
      <div className="mx-auto" style={{ maxWidth: "1300px" }}>
        <div className="row">
          {properties.map((property, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img style={{ width: '100%', height: '300px' }} src={"https://res.cloudinary.com/dbhsjm5a2/image/upload/v1697488900/" + property.images[0]} className="card-img-top mx-auto my-auto" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">$ {property && property.price ? property.price.toLocaleString() : ''}</h5>
                  <p className="card-text"> For {property.propertyType}</p>
                  <p className="card-text">{property.address}</p>
                  <div className='align-items-center justify-content-center text-center'>
                    <Link to={`/properties/${property._id}`} className="btn btn-primary m-2">View details</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default PropertyList;