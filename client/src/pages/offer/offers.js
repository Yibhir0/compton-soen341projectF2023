import React, { useState, useEffect } from 'react';
import OfferList from '../../components/list/OfferList';
import jwtDecode from 'jwt-decode';

/*This is the offers page of the site
This would contain information behind the creation
of the site such as the those who created it
*/

function Offers() {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [offers, setOffer] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/offer/offers?brokerId=${decodedToken.brokerId}`
            );
            const data = await result.json();
            setOffer(data);
        };
        fetchData();
    }, [decodedToken.brokerId]);
    return (
        <div>
            <h1 style={{ textAlign: "center" }} > Manage Offers</h1>
            {offers.length > 0 ? (
                <OfferList offers={offers} />
            ) : (
                <div className="mx-auto" style={{ maxWidth: "1300px" }}>
                    <p>No Offers Yet</p>
                </div>
            )}
        </div>

    )
}
export default Offers;
