// src/components/Teachers/AllTeachers.jsx
import React from 'react';
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";

const AllTeachers = () => {

  const [teachers, setTeachers] = React.useState([]);

  const fetchTeachers = async () => {
    const response = await fetch('http://localhost:4000/teachers');
    const data = await response.json();
    setTeachers(data);
  };

  React.useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className='pages-body'>
      <div className='table-wrapper-div'>
        <h1 className='table-wrapper-div-h1'>Teachers</h1>
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Photo</th>
                <th>ID NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>TSC NO</th>
                <th>Gender</th>
                <th>DOJ</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td><img src={teacher.photo} alt={teacher.name} width={"24px"} /></td>
                  <td>{teacher.nationalId}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.tscNo}</td>
                  <td>{teacher.gender}</td>
                  <td>{teacher.doj}</td>
                  <td>{teacher.dob}</td>
                  <td>{teacher.address}</td>
                  <td><AiOutlineMessage />  <MdOutlineMail /></td>
                  <td><FiEdit /> <MdOutlineDeleteForever /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>


  );
};

export default AllTeachers;
