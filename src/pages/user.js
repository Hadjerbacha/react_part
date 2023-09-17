import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [updateUser, setUpdateUser] = useState('');
  const [deleteUserId, setDeleteUserId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  const handleAddUser = async () => {
    await axios.post('http://localhost:5000/users', { name: newUser });
    fetchUsers();
    setNewUser('');
  };

  const handleUpdateUser = async () => {
    await axios.put(`http://localhost:5000/users/${updateUser.id}`, updateUser);
    fetchUsers();
    setUpdateUser('');
  };

  const handleDeleteUser = async () => {
    await axios.delete(`http://localhost:5000/users/${deleteUserId}`);
    fetchUsers();
    setDeleteUserId('');
  };

  return (
    <div className="App">
      <h1>Admin Page</h1>

      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Username"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add</button>
      </div>

      <div>
        <h2>Update User</h2>
        <select onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}>
          <option value="">Select user</option>
          {users.map((user, index) => (
            <option key={index} value={index}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New Username"
          value={updateUser.name || ''}
          onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
        />
        <button onClick={handleUpdateUser}>Update</button>
      </div>

      <div>
        <h2>Delete User</h2>
        <select onChange={(e) => setDeleteUserId(e.target.value)}>
          <option value="">Select user</option>
          {users.map((user, index) => (
            <option key={index} value={index}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteUser}>Delete</button>
      </div>

      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
