import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
 
const Admin = () => { 
  const [users, setUsers] = useState([]); 
  const [newUser, setNewUser] = useState({ username: "", password: "" }); 
 
  const fetchUsers = async () => { 
    try { 
      const response = await axios.get("http://localhost:5000/api/users", { 
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }, 
      }); 
      setUsers(response.data); 
    } catch (error) { 
      console.error("Fetching users error:", error); 
    } 
  }; 
 
  const handleAddUser = async () => { 
    try { 
      await axios.post( 
        "http://localhost:5000/api/users", 
        newUser, 
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }, 
        } 
      ); 
      setNewUser({ username: "", password: "" }); 
      fetchUsers(); 
    } catch (error) { 
      console.error("Adding user error:", error); 
    } 
  }; 
 
  useEffect(() => { 
    fetchUsers(); 
  }, []); 
 
  return ( 
    <div> 
      <h2>Admin Dashboard</h2> 
      <div> 
        <h3>Add User</h3> 
        <input 
          type="text" 
          placeholder="Username" 
          value={newUser.username} 
          onChange={(e) => 
            setNewUser({ ...newUser, username: e.target.value }) 
          } 
        /> 
        <input 
          type="password" 
          placeholder="Password" 
          value={newUser.password} 
          onChange={(e) => 
            setNewUser({ ...newUser, password: e.target.value }) 
          } 
        /> 
        <button onClick={handleAddUser}>Add User</button> 
      </div> 
      <div> 
        <h3>Users List</h3> 
        <ul> 
          {users.map((user) => ( 
            <li key={user._id}>{user.username}</li> 
          ))} 
        </ul> 
      </div> 
    </div> 
  ); 
}; 
 
export default Admin;