import React, { useState,useEffect } from 'react';
import UserList from '../../components/list/UserList';
import { useNavigate  } from "react-router-dom";

function Verify(){
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const result = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/users/nonverified`
          );
          const data = await result.json();
          setUsers(data);
        };
        fetchData();
      }, []);

    return(
        <div>
            <h1 style={{textAlign:"center"}}>Unverified Brokers</h1>
            <div className="d-flex justify-content-center text-center font-weight-bold">
                <button onClick={() => navigate(-1)} className="btn btn-dark"> Back </button>
            </div>
             
             {users.length > 0 ? (
            <UserList users={users}/>
            
          ) : (
            <div></div>
          )}

            

        </div>
       
    )
}

export default Verify;