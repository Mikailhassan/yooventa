// src/components/Students/AllStudents.jsx
import React from 'react';

const AllStudents = () => {
  const students = [
    // Sample data, replace with actual data
    {
      admNo: '1001',
      photo: 'url/to/photo1',
      name: 'Jane Smith',
      gender: 'Female',
      class: '10',
      stream: 'Science',
      doj: '2021-08-01',
      dob: '2005-04-15',
      parent: 'John Smith',
      address: '456 Elm St',
    },
    // Add more students as needed
  ];

  return (
    <div>
      <h1>All Students</h1>
      <table>
        <thead>
          <tr>
            <th>ADM NO</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Stream</th>
            <th>DOJ</th>
            <th>DOB</th>
            <th>Parent</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.admNo}</td>
              <td><img src={student.photo} alt={student.name} width="50" /></td>
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{student.class}</td>
              <td>{student.stream}</td>
              <td>{student.doj}</td>
              <td>{student.dob}</td>
              <td>{student.parent}</td>
              <td>{student.address}</td>
              <td><button>Edit</button> <button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
