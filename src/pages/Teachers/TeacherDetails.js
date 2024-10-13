import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TeacherDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/teachers/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className='pages-body'>
      <div className='table-wrapper-div'>
        <div className='profile-details-div'>
          <div className='profile-details-phooto-div'>
            <div className='profile-details-only-phooto-name-div'>
              <img src={user.photo} alt="User" />
              <p>{user.name}</p>
            </div>
            <div>
            <Link to={`/edit/${userId}`}>
              <button className="edit-button">Edit</button>
            </Link>
            <Link to={`/edit/${userId}`}>
              <button className="edit-button">View</button>
            </Link>
            </div>
          </div>

          <div className='profile-other-details-div'>
            <table className="profile-details-table">
              <tbody>
                <tr>
                  <td>ID Number</td>
                  <td>{user.nationalId}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <td>TSC No</td>
                  <td>{user.tscNo}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{user.gender}</td>
                </tr>
                <tr>
                  <td>Date of Joining</td>
                  <td>{user.doj}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{user.dob}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{user.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;