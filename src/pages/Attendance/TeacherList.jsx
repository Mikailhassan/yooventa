import React from 'react';

const TeacherList = ({ teachers, handleMarkAttendance }) => {
  return (
    <ul className="attendance-list">
      {teachers.map(teacher => (
        <li key={teacher.id} className="attendance-item">
          <span>{teacher.name}</span>
          <button 
            className="mark-present"
            onClick={() => handleMarkAttendance(teacher.id, 'present')}
          >
            Present
          </button>
          <button 
            className="mark-absent"
            onClick={() => handleMarkAttendance(teacher.id, 'absent')}
          >
            Absent
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TeacherList;