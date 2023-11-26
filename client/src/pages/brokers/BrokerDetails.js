import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



import brokerIcon from "../../assets/images/broker-icon.png"
import {Row, Col, Card} from "reactstrap";
import MyProperties from "../properties/my-properties";


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
        <div className="broker-details">
            <h1>{broker?.firstName + " " + broker?.lastName}</h1>
            <Card className={"card"}>
                <Row>
                    <Col md="3" style={{borderRight:"1px solid #000", height:"300px"}}>
            <img src={brokerIcon} style={{width:"80%", marginTop:"20px", marginLeft:"20px"}}/>
                    </Col>
                    <Col md="9" style={{paddingLeft:"50px", paddingTop:"20px"}}>
                <p style={{fontWeight:"bold"}}>{broker?.firstName + " " + broker?.lastName}</p>
                        <p style={{marginTop:"-10px"}}>Real Estate Broker</p>
                        <br/>
                        <p>📧 {broker?.email}</p>
                <p style={{fontStyle:"italic"}}>📞 {broker?.phoneNumber}</p>
                <p>🪪 {broker?.licenseNumber}</p>
                    </Col>
                </Row>
            </Card>
            <h2>Properties Listed</h2>
            <MyProperties/>
        </div>

    )
}

export default BrokerDetails;