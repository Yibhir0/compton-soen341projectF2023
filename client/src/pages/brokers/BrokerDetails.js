import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PropertyList from "../../components/list/PropertyList";

import brokerIcon from "../../assets/images/broker-icon.png"
import {Row, Col, Card} from "reactstrap";


function BrokerDetails() {
    const [broker, setBroker] = useState();
    const [properties, setProperties] = useState([]);
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
    
        const fetchProperties = async() =>{
          const result = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/getactivelistings/${id}`
          );
          const data = await result.json();
          setProperties(data);
        }
        fetchProperties();
      }, [id]);


    return (
        <div className="broker-details">
            <h1>{broker?.firstName + " " + broker?.lastName}</h1>
            <Card className={"card"}>
                <Row>
                    <Col md="3" style={{borderRight:"1px solid #000", height:"300px"}}>
            <img src={brokerIcon} style={{width:"50%", marginTop:"20px", marginLeft:"20px"}}/>
                    </Col>
                    <Col md="9" style={{paddingLeft:"50px", paddingTop:"20px"}}>
                <p style={{fontWeight:"bold"}}>{broker?.firstName + " " + broker?.lastName}</p>
                        <p style={{marginTop:"-10px"}}>Real Estate Broker</p>
                        <br/>
                        <p>📧 {broker?.email}</p>
                <p style={{fontStyle:"italic"}}>📞 {broker?.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</p>
                <p>📄 {broker?.licenseNumber}</p>
                    </Col>
                </Row>
            </Card>
            <div>
        <h1 style={{ textAlign: "center" }}>Active Listings</h1>
      </div>
      <PropertyList properties={properties} />
        </div>

    )
}

export default BrokerDetails;