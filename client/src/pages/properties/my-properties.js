
import React, { useState, useEffect } from 'react';
import PropertyList from "../../components/list/PropertyList";
import { useParams } from "react-router-dom";


/*This is the my properties page of the site.
This would be a page exclusive to broker accounts
to see all of their property listing
*/
function MyProperties() {

    const [myproperties, setProperties] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/brokerproperties/${id}`
            );
            const data = await result.json();
            setProperties(data);
        };
        fetchData();
    }, [id]);

    return (
        <div>

            <div className="d-flex align-items-center justify-content-center text-center " style={{ marginTop: "20px" }}>
                
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