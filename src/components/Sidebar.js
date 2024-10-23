import React, { useState } from 'react'
import { FaGraduationCap } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom';


function Sidebar() {

  const [isExpanded, setIsExpanded] = useState(null);

  const handleToggle = (tab) => {
    setIsExpanded(prevTab => (prevTab === tab ? null : tab));
  };

  const handleSubtabClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className='sidebar'>
        <Link id='logo-div' to="/">
          <FaGraduationCap id='logo-icon'/>
          <h1>YOVENTA</h1>
        </Link>

      <div id='sidebar-tabs'>

        <div className='expandable-tabs' onClick={() => handleToggle('tab1')}>
          <div className='expandable-tabs-visible'>
            <p>Dashborad</p>
          </div>
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab3')}>
          <div className='expandable-tabs-visible'>
            <p>Teachers</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab3" && (
            <div onClick={handleSubtabClick} className='expandable-tabs-hidden'>
              <NavLink to="/all-teachers" >All Teachers</NavLink>
              <NavLink to="/regsiter-teacher">Add Teacher</NavLink>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab4')}>
          <div className='expandable-tabs-visible'>
            <p>Students</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab4" && (
            <div onClick={handleSubtabClick} className='expandable-tabs-hidden'>
              <NavLink to="/all-students" >All Students</NavLink>
              <NavLink to="/register-student">Add Student</NavLink>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab5')}>
          <div className='expandable-tabs-visible'>
            <p>Parents</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab5" && (
            <div onClick={handleSubtabClick} className='expandable-tabs-hidden'>
              <NavLink to="/all-parents" >All Parents</NavLink>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab6')}>
          <div className='expandable-tabs-visible'>
            <p>Attendance</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab6" && (
            <div onClick={handleSubtabClick} className='expandable-tabs-hidden'>
              <NavLink to="/mark-attendance">Mark Attendance</NavLink>
              <NavLink to="/schedule">Manage Schedule</NavLink>
              <NavLink to="/attendance-report">See Attendance</NavLink>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab7')}>
          <div className='expandable-tabs-visible'>
            <p>Messaging</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab7" && (
            <div onClick={handleSubtabClick} className='expandable-tabs-hidden'>
              <NavLink >SMS</NavLink>
              <NavLink >Email</NavLink>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab8')}>
          <div className='expandable-tabs-visible'>
            <p>School</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab8" && (
            <div onClick={handleSubtabClick} className='expandable-tabs-hidden'>
              <NavLink to="/school-profile">Profile</NavLink>
              <NavLink to="/register-school">Register School</NavLink>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar