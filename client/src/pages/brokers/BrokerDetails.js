import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import VisitForm from '../../components/form/visitForm';


function BrokerDetails(){
    const [broker, setBroker] = useState();
    const { id } = useParams();
    console.log(id)

    // useEffect(()=>{
    //     fetch(`${process.env.REACT_APP_BACKEND_URL}/user/brokers/${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setBroker(data);
    //         })
    //         .catch(error => {
    //             console.error('Failed to fetch broker details:', error);
    //         });
    // },[]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/user/brokers/${id}`
            );
            const data = await result.json();
            setBroker(data);
        };
        fetchData();
    }, []);

    console.log(broker)


    return(
            <div style={{marginLeft:"30px", marginTop:"30px"}}>
                <h1> Broker details</h1>
                <p>Name : {broker?.firstName + " " +broker?.lastName}</p>
                <p>Email : {broker?.email}</p>
                <p>Phone Number : {broker?.phoneNumber}</p>
                <p>License : {broker?.licenseNumber}</p>


            </div>

    )
}

export default BrokerDetails;