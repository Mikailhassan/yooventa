import React, { useState, useEffect } from 'react';
import './StudentProfile.css'; // We'll create this CSS file separately

const StudentProfile = ({  }) => {
  const [student, setStudent] = useState(null);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/schools/580e`);
        const data = await response.json();
        const foundStudent = data.students.find(s => s.id === 1);
        setStudent(foundStudent);
        
        if (foundStudent) {
          const studentParents = data.parents.filter(p => foundStudent.parentIds.includes(p.id));
          setParents(studentParents);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-profile">
      <div className="profile-header">
        <div className="avatar">
          {student.photo.url ? (
            <img src={student.photo.url} alt={student.name} />
          ) : (
            <div className="avatar-fallback">{student.name.charAt(0)}</div>
          )}
        </div>
        <div className="student-info">
          <h2>{student.name}</h2>
          <p>Admission No: {student.admNo}</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="info-section">
          <h3>Personal Information</h3>
          <p>Gender: {student.gender}</p>
          <p>Date of Birth: {new Date(student.dob).toLocaleDateString()}</p>
          <p>Address: {student.address}</p>
        </div>
        <div className="info-section">
          <h3>Academic Information</h3>
          <p>Class: {student.class}</p>
          <p>Stream: {student.stream}</p>
          <p>Date of Joining: {new Date(student.doj).toLocaleDateString()}</p>
        </div>
        
        <div className="info-section">
          <h3>Parent Information</h3>
          {parents.map(parent => (
            <div key={parent.id} className="parent-info">
              <p>{parent.name} ({parent.relationship})</p>
              <p>Phone: {parent.phone}</p>
              <p>Email: {parent.email}</p>
            </div>
          ))}
        </div>
        
        {student.fingerprint && (
          <div className="info-section">
            <h3>Fingerprint</h3>
            <p>Fingerprint data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;