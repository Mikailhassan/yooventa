import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TeacherProfileEdit = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: '',
    idNo: '',
    email: '',
    phone: '',
    tscNo: '',
    gender: '',
    doj: '',
    dob: '',
    address: '',
    photo: '', // This will be a URL or file name initially from the server
  });

  const [photoFile, setPhotoFile] = useState(null); // New state to hold the selected file
  const [photoPreview, setPhotoPreview] = useState(''); // To hold the preview of the selected photo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/teachers/${teacherId}`);
        const data = await response.json();
        setUser(data);
        setPhotoPreview(data.photo); // Set initial photo from server
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [teacherId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file); // Store the file for submission
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(''); // Clear the preview
    setUser((prevUser) => ({
      ...prevUser,
      photo: '', // Clear photo in user state
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); // Use FormData to handle file upload

    // Append all the fields to formData
    formData.append('name', user.name);
    formData.append('idNo', user.idNo);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('tscNo', user.tscNo);
    formData.append('gender', user.gender);
    formData.append('doj', user.doj);
    formData.append('dob', user.dob);
    formData.append('address', user.address);

    if (photoFile) {
      formData.append('photo', photoFile); // Only append if a new photo was uploaded
    }

    try {
      const response = await fetch(`http://localhost:4000/teachers/${teacherId}`, {
        method: 'PUT',
        body: formData, // Send the FormData with the request
      });
      
      if (response.ok) {
        navigate(`/teacher/${teacherId}`); // Navigate back to details page on success
      } else {
        setError('Failed to update teacher details.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating teacher details.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='edit-teacher-container'>
      <h2>Edit Teacher Details</h2>
      <form onSubmit={handleFormSubmit} className="edit-teacher-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>National ID:</label>
          <input
            type="text"
            name="idNo"
            value={user.idNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>TSC No:</label>
          <input
            type="text"
            name="tscNo"
            value={user.tscNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="doj"
            value={user.doj}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Photo upload and preview */}
        <div className='form-photo-wrapper'>
          <label>Photo</label>
          <div className='phoooto-div'>
            {photoPreview ? (
              <img src={photoPreview} alt="Photo Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            ) : (
              <p>No photo selected</p>
            )}
          </div>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
            id="upload-photo-input"
          />
          <div className='phoooto-btns'>
            <button
              type="button"
              onClick={() => document.getElementById('upload-photo-input').click()}
            >
              Upload Photo
            </button>
            <button
              type="button"
              onClick={handleRemovePhoto}
              disabled={!photoPreview} // Disable the remove button if no photo is uploaded
            >
              Remove Photo
            </button>
          </div>
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default TeacherProfileEdit;
