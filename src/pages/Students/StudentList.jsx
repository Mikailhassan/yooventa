import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudents(data.students);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='table-container'>
      <h1>Student List</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Admission No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Stream</th>
            <th>Date of Join</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td><img src={student.photo} alt={"H"} width="24px" /></td>
              <td>{student.admNo}</td>
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{student.class}</td>
              <td>{student.stream}</td>
              <td>{new Date(student.doj).toLocaleDateString()}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.address}</td>
              <td>
                <Link to={`/teachers/${student.id}/edit`} className="edit-button">
                  <FiEdit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;