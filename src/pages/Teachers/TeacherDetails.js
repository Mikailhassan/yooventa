import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

const UserDetail = () => {
  // const { userId } = useParams(); // Use userId from the route params
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/teachers/1`);
        const data = await response.json();
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/teachers/1`, {
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
    <div className='pages-body'>
      <div className='table-wrapper-div'>
        <h2>Teacher Profile</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input type="text" name="nationalId" value={formData.nationalId || ''} onChange={handleChange} />
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
            <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} />
            <input type="text" name="tscNo" value={formData.tscNo || ''} onChange={handleChange} />
            <select name="gender" value={formData.gender || ''} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="date" name="doj" value={formData.doj || ''} onChange={handleChange} />
            <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} />
            <textarea name="address" value={formData.address || ''} onChange={handleChange}></textarea>
            <input type="url" name="photo" value={formData.photo || ''} onChange={handleChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
          <div>
            <img src={user.photo} alt="User" style={{ width: '100px', height: '100px' }} />
            <p>Name {user.name}</p>
            <p>ID No {user.nationalId}</p>
            <p>Email {user.email}</p>
            <p>Phone {user.phone}</p>
            <p>TSC No {user.tscNo}</p>
            <p>Gender {user.gender}</p>
            <p>Date of Joining {user.doj}</p>
            <p>Date of Birth {user.dob}</p>
            <p>Address {user.address}</p>
            <button onClick={handleEditToggle}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
