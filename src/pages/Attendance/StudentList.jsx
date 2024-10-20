import React from 'react';

const StudentList = ({ students, handleMarkAttendance }) => {
  return (
    <ul className="as-list">
      {students.map(student => (
        <li key={student.id} className="as-list-item">
          <span className="as-student-name">{student.name}</span>
          <div className="as-attendance-buttons">
            <button 
              className="as-button as-button-present"
              onClick={() => handleMarkAttendance(student.id, 'present')}
            >
              Present
            </button>
            <button 
              className="as-button as-button-absent"
              onClick={() => handleMarkAttendance(student.id, 'absent')}
            >
              Absent
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;