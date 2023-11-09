import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import VisitForm from '../../components/form/visitForm';


function BrokerDetails(){
    const [broker, setBroker] = useState(null);
    const { id } = useParams();

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/brokers/${id}`)
            .then(response => response.json())
            .then(data => {
                setBroker(data);
            })
            .catch(error => {
                console.error('Failed to fetch broker details:', error);
            });
    },[id]);

    console.log(broker)


    return(
<div></div>

    )
}

export default BrokerDetails;