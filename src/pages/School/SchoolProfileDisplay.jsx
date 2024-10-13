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
      const response = await fetch('http://localhost:4000/schools/a746');
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
    <div className="school-profile-container">
      <h2>{schoolData.schoolInfo.name} Profile</h2>
      
      <section className="school-info">
        <h3>School Information</h3>
        <ul>
          {Object.entries(schoolData.schoolInfo).map(([key, value]) => (
            <li key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </li>
          ))}
        </ul>
      </section>

      <section className="class-system">
        <h3>Class System</h3>
        <p><strong>{schoolData.classSystem} System</strong></p>
        <p>Range: {schoolData.classRange.start} to {schoolData.classRange.end}</p>
      </section>

      <section className="classes-and-streams">
        <h3>Classes and Streams</h3>
        {schoolData.classes.map((cls, index) => (
          <div key={index} className="class-item">
            <h4>{cls.name}</h4>
            <ul>
              {cls.streams.map((stream, streamIndex) => (
                <li key={streamIndex}>Stream {stream}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SchoolProfileDisplay;