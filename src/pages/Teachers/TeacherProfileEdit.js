// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const TeacherProfileEdit = () => {
//   const { userId } = useParams();
//   const [formData, setFormData] = useState({});
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/teachers/${userId}`);
//         const data = await response.json();
//         setUser(data);
//         setFormData(data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCancel = () => {
//     navigate(`/profile/${userId}`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:4000/teachers/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         navigate(`/profile/${userId}`);
//       } else {
//         console.error('Error updating user data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className='pages-body'>
//       <div className='table-wrapper-div'>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="nationalId" value={formData.nationalId || ''} onChange={handleChange} />
//           <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
//           <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
//           <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} />
//           <input type="text" name="tscNo" value={formData.tscNo || ''} onChange={handleChange} />
//           <select name="gender" value={formData.gender || ''} onChange={handleChange}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <input type="date" name="doj" value={formData.doj || ''} onChange={handleChange} />
//           <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} />
//           <textarea name="address" value={formData.address || ''} onChange={handleChange}></textarea>
//           <input type="url" name="photo" value={formData.photo || ''} onChange={handleChange} />
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleCancel}>Cancel</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TeacherProfileEdit;








// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const TeacherProfileEdit = () => {
//   const { userId } = useParams();
//   const [formData, setFormData] = useState({});
//   const [user, setUser] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/teachers/${userId}`);
//         const data = await response.json();
//         setUser(data);
//         setFormData(data);
//         setPhotoPreview(data.photo); // Set initial photo preview from user data
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file });
//       setPhotoPreview(URL.createObjectURL(file)); // Update photo preview
//     }
//   };

//   const handleRemovePhoto = () => {
//     setFormData({ ...formData, photo: '' });
//     setPhotoPreview(''); // Reset photo preview
//   };

//   const handleCancel = () => {
//     navigate(`/profile/${userId}`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSubmit = new FormData();

//     // Append form data, including the photo
//     Object.keys(formData).forEach((key) => {
//       formDataToSubmit.append(key, formData[key]);
//     });

//     try {
//       const response = await fetch(`http://localhost:4000/teachers/${userId}`, {
//         method: 'PUT',
//         body: formDataToSubmit,
//       });

//       if (response.ok) {
//         navigate(`/profile/${userId}`);
//       } else {
//         console.error('Error updating user data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className='pages-body'>
//       <div className='table-wrapper-div'>
//         <form onSubmit={handleSubmit}>
//           <div className='form-flex-div'>
//             <div className='form-photo-wrapper'>
//               <label>Photo</label>
//               <div className='photo-div'>
//                 {photoPreview ? (
//                   <img src={photoPreview} alt="Photo Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
//                 ) : (
//                   <p>No photo uploaded</p>
//                 )}
//               </div>
//               <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} id="upload-photo-input" />
//               <div className='photo-buttons'>
//                 <button type="button" onClick={() => document.getElementById('upload-photo-input').click()}>Upload Photo</button>
//                 <button type="button" onClick={handleRemovePhoto} disabled={!formData.photo}>Remove Photo</button>
//               </div>
//             </div>

//             <div className='middle-diiiiiv'>
//               <div>
//                 <label>National ID</label>
//                 <input
//                   type="text"
//                   name="nationalId"
//                   value={formData.nationalId || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Address</label>
//                 <textarea
//                   name="address"
//                   value={formData.address || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className='last-diiiiiv'>
//               <div>
//                 <label>TSC No</label>
//                 <input
//                   type="text"
//                   name="tscNo"
//                   value={formData.tscNo || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender || ''}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Date of Joining (DOJ)</label>
//                 <input
//                   type="date"
//                   name="doj"
//                   value={formData.doj || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Date of Birth (DOB)</label>
//                 <input
//                   type="date"
//                   name="dob"
//                   value={formData.dob || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className='submit-foooorm'>
//             <button type="submit">Save</button>
//             <button type="button" onClick={handleCancel}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TeacherProfileEdit;












// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditTeacher = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: '',
//     nationalId: '',
//     email: '',
//     phone: '',
//     tscNo: '',
//     gender: '',
//     doj: '',
//     dob: '',
//     address: '',
//     photo: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/teachers/${userId}`);
//         const data = await response.json();
//         setUser(data);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching user data');
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:4000/teachers/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });
//       if (response.ok) {
//         navigate(`/profile/${userId}`);
//       } else {
//         setError('Failed to update teacher details.');
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//       setError('Error updating teacher details.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className='edit-teacher-container'>
//       <h2>Edit Teacher Details</h2>
//       <form onSubmit={handleFormSubmit} className="edit-teacher-form">
//         <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>National ID:</label>
//           <input
//             type="text"
//             name="nationalId"
//             value={user.nationalId}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Phone:</label>
//           <input
//             type="tel"
//             name="phone"
//             value={user.phone}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>TSC No:</label>
//           <input
//             type="text"
//             name="tscNo"
//             value={user.tscNo}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Gender:</label>
//           <select
//             name="gender"
//             value={user.gender}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Date of Joining:</label>
//           <input
//             type="date"
//             name="doj"
//             value={user.doj}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             name="dob"
//             value={user.dob}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={user.address}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Photo URL:</label>
//           <input
//             type="text"
//             name="photo"
//             value={user.photo}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit" className="save-button">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditTeacher;








import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTeacher = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: '',
    nationalId: '',
    email: '',
    phone: '',
    tscNo: '',
    gender: '',
    doj: '',
    dob: '',
    address: '',
    photo: '', // This will be a URL or file name initially from the server
  });

  const [photoFile, setPhotoFile] = useState(null); // New state to hold the selected file
  const [photoPreview, setPhotoPreview] = useState(''); // To hold the preview of the selected photo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/teachers/${userId}`);
        const data = await response.json();
        setUser(data);
        setPhotoPreview(data.photo); // Set initial photo from server
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file); // Store the file for submission
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(''); // Clear the preview
    setUser((prevUser) => ({
      ...prevUser,
      photo: '', // Clear photo in user state
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); // Use FormData to handle file upload

    // Append all the fields to formData
    formData.append('name', user.name);
    formData.append('nationalId', user.nationalId);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('tscNo', user.tscNo);
    formData.append('gender', user.gender);
    formData.append('doj', user.doj);
    formData.append('dob', user.dob);
    formData.append('address', user.address);

    if (photoFile) {
      formData.append('photo', photoFile); // Only append if a new photo was uploaded
    }

    try {
      const response = await fetch(`http://localhost:4000/teachers/${userId}`, {
        method: 'PUT',
        body: formData, // Send the FormData with the request
      });
      
      if (response.ok) {
        navigate(`/teacher/${userId}`); // Navigate back to details page on success
      } else {
        setError('Failed to update teacher details.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating teacher details.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='edit-teacher-container'>
      <h2>Edit Teacher Details</h2>
      <form onSubmit={handleFormSubmit} className="edit-teacher-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>National ID:</label>
          <input
            type="text"
            name="nationalId"
            value={user.nationalId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>TSC No:</label>
          <input
            type="text"
            name="tscNo"
            value={user.tscNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="doj"
            value={user.doj}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Photo upload and preview */}
        <div className='form-photo-wrapper'>
          <label>Photo</label>
          <div className='phoooto-div'>
            {photoPreview ? (
              <img src={photoPreview} alt="Photo Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            ) : (
              <p>No photo selected</p>
            )}
          </div>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
            id="upload-photo-input"
          />
          <div className='phoooto-btns'>
            <button
              type="button"
              onClick={() => document.getElementById('upload-photo-input').click()}
            >
              Upload Photo
            </button>
            <button
              type="button"
              onClick={handleRemovePhoto}
              disabled={!photoPreview} // Disable the remove button if no photo is uploaded
            >
              Remove Photo
            </button>
          </div>
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTeacher;
