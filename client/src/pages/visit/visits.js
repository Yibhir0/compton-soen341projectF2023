import React, { useState, useEffect } from 'react';
import VisitList from '../../components/list/VisitList';
import jwtDecode from 'jwt-decode';

function Visits() {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [visits, setVisits] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/visit/visits?brokerId=${decodedToken.brokerId}`
            );
            const data = await result.json();
            setVisits(data);
        };
        fetchData();
    }, [decodedToken.brokerId]);


    return (
        <div>
            <h1 style={{ textAlign: "center" }} >Visits</h1>
            {visits.length > 0 ? (
                <VisitList visits={visits} />
            ) : (
                <div className="mx-auto" style={{ maxWidth: "1300px" }}>
                    <p>No Visits Yet</p>
                </div>
            )}
        </div>

    )
}
export default Visits;
