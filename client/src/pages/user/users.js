import React, { useState,useEffect } from 'react';

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
        <h1>Brokers List</h1>
        {users.length > 0 ? (
            <div className="mx-auto" style={{ maxWidth: "1300px" }}>
            <div className="row">
              {users.map((user, index) => (
                
                <li key={index} >{user.email}</li>
                
              ))}
            </div>
          </div>
            
          ) : (
            <div className="mx-auto" style={{ maxWidth: "1300px" }}>
            <p>No users yet</p>
            </div>
          )}
    </div>

  )
}
export default Users;
