import React, { useState, useEffect } from 'react';
import { CiTrash } from "react-icons/ci";

const SchoolProfileEdit = () => {
  const [editedSchool, setEditedSchool] = useState({
    schoolInfo: {},
    classSystem: '',
    classRange: { start: '', end: '' },
    classes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchoolData();
  }, []);

  useEffect(() => {
    if (editedSchool.classRange.start && editedSchool.classRange.end) {
      updateClassesBasedOnRange(editedSchool.classRange.start, editedSchool.classRange.end);
    }
  }, [editedSchool.classSystem]);

  const fetchSchoolData = async () => {
    try {
      const response = await fetch('http://localhost:4000/schools/580e');
      if (!response.ok) {
        throw new Error('Failed to fetch school data');
      }
      const data = await response.json();
      setEditedSchool(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/schools/580e', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSchool),
      });
      if (!response.ok) {
        throw new Error('Failed to update school data');
      }
      alert('School information updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setEditedSchool(prev => ({
      ...prev,
      schoolInfo: {
        ...prev.schoolInfo,
        [name]: value
      }
    }));
  };

  const handleClassSystemChange = (e) => {
    setEditedSchool(prev => ({
      ...prev,
      classSystem: e.target.value
    }));
  };

  const handleRangeChange = (type, value) => {
    setEditedSchool(prev => {
      const newClassRange = {
        ...prev.classRange,
        [type]: value
      };
      
      // Call updateClassesBasedOnRange after updating the class range
      setTimeout(() => updateClassesBasedOnRange(newClassRange.start, newClassRange.end), 0);
      
      return {
        ...prev,
        classRange: newClassRange
      };
    });
  };



  const updateClassesBasedOnRange = (start, end) => {
    const newClasses = [];
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      const existingClass = editedSchool.classes.find(cls => cls.name === `${editedSchool.classSystem} ${i}`);
      if (existingClass) {
        newClasses.push(existingClass);
      } else {
        newClasses.push({
          name: `${editedSchool.classSystem} ${i}`,
          streams: ['A']
        });
      }
    }
    setEditedSchool(prev => ({
      ...prev,
      classes: newClasses
    }));
  };

  const addStream = (classIndex) => {
    setEditedSchool(prev => ({
      ...prev,
      classes: prev.classes.map((cls, idx) => 
        idx === classIndex
          ? { ...cls, streams: [...cls.streams, String.fromCharCode(65 + cls.streams.length)] }
          : cls
      )
    }));
  };

  const removeStream = (classIndex, streamIndex) => {
    setEditedSchool(prev => ({
      ...prev,
      classes: prev.classes.map((cls, idx) => 
        idx === classIndex
          ? { ...cls, streams: cls.streams.filter((_, sIdx) => sIdx !== streamIndex) }
          : cls
      )
    }));
  };

  const handleStreamChange = (classIndex, streamIndex, value) => {
    setEditedSchool(prev => ({
      ...prev,
      classes: prev.classes.map((cls, idx) => 
        idx === classIndex
          ? { ...cls, streams: cls.streams.map((stream, sIdx) => sIdx === streamIndex ? value : stream) }
          : cls
      )
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="school-edit-container">
      <h2>Edit School Information</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <h3>School Information</h3>
          {Object.entries(editedSchool.schoolInfo).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                id={key}
                name={key}
                value={value}
                onChange={handleInfoChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <h3>Class System</h3>
          <select
            value={editedSchool.classSystem}
            onChange={handleClassSystemChange}
          >
            <option value="Grade">Grade</option>
            <option value="Form">Form</option>
            <option value="Class">Class</option>
          </select>

          <div className="range-inputs">
            <div>
              <label>Start {editedSchool.classSystem}</label>
              <input
                type="number"
                value={editedSchool.classRange.start}
                onChange={(e) => handleRangeChange('start', e.target.value)}
                required
              />
            </div>
            <div>
              <label>End {editedSchool.classSystem}</label>
              <input
                type="number"
                value={editedSchool.classRange.end}
                onChange={(e) => handleRangeChange('end', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <h3>Classes and Streams</h3>
          {editedSchool.classes.map((cls, classIndex) => (
            <div key={classIndex} className="streams-container">
              <h4>{cls.name} Streams</h4>
              <div className="streams-list">
                {cls.streams.map((stream, streamIndex) => (
                  <div key={streamIndex} className="stream-item">
                    <input
                      value={stream}
                      onChange={(e) => handleStreamChange(classIndex, streamIndex, e.target.value)}
                      placeholder="Enter stream name"
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
        <button type="submit" className="save-button" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default SchoolProfileEdit;