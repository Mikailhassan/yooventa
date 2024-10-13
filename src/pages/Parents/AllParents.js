// src/components/Teachers/AllTeachers.jsx
import React from 'react';
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";

const AllParents = () => {

  const [parents, setParents] = React.useState([]);

  const fetchParents = async () => {
    const response = await fetch('http://localhost:4000/teachers');
    const data = await response.json();
    setParents(data);
  };

  React.useEffect(() => {
    fetchParents();
  }, []);

  return (
    <div className='pages-body'>
      <div className='table-wrapper-div'>
        <h1 className='table-wrapper-div-h1'>Parents</h1>
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Photo</th>
                <th>ID NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent, index) => (
                <tr key={index}>
                  <td><img src={parent.photo} alt={parent.name} width={"24px"} /></td>
                  <td>{parent.nationalId}</td>
                  <td>{parent.name}</td>
                  <td>{parent.email}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.gender}</td>
                  <td>{parent.dob}</td>
                  <td>{parent.address}</td>
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

export default AllParents;
