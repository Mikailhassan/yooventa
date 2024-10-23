import React from 'react';
import './attendance.css';


const AttendanceList = ({ attendees, handleMarkAttendance, attendanceList, attendeeType }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return '✅';
      case 'absent':
        return '❌';
      case 'late':
        return '⏰';
      default:
        return null;
    }
  };

  return (
    <div className="attendance-list">
      <h2 className="attendance-list__title">{attendeeType} Attendance</h2>
      <ul className="attendance-list__items">
        {attendees.map(attendee => {
          const attendance = attendanceList.find(a => a.id === attendee.id);
          return (
            <li key={attendee.id} className="attendance-list__item">
              <span className="attendance-list__name">{attendee.name}</span>
              <div className="attendance-list__actions">
                {['present', 'absent', 'late'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleMarkAttendance(attendee.id, status)}
                    className={`attendance-list__button ${
                      attendance?.status === status ? 'attendance-list__button--active' : ''
                    }`}
                    aria-label={`Mark ${status}`}
                  >
                    {getStatusIcon(status)}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AttendanceList;