import React, { useState } from 'react';
import { CiTrash } from "react-icons/ci";

const SchoolRegistration = () => {
  const [schoolInfo, setSchoolInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    county: '',
    postalCode: ''
  });

  const [classSystem, setClassSystem] = useState('');
  const [classRange, setClassRange] = useState({
    start: '',
    end: ''
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setSchoolInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRangeChange = (type, value) => {
    const newRange = { ...classRange, [type]: value };
    setClassRange(newRange);

    const start = parseInt(newRange.start);
    const end = parseInt(newRange.end);
    if (!isNaN(start) && !isNaN(end) && start <= end) {
      const newClasses = [];
      for (let i = start; i <= end; i++) {
        newClasses.push({
          name: `${classSystem} ${i}`,
          streams: ['A']
        });
      }
      setClasses(newClasses);
    }
  };

  const addStream = (classIndex) => {
    setClasses(prev => prev.map((cls, idx) => 
      idx === classIndex
        ? { ...cls, streams: [...cls.streams, String.fromCharCode(65 + cls.streams.length)] }
        : cls
    ));
  };

  const removeStream = (classIndex, streamIndex) => {
    setClasses(prev => prev.map((cls, idx) => 
      idx === classIndex
        ? { ...cls, streams: cls.streams.filter((_, sIdx) => sIdx !== streamIndex) }
        : cls
    ));
  };

  const handleStreamChange = (classIndex, streamIndex, value) => {
    setClasses(prev => prev.map((cls, idx) => 
      idx === classIndex
        ? { ...cls, streams: cls.streams.map((stream, sIdx) => sIdx === streamIndex ? value : stream) }
        : cls
    ));
  };

  const validateForm = () => {
    switch (currentStep) {
      case 1:
        const requiredFields = ['name', 'email', 'phone', 'address', 'county', 'postalCode'];
        for (const field of requiredFields) {
          if (!schoolInfo[field]) {
            setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            return false;
          }
        }
        return true;

      case 2:
        if (!classSystem) {
          setError("Please select a class system");
          return false;
        }
        if (!classRange.start || !classRange.end) {
          setError("Please specify both start and end of the class range");
          return false;
        }
        if (parseInt(classRange.start) > parseInt(classRange.end)) {
          setError("Start class cannot be greater than end class");
          return false;
        }
        return true;

      case 3:
        if (classes.length === 0) {
          setError("Please add at least one class");
          return false;
        }
        for (const cls of classes) {
          if (cls.streams.length === 0) {
            setError("Each class must have at least one stream");
            return false;
          }
        }
        return true;

      default:
        return true;
    }
  };

  const clearErrorAndProceed = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError('');
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let step = 1; step <= 3; step++) {
      setCurrentStep(step);
      if (!validateForm()) {
        return;
      }
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = {
      schoolInfo,
      classSystem,
      classRange,
      classes
    };

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch('http://localhost:4000/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log("API response:", data);
      setSuccess('School registered successfully!');
    } catch (err) {
      console.error("Error submitting form:", err);
      setError('Failed to register school. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="school-container">
      <div className="card">
        <h2>School Registration</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          {currentStep === 1 && (
            <div className="form-group">
              <label htmlFor="name">School Name</label>
              <input
                id="name"
                name="name"
                value={schoolInfo.name}
                onChange={handleInfoChange}
                placeholder="Enter school name"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={schoolInfo.email}
                onChange={handleInfoChange}
                placeholder="Enter school email"
                required
              />

              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                value={schoolInfo.phone}
                onChange={handleInfoChange}
                placeholder="Enter phone number"
                required
              />

              <label htmlFor="address">Physical Address</label>
              <input
                id="address"
                name="address"
                value={schoolInfo.address}
                onChange={handleInfoChange}
                placeholder="Enter physical address"
                required
              />

              <label htmlFor="county">County</label>
              <input
                id="county"
                name="county"
                value={schoolInfo.county}
                onChange={handleInfoChange}
                placeholder="Enter county"
                required
              />

              <label htmlFor="postalCode">Postal Code</label>
              <input
                id="postalCode"
                name="postalCode"
                value={schoolInfo.postalCode}
                onChange={handleInfoChange}
                placeholder="Enter postal code"
                required
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-group">
              <label htmlFor="classSystem">Select Class System</label>
              <select
                id="classSystem"
                value={classSystem}
                onChange={(e) => setClassSystem(e.target.value)}
              >
                <option value="">Select class system</option>
                <option value="Grade">Grade</option>
                <option value="Form">Form</option>
                <option value="Class">Class</option>
              </select>

              {classSystem && (
                <div className="range-inputs">
                  <div>
                    <label>Start {classSystem}</label>
                    <input
                      type="number"
                      value={classRange.start}
                      onChange={(e) => handleRangeChange('start', e.target.value)}
                      placeholder={`Start ${classSystem}`}
                    />
                  </div>
                  <div>
                    <label>End {classSystem}</label>
                    <input
                      type="number"
                      value={classRange.end}
                      onChange={(e) => handleRangeChange('end', e.target.value)}
                      placeholder={`End ${classSystem}`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-group">
              {classes.map((cls, classIndex) => (
                <div key={classIndex} className="streams-container">
                  <h3>{cls.name} Streams</h3>
                  <div className="streams-list">
                    {cls.streams.map((stream, streamIndex) => (
                      <div key={streamIndex} className="stream-item">
                        <input
                          value={stream}
                          onChange={(e) => handleStreamChange(classIndex, streamIndex, e.target.value)}
                          placeholder={`Enter stream name`}
                        />
                        <button
                          type="button"
                          onClick={() => removeStream(classIndex, streamIndex)}
                          className="remove-stream"
                        >
                          <CiTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addStream(classIndex)}
                      className="add-stream"
                    >
                      Add Stream
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={loading}
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={(e) => clearErrorAndProceed(e)}
                disabled={loading}
              >
                Next
              </button>
            ) : (
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolRegistration;