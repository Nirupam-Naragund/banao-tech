import React, { useState, useEffect } from 'react';
import './Home.css';
import Example from '../Loading';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initially set filteredUsers to all users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleImageError = (event) => {
    event.target.onerror = null; // Prevent infinite loop
    event.target.src = 'No-profile.jpg'; // Fallback image URL
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
    // Filter users based on search query
    const filtered = users.filter((user) =>
      `${user.profile.firstName} ${user.profile.lastName}`.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered); // Update filteredUsers state
  };

  return (
    <div className="app">
      <div className="user-list">
        <h2>Users List</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {loading && <Example />}
        {!loading && filteredUsers.length === 0 && <p>No matching users found</p>}
        {!loading &&
          filteredUsers.map((user) => (
            <div key={user.id} className={`user-item ${selectedUser && selectedUser.id === user.id ? 'active' : ''}`} onClick={() => handleUserClick(user)}>
              <img src={user.avatar} alt={user.profile.firstName + ' ' + user.profile.lastName} onError={handleImageError} />
              <p>{user.profile.firstName + ' ' + user.profile.lastName}</p>
            </div>
          ))}
      </div>
      <div className="user-details">
        
        <h2>User Details</h2>
        {selectedUser ? (
          <div>
            <img src={selectedUser.avatar} alt={selectedUser.profile.firstName + ' ' + selectedUser.profile.lastName} onError={handleImageError} />
            <p>Name: {selectedUser.profile.firstName + ' ' + selectedUser.profile.lastName}</p>
            <p>Email: {selectedUser.profile.email}</p>
            <p>Job Title: {selectedUser.jobTitle}</p>
            <p>Bio: {selectedUser.Bio}</p>
          </div>
        ) : (
          <p>Select a user to view details</p>
        )}
      
      </div>
    </div>
  );
};

export default Home;
