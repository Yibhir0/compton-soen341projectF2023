import React, { useState,useEffect } from 'react';
import UserList from '../../components/list/UserList';
import { isAdmin } from '../../utils/auth'
function Users(){

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/brokers/`
      );
      const data = await result.json();
      setUsers(data);
    };
    if(isAdmin()){
      fetchData();
    }
    
  }, []);


  return (
    <div>
        {isAdmin() && (
        <div>
          <h1 style={{ textAlign: "center" }}>Brokers</h1>
          {users.length > 0 ? (
            <UserList users={users} />
          ) : (
            <div className="mx-auto" style={{ maxWidth: "1300px" }}>
              There are currently no brokers in the system.
            </div>
          )}
        </div>
      )}
    </div>

  )
}
export default Users;
