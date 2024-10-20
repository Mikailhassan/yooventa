import React, { useState, useEffect } from 'react';
import './ParentProfile.css';
import { useParams } from 'react-router-dom';

const ParentProfile = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {parentId} = useParams()

  useEffect(() => {
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

    fetchSchoolData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const parent = schoolData.parents.find(p => p.id === parseInt(parentId));
  if (!parent) return <div>Parent not found</div>;

  const associatedStudents = schoolData.students.filter(student => student.parentIds.includes(parseInt(parentId)));

  return (
    <div className="parent-profile">
      <div className="card parent-card">
        <h2 className="card-title">{parent.name}</h2>
        <div className="parent-info">
          <div className="avatar">
            <img src="/api/placeholder/100/100" alt={parent.name} />
          </div>
          <div className="contact-info">
            <p><span className="icon">📞</span> {parent.phone}</p>
            <p><span className="icon">✉️</span> {parent.email}</p>
            <p><span className="icon">👤</span> {parent.relationship}</p>
          </div>
        </div>
      </div>

      <h3>Associated Students</h3>
      {associatedStudents.map(student => (
        <div key={student.id} className="card student-card">
          <h4>{student.name}</h4>
          <p>Admission No: {student.admNo}</p>
          <p>Class: {student.class} {student.stream}</p>
          <p>Gender: {student.gender}</p>
          <p>Date of Birth: {student.dob}</p>
          <p>Address: {student.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ParentProfile;