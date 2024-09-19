// src/components/Parents/AllParents.jsx
import React from 'react';

const AllParents = () => {
  const parents = [
    // Sample data, replace with actual data
    {
      photo: 'url/to/photo1',
      name: 'Alice Brown',
      gender: 'Female',
      email: 'alice@example.com',
      phone: '9876543210',
      doj: '2020-09-01',
      dob: '1985-02-14',
      address: '789 Maple St',
      contact: 'Emergency Contact'
    },
    // Add more parents as needed
  ];

  return (
    <div>
      <h1>All Parents</h1>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOJ</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent, index) => (
            <tr key={index}>
              <td><img src={parent.photo} alt={parent.name} width="50" /></td>
              <td>{parent.name}</td>
              <td>{parent.gender}</td>
              <td>{parent.email}</td>
              <td>{parent.phone}</td>
              <td>{parent.doj}</td>
              <td>{parent.dob}</td>
              <td>{parent.address}</td>
              <td>{parent.contact}</td>
              <td><button>Edit</button> <button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllParents;
