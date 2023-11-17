import React, { useState, useEffect } from 'react';
import { Input } from "@mui/material";


function Brokers() {

    const [brokers, setBrokers] = useState([]);
    const [name, setName] = useState("");


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



    const filterBrokers = (name) => {
        return brokers.filter((b) => {
            if (!name) return true;
            if (b.firstName.toLowerCase().includes(name.toLowerCase()) || b.lastName.toLowerCase().includes(name.toLowerCase())) return true;
            return false;
        })
    }




    return (
        <div>
            <div className="d-flex align-items-center justify-content-center text-center">
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..." required />
            </div>

            <br></br>

            {brokers && brokers.length > 0 ? (

                <table style={{ textAlign: 'center', justifyContent: "center" }} className={"brokers-table"}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>License Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterBrokers(name).map((broker, index) =>
                                <tr key={index}>
                                    <td>{broker.firstName}</td>
                                    <td>{broker.lastName}</td>
                                    <td>{broker.email}</td>
                                    <td>{broker.phoneNumber}</td>
                                    <td>{broker.licenseNumber}</td>
                                    <td><a href={`/users/user/view/${broker._id}`}>View</a></td>

                                </tr>
                            )

                        }
                    </tbody>
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
