import React, { useState } from 'react';

// This function would use the fingerprint scanner SDK to capture the fingerprint.
// Replace this with the actual SDK's function.
const captureFingerprint = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockFingerprintData = "base64_encoded_fingerprint_data"; // Replace this with actual fingerprint data
      resolve(mockFingerprintData);
    }, 2000);
  });
};

const AddTeacherForm = () => {
  const [teacherData, setTeacherData] = useState({
    nationalId: '',
    name: '',
    email: '',
    phone: '',
    tscNo: '',
    gender: '',
    doj: '',
    dob: '',
    address: '',
    photo: '',
    fingerprint: '',
  });

  const [fingerprintCaptured, setFingerprintCaptured] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('https://static.vecteezy.com/system/resources/previews/003/337/584/non_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg')

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      if (file) {
        setTeacherData({ ...teacherData, [name]: file });
        setPhotoPreview(URL.createObjectURL(file));
      }
    } else {
      setTeacherData({ ...teacherData, [name]: value });
    }
  };

  // Handle fingerprint capture
  const handleFingerprintCapture = async () => {
    try {
      const capturedFingerprint = await captureFingerprint();
      setTeacherData({ ...teacherData, fingerprint: capturedFingerprint });
      setFingerprintCaptured(true);
    } catch (error) {
      console.error("Error capturing fingerprint: ", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teacherData.fingerprint) {
      alert("Please capture fingerprint before submitting");
      return;
    }
    console.log('User Data Submitted:', teacherData);
    // Submit teacherData to the backend, including the fingerprint
    // You can use fetch, axios, or any other library to send the data to your API
  };

  // Handle photo removal
  const handleRemovePhoto = () => {
    setTeacherData({ ...teacherData, photo: '' });
    setPhotoPreview('https://static.vecteezy.com/system/resources/previews/003/337/584/non_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg'); // Reset to the placeholder image
  };

  return (
    <div className='pages-body'>
      <div className='table-wrapper-div'>
        <form onSubmit={handleSubmit}>

          <div className='form-flex-div'>
            <div className='form-photo-wrapper'>
              <label>Photo</label>
              <div className='phoooto-div'>
                <img src={photoPreview} alt="Photo Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
              </div>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} style={{ display: 'none' }} id="upload-photo-input" />
              <div className='phoooto-btns'>
                <button type="button" onClick={() => document.getElementById('upload-photo-input').click()}>Upload Photo</button>
                <button type="button" onClick={handleRemovePhoto} disabled={!teacherData.photo} >Remove Photo</button>
              </div>
            </div>

            <div className='middle-diiiiiv'>
              <div>
                <label>National ID</label>
                <input type="number" name="nationalId" value={teacherData.nationalId} onChange={handleChange} />
              </div>
              <div>
                <label>Full Name</label>
                <input type="text" name="name" value={teacherData.name} onChange={handleChange} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={teacherData.email} onChange={handleChange} />
              </div>
              <div>
                <label>Phone Number</label>
                <input type="tel" name="phone" value={teacherData.phone} onChange={handleChange} />
              </div>
              <div>
                <label>Address</label>
                <textarea name="address" value={teacherData.address} onChange={handleChange}></textarea>
              </div>
            </div>

            <div className='last-diiiiiv'>
              <div>
                <label>TSC No</label>
                <input type="number" name="tscNo" value={teacherData.tscNo} onChange={handleChange} />
              </div>
              <div>
                <label>Gender</label>
                <select name="gender" value={teacherData.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label>Date of Joining (DOJ)</label>
                <input type="date" name="doj" value={teacherData.doj} onChange={handleChange} />
              </div>
              <div>
                <label>Date of Birth (DOB)</label>
                <input type="date" name="dob" value={teacherData.dob} onChange={handleChange} />
              </div>
              <div>
                <label>Fingerprint</label>
                <button type="button" onClick={handleFingerprintCapture}>
                  Capture Fingerprint
                </button>
                {fingerprintCaptured ? <p>Fingerprint Captured</p> : <p>No Fingerprint Captured</p>}
              </div>
            </div>
          </div>

          <div className='submit-foooorm'>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherForm;
