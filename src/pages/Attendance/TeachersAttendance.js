// src/components/Attendance/SeeAttendanceTeachers.jsx
import React from 'react';

const TeachersAttendance = () => {
  const attendanceData = [
    // Sample data, replace with actual data
    {
      photo: 'url/to/photo1',
      name: 'John Doe',
      gender: 'Male',
      email: 'john@example.com',
      phone: '1234567890',
      in: '09:00 AM',
      out: '03:00 PM',
      status: 'Present',
      contact: 'Emergency Contact'
    },
    // Add more attendance data as needed
  ];

  return (
    <div>
      <h1>Attendance Details for Teachers</h1>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>In</th>
            <th>Out</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((data, index) => (
            <tr key={index}>
              <td><img src={data.photo} alt={data.name} width="50" /></td>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.in}</td>
              <td>{data.out}</td>
              <td>{data.status}</td>
              <td>{data.contact}</td>
              <td><button>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersAttendance;
