import React, { useState } from 'react';

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    idNo: '',
    name: '',
    email: '',
    phone: '',
    photo: null,
    gender: '',
    doj: '',
    dob: '',
    address: '',
    tscNumber: '',
    fingerprint: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const captureFingerprint = () => {
    // Simulating fingerprint capture
    const simulatedFingerprint = null;
    setFormData({ ...formData, fingerprint: simulatedFingerprint });
    alert('Fingerprint captured successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // First, fetch the current school data
      const schoolResponse = await fetch(`http://localhost:4000/schools/580e`);
      if (!schoolResponse.ok) {
        throw new Error('Failed to fetch school data');
      }
      const schoolData = await schoolResponse.json();

      // Prepare the new teacher data
      const newTeacher = {
        id: schoolData.teachers.length + 1, // Simple ID generation
        ...formData,
        photo: {}, // Placeholder for photo object
      };

      // Add the new teacher to the school's teachers array
      schoolData.teachers.push(newTeacher);

      // Update the school data on the server
      const updateResponse = await fetch(`http://localhost:4000/schools/580e`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });

      if (updateResponse.ok) {
        // Reset form
        setFormData({
          idNo: "",
          name: '',
          email: '',
          phone: '',
          photo: null,
          gender: '',
          doj: '',
          dob: '',
          address: '',
          tscNumber: '',
          fingerprint: null,
        });
        setPhotoPreview(null);
      } else {
        throw new Error('Failed to update school data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the teacher');
    }
  };

  return (
    <div className="registration-form">
      <h2>Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <div className="photo-upload-container">
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <div className="photo-preview">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" />
              ) : (
                <span>Click to upload photo</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="idNo">ID number:</label>
          <input
            type="text"
            id="idNo"
            name="idNo"
            value={formData.idNo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tscNumber">TSC Number:</label>
          <input
            type="text"
            id="tscNumber"
            name="tscNumber"
            value={formData.tscNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="doj">Date of Joining:</label>
          <input
            type="date"
            id="doj"
            name="doj"
            value={formData.doj}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea 
            name="address"
            id="address"
            onChange={handleInputChange}
            value={formData.address} 
            cols="30"
            required
          ></textarea>
        </div>

        <button type="button" onClick={captureFingerprint} className='capture-fingerprint'>Capture Fingerprint</button>
        <button type="submit" className='form-submit-btn'>Register Teacher</button>
      </form>
    </div>
  );
};

export default TeacherRegistration;