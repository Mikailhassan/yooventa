import React, { useState, useEffect } from 'react';

const SchoolProfileDisplay = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const fetchSchoolData = async () => {
    try {
      const response = await fetch('http://localhost:4000/schools/580e');
      if (!response.ok) {
        throw new Error('Failed to fetch school data');
      }
      const data = await response.json();
      setSchoolData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!schoolData) return <div>No school data available</div>;

  return (
    <div className="school-profile">
      <h1 className="school-name">{schoolData.schoolInfo.name}</h1>
      <div className="school-info">
        <p><strong>Email:</strong> {schoolData.schoolInfo.email}</p>
        <p><strong>Phone:</strong> {schoolData.schoolInfo.phone}</p>
        <p><strong>Address:</strong> {schoolData.schoolInfo.address}</p>
        <p><strong>County:</strong> {schoolData.schoolInfo.county}</p>
        <p><strong>Postal Code:</strong> {schoolData.schoolInfo.postalCode}</p>
      </div>
      <div className="classes">
        <h2>Classes and Streams</h2>
        {schoolData.classes.map((classItem, index) => (
          <div key={index} className="class-item">
            <h3>{classItem.name}</h3>
            <p><strong>Streams:</strong> {classItem.streams.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolProfileDisplay;