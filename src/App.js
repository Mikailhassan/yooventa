import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllTeachers from './pages/Teachers/AllTeachers';

const App = () => {
  return (
    <div className='app-component'>
      <Sidebar />
      <div className="content">
        <Navbar />
        <AllTeachers />
        <Routes>
        </Routes>
        <Footer/>
      </div>
    </div>
  );
};

export default App;
