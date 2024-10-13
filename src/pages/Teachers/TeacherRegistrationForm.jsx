import React, { useState } from 'react';

const TeacherRegistrationForm = ({}) => {
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
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
        alert('Teacher registered successfully!');
        // Reset form
        setFormData({
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
      } else {
        throw new Error('Failed to update school data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the teacher');
    }
  };

  return (
    <div className="teacher-registration-form">
      <h2>Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
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
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
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
          <button type="button" onClick={captureFingerprint}>
            Capture Fingerprint
          </button>
        </div>

        <button type="submit">Register Teacher</button>
      </form>
    </div>
  );
};

export default TeacherRegistrationForm;