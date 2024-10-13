import React, { useState } from 'react'
import { FaGraduationCap } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';


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
        <div id='logo-div'>
          <FaGraduationCap id='logo-icon'/>
          <h1>YOVENTA</h1>
        </div>

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
              <NavLink to="/add-teacher">Add Teacher</NavLink>
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
              <NavLink to="/add-student">Student Admission</NavLink>
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
              <NavLink >Add Parent</NavLink>
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
              <NavLink >Mark Attendance</NavLink>
              <NavLink >See Attendance</NavLink>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab2')}>
          <div className='expandable-tabs-visible'>
            <p>School</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar