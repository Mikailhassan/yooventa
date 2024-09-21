import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllTeachers from './pages/Teachers/AllTeachers';
import AddTeacherForm from './pages/Teachers/AddTeacherForm';
import TeacherDetails from './pages/Teachers/TeacherDetails';

const App = () => {
  return (
    <div className='app-component'>
      <Sidebar />
      <div className="content">
        <Navbar />
        {/* <AllTeachers /> */}
        {/* <AddTeacherForm /> */}
        <TeacherDetails/>
        <Routes>
        </Routes>
        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default App;
