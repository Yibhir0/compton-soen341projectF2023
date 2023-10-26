import React, { useState,useEffect } from 'react';
import UserList from '../../components/list/UserList';

function Users(){

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/users`
      );
      const data = await result.json();
      setUsers(data);
    };
    fetchData();
  }, []);


  return (
    <div>
        <h1 style={{textAlign:"center"}} >Brokers</h1>
        {users.length > 0 ? (
            <UserList users={users}/>
            
          ) : (
            <div className="mx-auto" style={{ maxWidth: "1300px" }}>
            <p>No Brokers yet</p>
            </div>
          )}
    </div>

  )
}
export default Users;
