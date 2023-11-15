
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import PropertyList from "../../components/list/PropertyList";


/*This is the my properties page of the site.
This would be a page exclusive to broker accounts
to see all of their property listing
*/
function MyProperties({ id }) {

    const [myproperties, setProperties] = useState([])
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    let brokerId = decodedToken.brokerId;
    if (id != null) {
        brokerId = id;
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/brokerproperties/${brokerId}`
            );
            const data = await result.json();
            setProperties(data);
        };
        fetchData();
    }, []);

    return (
        <div>

            <div className="d-flex align-items-center justify-content-center text-center " style={{ marginTop: "20px" }}>
                <h1>Broker's Properties</h1>
            </div>
            <br></br>
            {myproperties && myproperties.length > 0 ? (
                <div>
                    <PropertyList properties={myproperties} />
                </div>

            ) : (
                <div className="mx-auto" style={{ maxWidth: "1300px" }}>
                    <p>No properties yet</p>
                </div>
            )}

        </div>
    )
}

export default MyProperties;