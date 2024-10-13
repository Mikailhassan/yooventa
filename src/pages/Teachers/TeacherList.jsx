import React, { useState, useEffect } from 'react';
// import './TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTeachers(data.teachers || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className='table-container'>
      <h1>Teacher List</h1>
      {teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Date of Join</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>TSC Number</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.gender}</td>
                <td>{new Date(teacher.doj).toLocaleDateString()}</td>
                <td>{new Date(teacher.dob).toLocaleDateString()}</td>
                <td>{teacher.address}</td>
                <td>{teacher.tscNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherList;