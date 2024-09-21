import React from 'react';
import { Link } from 'react-router-dom';

const UsersTable = ({ users, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.idNo}>
            <td>{user.idNo}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Link to={`/users/${user.idNo}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => onDelete(user.idNo)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;





import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersTable from './UsersTable';
import UserDetail from './UserDetail';

const App = () => {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleDelete = async (idNo) => {
    try {
      await fetch(`/api/users/${idNo}`, { method: 'DELETE' });
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersTable users={users} onDelete={handleDelete} />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        console.error('Error updating user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Details</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Input fields as in the previous example */}
          <input type="text" name="idNo" value={formData.idNo} onChange={handleChange} />
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          <input type="text" name="tscNo" value={formData.tscNo} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="date" name="doj" value={formData.doj} onChange={handleChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
          <input type="url" name="photo" value={formData.photo} onChange={handleChange} />
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <p>ID No: {user.idNo}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>TSC No: {user.tscNo}</p>
          <p>Gender: {user.gender}</p>
          <p>Date of Joining: {user.doj}</p>
          <p>Date of Birth: {user.dob}</p>
          <p>Address: {user.address}</p>
          <img src={user.photo} alt="User" style={{ width: '100px', height: '100px' }} />
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
