import React, { useState, useEffect } from 'react';
//import VisitList from '../../components/list/VisitList';
import jwtDecode from 'jwt-decode';

function Offers() {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [offers, setOffer] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/visit/visits?brokerId=${decodedToken.brokerId}`
            );
            const data = await result.json();
            setVisits(data);
        };
        fetchData();
    }, []);


    return (
        <div>
            <h1 style={{ textAlign: "center" }} >Offers</h1>
            {offers.length > 0 ? (
                <OffersList offers={offers} />
            ) : (
                <div className="mx-auto" style={{ maxWidth: "1300px" }}>
                    <p>No Offers Yet</p>
                </div>
            )}
        </div>

    )
}
export default Offers;
