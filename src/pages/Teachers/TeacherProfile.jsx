import React, { useState, useEffect } from 'react';
// import './TeacherProfile.css'; // We'll create this CSS file separately

const TeacherProfile = ({  }) => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/schools/580e`);
        const data = await response.json();
        const foundTeacher = data.teachers.find(t => t.id === 1);
        setTeacher(foundTeacher);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchTeacherData();
  }, []);

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="teacher-profile">
      <div className="profile-header">
        <div className="avatar">
          {teacher.photo.url ? (
            <img src={teacher.photo.url} alt={teacher.name} />
          ) : (
            <div className="avatar-fallback">{teacher.name.charAt(0)}</div>
          )}
        </div>
        <div className="teacher-info">
          <h2>{teacher.name}</h2>
          <p>TSC Number: {teacher.tscNumber}</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="info-section">
          <h3>Personal Information</h3>
          <p>Gender: {teacher.gender}</p>
          <p>Date of Birth: {new Date(teacher.dob).toLocaleDateString()}</p>
          <p>Address: {teacher.address}</p>
        </div>
        <div className="info-section">
          <h3>Contact Information</h3>
          <p>Email: {teacher.email}</p>
          <p>Phone: {teacher.phone}</p>
        </div>
        <div className="info-section">
          <h3>Employment Information</h3>
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