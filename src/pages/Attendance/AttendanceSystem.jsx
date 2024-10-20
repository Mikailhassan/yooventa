import React, { useState, useEffect } from 'react';
import ClassStreamSelector from './ClassStreamSelector';
import StudentList from './StudentList';
import TeacherList from './TeacherList';
import { Link } from 'react-router-dom';

const AttendanceSystem = () => {
  const [school, setSchool] = useState(null);
  const [attendanceType, setAttendanceType] = useState('students');
  const [markingMethod, setMarkingMethod] = useState('manual');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionAvailable, setSessionAvailable] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/schools/580e')
      .then(response => response.json())
      .then(data => setSchool(data))
      .catch(error => console.error('Error fetching school data:', error));
  }, []);

  useEffect(() => {
    setSelectedClass('');
    setSelectedStream('');
    setAttendanceList([]);
  }, [attendanceType]);

  useEffect(() => {
    if (school && selectedDate) {
      const isOpen = isSchoolOpen(selectedDate);
      const hasSession = checkSessionAvailability(selectedDate);
      setSessionAvailable(isOpen && hasSession);
    }
  }, [school, selectedDate]);

  const handleMarkAttendance = async (id, status) => {
    if (!sessionAvailable) {
      alert("No session available on the selected date. Attendance cannot be marked.");
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const attendanceRecord = {
      id,
      status,
      timeIn: timeString,
      method: markingMethod,
      date: selectedDate,
      type: attendanceType
    };

    try {
      const response = await fetch('http://localhost:4000/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update attendance');
      }

      setAttendanceList(prev => {
        const index = prev.findIndex(item => item.id === id);
        if (index !== -1) {
          return [
            ...prev.slice(0, index),
            attendanceRecord,
            ...prev.slice(index + 1)
          ];
        }
        return [...prev, attendanceRecord];
      });
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const isSchoolOpen = (date) => {
    if (!school || !school.schedule) return false;

    const checkDate = new Date(date);
    const dayOfWeek = checkDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (!school.schedule.weekdays.includes(dayOfWeek) && !school.schedule.weekends.includes(dayOfWeek)) {
      return false;
    }

    const isHoliday = school.schedule.holidays.some(holiday => {
      const start = new Date(holiday.startDate);
      const end = new Date(holiday.endDate);
      return checkDate >= start && checkDate <= end;
    });

    return !isHoliday;
  };

  const checkSessionAvailability = (date) => {
    if (!school || !school.schedule) return false;

    const checkDate = new Date(date);
    const dayOfWeek = checkDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    const dailySessions = school.schedule.dailySessions[dayOfWeek];
    return dailySessions && dailySessions.length > 0;
  };

  if (!school) {
    return <div className="as-loading">Loading...</div>;
  }

  return (
    <div className="as-container">
      <h1 className="as-title">Attendance Management System</h1>
      
      <div className="as-controls">
        <select
          className="as-select"
          value={attendanceType}
          onChange={(e) => setAttendanceType(e.target.value)}
        >
          <option value="students">Students</option>
          <option value="teachers">Teachers</option>
        </select>
        
        <select
          className="as-select"
          value={markingMethod}
          onChange={(e) => setMarkingMethod(e.target.value)}
        >
          <option value="manual">Manual</option>
          <option value="fingerprint">Fingerprint</option>
        </select>

        <input
          className="as-date-input"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      
      {sessionAvailable ? (
        <div className="as-attendance-marker">
          {attendanceType === 'students' && (
            <ClassStreamSelector
              school={school}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedStream={selectedStream}
              setSelectedStream={setSelectedStream}
            />
          )}
          
          {attendanceType === 'students' && selectedClass && selectedStream && (
            <StudentList
              students={school.students.filter(s => s.class === selectedClass && s.stream === selectedStream)}
              handleMarkAttendance={handleMarkAttendance}
            />
          )}
          
          {attendanceType === 'teachers' && (
            <TeacherList
              teachers={school.teachers}
              handleMarkAttendance={handleMarkAttendance}
            />
          )}
        </div>
      ) : (
        <div className="as-no-session-message">
          {isSchoolOpen(selectedDate) 
            ? "No session available on the selected date. Attendance cannot be marked." 
            : "The school is closed on the selected date. Attendance cannot be marked."}
        </div>
      )}
    </div>
  );
};

export default AttendanceSystem;