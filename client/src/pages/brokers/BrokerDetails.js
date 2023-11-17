import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function BrokerDetails() {
    const [broker, setBroker] = useState();
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/user/brokers/${id}`
            );
            const data = await result.json();
            setBroker(data);
        };
        fetchData();
    }, [id]);


    return (
        <div style={{ marginLeft: "30px", marginTop: "30px" }}>
            <h1> Broker details</h1>
            <p>Name : {broker?.firstName + " " + broker?.lastName}</p>
            <p>Email : {broker?.email}</p>
            <p>Phone Number : {broker?.phoneNumber}</p>
            <p>License : {broker?.licenseNumber}</p>

        </div>

    )
}

export default BrokerDetails;