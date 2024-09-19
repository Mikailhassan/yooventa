import React, { useState } from 'react'
import { FaGraduationCap } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";


function Sidebar() {

  const [isExpanded, setIsExpanded] = useState(null);

  const handleToggle = (tab) => {
    setIsExpanded(prevTab => (prevTab === tab ? null : tab));
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
            <div className='expandable-tabs-hidden'>
              <p >All Teachers</p>
              <p >Add Teacher</p>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab4')}>
          <div className='expandable-tabs-visible'>
            <p>Students</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab4" && (
            <div className='expandable-tabs-hidden'>
              <p >All Students</p>
              <p >Student Admission</p>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab5')}>
          <div className='expandable-tabs-visible'>
            <p>Parents</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab5" && (
            <div className='expandable-tabs-hidden'>
              <p >All Parents</p>
              <p >Add Parent</p>
            </div>
          )}
        </div>

        <div className='expandable-tabs' onClick={() => handleToggle('tab6')}>
          <div className='expandable-tabs-visible'>
            <p>Attendance</p>
            <p><FaAngleRight /></p>
          </div>
          {isExpanded === "tab6" && (
            <div className='expandable-tabs-hidden'>
              <p >Mark Attendance</p>
              <p >See Attendance</p>
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