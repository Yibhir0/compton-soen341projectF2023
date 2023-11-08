import React, { useState,useEffect } from 'react';
import SearchForm from "../../components/form/searchform"
import PropertyList from "../../components/list/PropertyList";
import {Form} from "react-router-dom";
import {Input} from "@mui/material";

function Brokers(){

    const [brokers, setBrokers] = useState([]);
    const [brokersToList, setBrokersList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/user/brokers`
            );
            const data = await result.json();
            setBrokers(data);
        };
        fetchData();
    }, []);

    console.log(brokers)

    // Change the state when search is triggered
    const handleSearchState = (onBrokers) =>{
        setBrokers(onBrokers)
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center text-center">
                <SearchForm change={handleSearchState} />
            </div>

            <br></br>

            {brokers && brokers.length > 0 ? (

                    <table style={{textAlign:'center', justifyContent:"center"}}>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>License Number</th>
                        </tr>
                        {
                            brokers.map((broker) =>
                                <tr>
                                    <td>{broker.firstName}</td>
                                    <td>{broker.lastName}</td>
                                    <td>{broker.email}</td>
                                    <td>{broker.phoneNumber}</td>
                                    <td>{broker.licenseNumber}</td>

                                </tr>
                            )
                        }
                    </table>
            ) : (
                <div className="mx-auto" style={{ maxWidth: "1300px" }}>
                    <p>No properties yet</p>
                </div>
            )}
        </div>

    )
}
export default Brokers;
