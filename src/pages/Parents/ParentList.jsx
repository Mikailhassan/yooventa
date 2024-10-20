import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ParentList = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        if (!response.ok) {
          throw new Error('Failed to fetch school data');
        }
        const data = await response.json();
        setParents(data.parents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className='table-container'>
      <h2>Parent List</h2>
      {parents.length === 0 ? (
        <p>No parents found.</p>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID NO</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parents.map(parent => (
              <tr key={parent.id}>
                <td>{parent.idNo}</td>
                <td>{parent.name}</td>
                <td>{parent.phone}</td>
                <td>{parent.email}</td>
                <td>{parent.gender}</td>
                <td>
                  <button className='table-btns'>SMS</button>
                  <button className='table-btns'>Email</button>
                </td>
                <td>
                  <button className='table-btns'>
                    <Link  to={`/parent-profile/${parent.id}`}>View</Link>
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

export default ParentList;