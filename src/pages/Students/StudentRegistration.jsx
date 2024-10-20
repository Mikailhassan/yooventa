import React, { useState, useEffect } from 'react';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    photo: null,
    admNo: "",
    name: "",
    gender: "",
    class: "",
    stream: "",
    doj: "",
    dob: "",
    address: "",
    fingerprint: null,
  });
  const [schoolData, setSchoolData] = useState(null);
  const [availableStreams, setAvailableStreams] = useState([]);
  const [message, setMessage] = useState(null);
  const [parentSearch, setParentSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [newParent, setNewParent] = useState({ idNo: '', name: '', phone: '', email: '', gender: '', relationship: '' });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isParentSubmitted, setIsParentSubmitted] = useState(false);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        const data = await response.json();
        setSchoolData(data);
      } catch (error) {
        console.error('Error fetching school data:', error);
        setMessage({ type: "error", text: "Failed to fetch school data" });
      }
    };

    fetchSchoolData();
  }, []);

  useEffect(() => {
    if (formData.class && schoolData) {
      const selectedClass = schoolData.classes.find(c => c.name === formData.class);
      setAvailableStreams(selectedClass ? selectedClass.streams : []);
    }
  }, [formData.class, schoolData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleParentSearch = (e) => {
    const searchTerm = e.target.value;
    setParentSearch(searchTerm);

    if (searchTerm.length > 2) {
      const results = schoolData.parents.filter(parent =>
        parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.phone.includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectParent = (parent) => {
    setSelectedParent(parent);
    setParentSearch('');
    setSearchResults([]);
    setIsParentSubmitted(true);
  };

  const handleNewParentChange = (e) => {
    setNewParent({ ...newParent, [e.target.name]: e.target.value });
  };

  const handleCreateNewParent = async () => {
    try {
      const newParentWithId = {
        ...newParent,
        id: schoolData.parents.length + 1
      };

      const response = await fetch('http://localhost:4000/schools/580e', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parents: [...schoolData.parents, newParentWithId],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add new parent');
      }

      const updatedSchool = await response.json();
      setSchoolData(updatedSchool);
      setSelectedParent(newParentWithId);
      setNewParent({ idNo: '', name: '', phone: '', email: '', gender: '', relationship: '' });
      setIsParentSubmitted(true);
      setMessage({ type: "success", text: "New parent added successfully" });
    } catch (error) {
      console.error('Error adding new parent:', error);
      setMessage({ type: "error", text: "An error occurred while adding the new parent" });
    }
  };

  const handleFingerprintCapture = async () => {
    try {
      // Mock fingerprint capture
      const result = { data: "mock-fingerprint-data" };
      setFormData({ ...formData, fingerprint: result.data });
      setMessage({ type: "success", text: "Fingerprint captured successfully" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to capture fingerprint" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isParentSubmitted) {
      setMessage({ type: "error", text: "Please select or add a parent before submitting the student form" });
      return;
    }
    try {
      const newStudent = {
        id: schoolData.students.length + 1,
        ...formData,
        photo: {},
        parentIds: [selectedParent.id],
      };

      const updatedStudents = [...schoolData.students, newStudent];

      const response = await fetch('http://localhost:4000/schools/580e', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          students: updatedStudents,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register student');
      }

      const updatedSchool = await response.json();
      setSchoolData(updatedSchool);
      setMessage({ type: "success", text: "Student registered successfully with parent information" });
      // Reset form and parent selection
      setFormData({
        admNo: "",
        name: "",
        gender: "",
        class: "",
        stream: "",
        doj: "",
        dob: "",
        address: "",
        photo: null,
        fingerprint: null,
      });
      setSelectedParent(null);
      setIsParentSubmitted(false);
    } catch (error) {
      console.error('Error registering student:', error);
      setMessage({ type: "error", text: "An error occurred while registering the student" });
    }
  };

  if (!schoolData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="registration-form">
      <h2>Student Registration Form</h2>

      {message && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}
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
          <label htmlFor="admNo">Admission Number</label>
          <input id="admNo" name="admNo" type="text" value={formData.admNo} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleSelectChange} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="class">{schoolData.classSystem}</label>
          <select name="class" value={formData.class} onChange={handleSelectChange} required>
            <option value="">Select {schoolData.classSystem.toLowerCase()}</option>
            {schoolData.classes.map((cls) => (
              <option key={cls.name} value={cls.name}>{cls.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stream">Stream</label>
          <select name="stream" value={formData.stream} onChange={handleSelectChange} required>
            <option value="">Select stream</option>
            {availableStreams.map((stream) => (
              <option key={stream} value={stream}>{stream}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="doj">Date of Joining</label>
          <input type="date" id="doj" name="doj" value={formData.doj} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required></textarea>
        </div>

        <div className="parent-form-section">
          <h3>Parent Information</h3>
          <div className="form-group">
            <label htmlFor="parentSearch">Search for Parent</label>
            <input type="text" id="parentSearch" value={parentSearch} onChange={handleParentSearch} placeholder="Search by name or phone number" />
          </div>

          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map(parent => (
                <li key={parent.id} onClick={() => handleSelectParent(parent)}>
                  {parent.name} - {parent.phone}
                </li>
              ))}
            </ul>
          )}

          {selectedParent ? (
            <div className="selected-parent">
              <h4>Selected Parent</h4>
              <p>{selectedParent.name} - {selectedParent.relationship}</p>
              <p>ID Number: {selectedParent.idNo}</p>
              <p>Phone: {selectedParent.phone}</p>
              <p>Email: {selectedParent.email}</p>
              <p>Gender: {selectedParent.gender}</p>
              <button type="button" onClick={() => {
                setSelectedParent(null);
                setIsParentSubmitted(false);
              }}>Remove</button>
            </div>
          ) : (
            <div className="new-parent-form">
              <h4>If parent doesn't exist, create new parent</h4>
              <div className="form-group">
                <input type="text" name="idNo" value={newParent.idNo} onChange={handleNewParentChange} required placeholder='Enter parent ID number' />
              </div>
              <div className="form-group">
                <input type="text" name="name" value={newParent.name} onChange={handleNewParentChange} required placeholder='Enter parent name' />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" value={newParent.phone} onChange={handleNewParentChange} required placeholder='Enter parent phone' />
              </div>
              <div className="form-group">
                <input type="email" name="email" value={newParent.email} onChange={handleNewParentChange} placeholder='Enter parent email' />
              </div>
              <div className="form-group">
                <select name="gender" value={newParent.gender} onChange={handleNewParentChange} required>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <select name="relationship" value={newParent.relationship} onChange={handleNewParentChange} required>
                  <option value="">Select Relationship</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              <button type="button" onClick={handleCreateNewParent} className='form-submit-btn'>Add New Parent</button>
            </div>
          )}
        </div>

        <button type="button" onClick={handleFingerprintCapture} className="capture-fingerprint">
          Capture Fingerprint
        </button>

        <button type="submit" className='form-submit-btn' disabled={!isParentSubmitted}>
          Register Student
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;