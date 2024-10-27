import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import SchoolRegistration from './pages/School/SchoolRegistration';
import SchoolProfileDisplay from './pages/School/SchoolProfileDisplay';
import StudentRegistration from './pages/Students/StudentRegistration';
import TeacherProfile from './pages/Teachers/TeacherProfile';
import StudentList from './pages/Students/StudentList';
import TeachersList from './pages/Teachers/TeachersList';
import TeacherRegistration from './pages/Teachers/TeacherRegistrationForm';
import TeacherProfileEdit from './pages/Teachers/TeacherProfileEdit';
import EditParent from './pages/Parents/EditParent';
import SchoolProfileEdit from './pages/School/SchoolProfileEdit';
import ParentList from './pages/Parents/ParentList';
import StudentProfile from './pages/Students/Profile';
import ParentProfile from './pages/Parents/ParentProfile';
import AttendanceSystem from './pages/Attendance/AttendanceSystem';
import ScheduleManager from './pages/Attendance/ScheduleManager';
import AttendanceReport from './pages/Attendance/AttendanceReport';
import Dashboard from './pages/Home/Dashboard';



const App = () => {
  return (
    <div className='app-component'>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className='pages-body'>
          <div className='pages-wrapper-div'>
            <Routes>
              
              <Route path="/school-profile" element={<SchoolProfileDisplay/>}/>
              <Route path="/register-school" element={<SchoolRegistration/>}/>
              <Route path="/edit-school-profile/:id" element={<SchoolProfileEdit/>}/>

              <Route path="/register-student" element={<StudentRegistration />}/>
              <Route path="/student-profile/:studentId" element={<StudentProfile />}/>
              <Route path="/all-students" element={<StudentList />}/>
              <Route path="/edit-student/:studentId" element={<EditParent />}/>


              <Route path="/regsiter-teacher" element={<TeacherRegistration />}/>
              <Route path="/teacher-profile/:teacherId" element={<TeacherProfile />}/>
              <Route path="/all-teachers" element={<TeachersList />}/>
              <Route path="/edit-teacher/:teacherId" element={<TeacherProfileEdit />}/>
              
              <Route path="/all-parents" element={<ParentList />}/>
              <Route path="/parent-profile/:parentId" element={<ParentProfile />}/>
              <Route path="/edit-parent/:parentId" element={<EditParent />}/>

              <Route path="/mark-attendance" element={<AttendanceSystem />}/>
              <Route path="/schedule" element={<ScheduleManager />}/>
              <Route path="/attendance-report" element={<AttendanceReport />}/>

              <Route path="/" element={<Dashboard/>}/>

              <Route path="*" element={<hi>Not Found</hi>}/>
            </Routes>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
