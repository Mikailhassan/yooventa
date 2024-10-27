import React, { useState, useEffect } from 'react';
import { CiTrash } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';
import './school.css'

const SchoolProfileEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedSchool, setEditedSchool] = useState({
    schoolInfo: {},
    classes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchoolData();
  }, [id]);

  const fetchSchoolData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/schools/${id}`);
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
      const response = await fetch(`http://localhost:4000/schools/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSchool),
      });
      if (!response.ok) {
        throw new Error('Failed to update school data');
      }
      navigate(`/school-profile`); // Redirect to profile view after successful save
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="school-edit-container">
      <h2>Edit School Information</h2>
      <form onSubmit={handleSave}>
        <div className="school-edit-form-group">
          <h3>School Information</h3>
          {Object.entries(editedSchool.schoolInfo).map(([key, value]) => (
            <div key={key} className="school-edit-input-group">
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

        <div className="school-edit-form-group">
          <h3>Classes and Streams</h3>
          {editedSchool.classes.map((cls, classIndex) => (
            <div key={classIndex} className="school-edit-streams-container">
              <h4>{cls.name} Streams</h4>
              <div className="school-edit-streams-list">
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
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => navigate(`/school-profile`)}>
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolProfileEdit;