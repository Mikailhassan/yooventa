import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  School,
  BookOpen,
  ChevronLeft
} from 'lucide-react';
import { format } from 'date-fns';
import './prof.css'

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [parent, setParent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        const data = await response.json();
        const foundStudent = data.students.find(s => s.id === parseInt(studentId));
        setStudent(foundStudent);
        
        if (foundStudent?.parentIds?.length > 0) {
          const foundParent = data.parents.find(p => p.id === foundStudent.parentIds[0]);
          setParent(foundParent);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (!student) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="sp-container">
        <div className="sp-header">
          <button className="sp-back-button" onClick={() => navigate(-1)}>
            <ChevronLeft size={16} />
            Back to Students
          </button>
        </div>

        <div className="sp-profile-grid">
          <div className="sp-card">
            <div className="sp-card-header">
              <h2 className="sp-card-title">Student Profile</h2>
            </div>
            <div className="sp-photo-container">
              <div className="sp-profile-photo">
                <img
                  src={student.photo || "/api/placeholder/150/150"}
                  alt={student.name}
                  className="sp-profile-image"
                />
                <span className={`sp-status-indicator ${
                  student.status === 'active' ? 'sp-status-active' : 'sp-status-inactive'
                }`}></span>
              </div>
            </div>
            <div className="sp-student-info">
              <h2 className="sp-student-name">{student.name}</h2>
              <p className="sp-admission-number">Admission No: {student.admNo}</p>
            </div>
          </div>

          {/* Academic Info Card */}
          <div className="sp-card">
            <div className="sp-card-header">
              <h2 className="sp-card-title">Academic Information</h2>
            </div>
            <div className="sp-info-grid">
              <div className="sp-info-item">
                <School className="w-5 h-5" />
                <div>
                  <p className="sp-info-label">Class</p>
                  <p className="sp-info-value">{student.class}</p>
                </div>
              </div>
              <div className="sp-info-item">
                <BookOpen className="w-5 h-5" />
                <div>
                  <p className="sp-info-label">Stream</p>
                  <p className="sp-info-value">{student.stream}</p>
                </div>
              </div>
              <div className="sp-info-item">
                <User className="w-5 h-5" />
                <div>
                  <p className="sp-info-label">Gender</p>
                  <p className="sp-info-value">{student.gender}</p>
                </div>
              </div>
              <div className="sp-info-item">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="sp-info-label">Date of Birth</p>
                  <p className="sp-info-value">{format(new Date(student.dob), 'dd MMM yyyy')}</p>
                </div>
              </div>
              <div className="sp-info-item">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="sp-info-label">Date of Join</p>
                  <p className="sp-info-value">{format(new Date(student.doj), 'dd MMM yyyy')}</p>
                </div>
              </div>
              <div className="sp-info-item">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="sp-info-label">Address</p>
                  <p className="sp-info-value">{student.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          {parent && (
            <div className="sp-card sp-parent-card">
              <div className="sp-card-header">
                <h2 className="sp-card-title">Parent/Guardian Information</h2>
              </div>
              <div className="sp-parent-info">
                <div className="sp-info-item">
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="sp-info-label">Name</p>
                    <p className="sp-info-value">{parent.name}</p>
                  </div>
                </div>
                <div className="sp-info-item">
                  <Phone className="w-5 h-5" />
                  <div>
                    <p className="sp-info-label">Phone</p>
                    <p className="sp-info-value">{parent.phone}</p>
                  </div>
                </div>
                <div className="sp-info-item">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="sp-info-label">Email</p>
                    <p className="sp-info-value">{parent.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Button */}
          <div className="sp-button-container">
            <button 
              className="sp-primary-button"
              // onClick={() => navigate(`/student/${id}/attendance`)}
            >
              View Attendance History
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;