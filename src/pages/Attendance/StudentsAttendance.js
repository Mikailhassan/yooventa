// src/components/Attendance/SeeAttendanceStudents.jsx
import React from 'react';

const StudentsAttendance = () => {
  const attendanceData = [
    // Sample data, replace with actual data
    {
      photo: 'url/to/photo1',
      name: 'Jane Smith',
      gender: 'Female',
      class: '10',
      stream: 'Science',
      in: '09:00 AM',
      out: '03:00 PM',
      status: 'Present',
      parent: 'John Smith'
    },
    // Add more attendance data as needed
  ];

  return (
    <div>
      <h1>Attendance Details for Students</h1>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Stream</th>
            <th>In</th>
            <th>Out</th>
            <th>Status</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((data, index) => (
            <tr key={index}>
              <td><img src={data.photo} alt={data.name} width="50" /></td>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.class}</td>
              <td>{data.stream}</td>
              <td>{data.in}</td>
              <td>{data.out}</td>
              <td>{data.status}</td>
              <td>{data.parent}</td>
              <td><button>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsAttendance;
