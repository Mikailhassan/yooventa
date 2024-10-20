import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TeachersList = () => {
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
              <th>Photo</th>
              <th>ID NO</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>TSC Number</th>
              <th>Gender</th>
              <th>Date of Join</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td></td>
                <td>{teacher.idNo}</td>
                <td>{teacher.name}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.email}</td>
                <td>{teacher.tscNumber}</td>
                <td>{teacher.gender}</td>
                <td>{new Date(teacher.doj).toLocaleDateString()}</td>
                <td>{new Date(teacher.dob).toLocaleDateString()}</td>
                <td>{teacher.address}</td>
                <td>
                  <button className='table-btns'>SMS</button>
                  <button className='table-btns'>Email</button>
                </td>
                <td>
                  <button className='table-btns'>
                    <Link  to={`/teacher-profile/${teacher.id}`}>View</Link>
                  </button>
                  <button className='table-btns'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeachersList;