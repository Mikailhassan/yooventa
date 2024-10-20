import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Students/StudentProfile.css';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const { teacherId } = useParams();

  useEffect(() => {
    // Simulating an API call to fetch teacher data
    const fetchTeacher = async () => {
      // Replace this with your actual API call
      const response = await fetch(`http://localhost:4000/schools/580e`);
      const data = await response.json();
      const foundTeacher = data.teachers.find(s => s.id === parseInt(teacherId, 10));
      setTeacher(foundTeacher);
    };

    fetchTeacher();
  }, [teacherId]);

  if (!teacher) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="student-profile">

      <div className="profile-header">
        <div className="avatar">
          {teacher.photo ? (
            <img src={teacher.photo} alt={teacher.name} />
          ) : (
            <div className="avatar-fallback">{teacher.name.charAt(0)}</div>
          )}
        </div>
        <div className="student-info">
          <h2>{teacher.name}</h2>
        </div>
      </div>

      <div className="profile-content">
        <div className="info-section">
          <h3>Personal Information</h3>
          <p>ID No: {teacher.idNo}</p>
          <p>Phone: {teacher.phone}</p>
          <p>Email: {teacher.email}</p>
          <p>Gender: {teacher.gender}</p>
          <p>Date of Birth: {new Date(teacher.dob).toLocaleDateString()}</p>
          <p>Address: {teacher.address}</p>
        </div>
        <div className="info-section">
          <h3>Employment Information</h3>
          <p>TSC NO: {teacher.tscNumber}</p>
          <p>Date of Joining: {new Date(teacher.doj).toLocaleDateString()}</p>
        </div>
        
        {teacher.fingerprint && (
          <div className="info-section">
            <h3>Fingerprint</h3>
            <p>Fingerprint data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;