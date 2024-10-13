import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentRegistrationForm from './pages/Students/StudentRegistration';
import StudentProfile from './pages/Students/StudentProfile';
import TeacherRegistrationForm from './pages/Teachers/TeacherRegistrationForm';
import TeacherProfile from './pages/Teachers/TeacherProfile';
import TeacherList from './pages/Teachers/TeacherList';
import StudentList from './pages/Students/StudentList';
import SchoolRegistration from './pages/School/SchoolRegistration';
import SchoolProfileDisplay from './pages/School/SchoolProfileDisplay';
import EditSchoolInformation from './pages/School/SchoolProfileEdit';
import SchoolProfileEdit from './pages/School/SchoolProfileEdit';



const App = () => {
  return (
    <div className='app-component'>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className='pages-body'>
          <div className='pages-wrapper-div'>
            {/* <SchoolRegistration/> */}
            {/* <SchoolProfileDisplay/> */}
            {/* <SchoolProfileEdit/> */}


            {/* <StudentRegistrationForm/> */}
            {/* <StudentProfile/> */}
            {/* <StudentList/> */}


            {/* <TeacherRegistrationForm/> */}
            {/* <TeacherProfile/> */}
            {/* <TeacherList/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
