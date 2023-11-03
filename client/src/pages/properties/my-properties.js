
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import PropertyList from "../../components/list/PropertyList";

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

            <header className="app-header">
                <h1>My Properties</h1>
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
            </header>
        </div>
    )
}

export default MyProperties;