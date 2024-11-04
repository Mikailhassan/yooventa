import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, MapPin, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './school.css'


const SchoolProfile = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`https://server-roan-three-33.vercel.app/schools`);
        if (!response.ok) {
          throw new Error('Failed to fetch school data');
        }
        const data = await response.json();
        setSchoolData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, []);

  if (loading) {
    return <div className="loading">Loading school profile...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!schoolData) {
    return null;
  }

  return (
    <>
      <div className="profile-container">
        <div className="school-profile-header">
          <h1 className="school-name">{schoolData.schoolInfo.name}</h1>
          <button className="edit-button" onClick={() => navigate(`/edit-school-profile/580e`)}>
            Edit Profile
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid-container">
          {/* School Information Card */}
          <div className="schoo-profile-card">
            <div className="schoo-profile-card-header">
              <h2 className="schoo-profile-card-title">
                <Building2 size={24} />
                School Information
              </h2>
            </div>
            <div className="schoo-profile-card-content">
              <div className="info-item">
                <Mail size={20} />
                <span>{schoolData.schoolInfo.email}</span>
              </div>
              <div className="info-item">
                <Phone size={20} />
                <span>{schoolData.schoolInfo.phone}</span>
              </div>
              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <div>{schoolData.schoolInfo.address}</div>
                  <div>{schoolData.schoolInfo.county}, {schoolData.schoolInfo.postalCode}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Classes Card */}
          <div className="schoo-profile-card">
            <div className="schoo-profile-card-header">
              <h2 className="schoo-profile-card-title">
                <BookOpen size={24} />
                Classes and Streams
              </h2>
            </div>
            <div className="schoo-profile-card-content">
              <div className="classes-grid">
                {schoolData.classes.map((classItem, index) => (
                  <div key={index} className="class-card">
                    <h3 className="class-name">{classItem.name}</h3>
                    <div className="profile-streams-container">
                      {classItem.streams.map((stream, streamIndex) => (
                        <span key={streamIndex} className="stream-badge">
                          Stream {stream}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolProfile;