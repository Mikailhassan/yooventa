import React, { useState, useEffect } from 'react';

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
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
  const [newParent, setNewParent] = useState({ name: '', phone: '', email: '', relationship: '' });


  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        const data = await response.json();
        setSchoolData(data); // Assuming we're using the first school in the array
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
  };

  const handleNewParentChange = (e) => {
    setNewParent({ ...newParent, [e.target.name]: e.target.value });
  };

  const handleCreateNewParent = () => {
    const newParentId = schoolData.parents.length + 1;
    const newParentWithId = { 
      ...newParent, 
      id: newParentId
    };
    setSelectedParent(newParentWithId);
    setNewParent({ name: '', phone: '', email: '', relationship: '' });
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
    try {
      let updatedParents = [...schoolData.parents];
      let parentId;
  
      if (selectedParent) {
        if (!updatedParents.some(p => p.id === selectedParent.id)) {
          // This is a newly created parent
          updatedParents.push(selectedParent);
        }
        parentId = selectedParent.id;
      }
  
      const newStudent = {
        id: schoolData.students.length + 1,
        ...formData,
        photo: {},
        parentIds: parentId ? [parentId] : [],
      };
  
      const updatedStudents = [...schoolData.students, newStudent];
  
      const response = await fetch('http://localhost:4000/schools/580e', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          students: updatedStudents,
          parents: updatedParents,
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
        fingerprint: null,
      });
      setSelectedParent(null);
    } catch (error) {
      console.error('Error registering student:', error);
      setMessage({ type: "error", text: "An error occurred while registering the student" });
    }
  };

  if (!schoolData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h2>Student Registration Form</h2>

      {message && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="admNo">Admission Number</label>
            <input id="admNo" name="admNo" value={formData.admNo} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-row">
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
        </div>

        <div className="form-row">
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
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
        </div>

        <button type="button" onClick={handleFingerprintCapture} className="fingerprint-btn">
          Capture Fingerprint
        </button>

        <div className="form-section">
          <h3>Parent Information</h3>
          <div className="form-group">
            <label htmlFor="parentSearch">Search for Parent</label>
            <input
              type="text"
              id="parentSearch"
              value={parentSearch}
              onChange={handleParentSearch}
              placeholder="Search by name or phone number"
            />
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
              <p>Phone: {selectedParent.phone}</p>
              <p>Email: {selectedParent.email}</p>
              <button type="button" onClick={() => setSelectedParent(null)}>Remove</button>
            </div>
          ) : (
            <div className="new-parent-form">
              <h4>Create New Parent</h4>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={newParent.name}
                    onChange={handleNewParentChange}
                    placeholder="Parent Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={newParent.phone}
                    onChange={handleNewParentChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={newParent.email}
                    onChange={handleNewParentChange}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <select
                    name="relationship"
                    value={newParent.relationship}
                    onChange={handleNewParentChange}
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
              </div>
              <button type="button" onClick={handleCreateNewParent}>Add New Parent</button>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Register Student</button>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;