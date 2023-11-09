import React, { useState,useEffect } from 'react';
import SearchForm from "../../components/form/searchform"
import PropertyList from "../../components/list/PropertyList";
import {Form} from "react-router-dom";
import {Input} from "@mui/material";
import Button from "@mui/material/Button";

function Brokers(){

    const [brokers, setBrokers] = useState([]);
    const [brokersToList, setBrokersList] = useState([])
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


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

    const handleSearch = (fname, lname) => {
        console.log(fname + " - " + lname);

    }


    return (
        <div>
            <div className="d-flex align-items-center justify-content-center text-center">
               <Input type={"text"} placeholder={"First Name..."} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name..." required/>
                <Button onClick={ () => {handleSearch(firstName, lastName)}}> Search</Button>
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
