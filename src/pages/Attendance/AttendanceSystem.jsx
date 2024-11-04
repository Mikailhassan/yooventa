import React, { useState, useEffect } from 'react';
import ClassStreamSelector from './ClassStreamSelector';
import AttendanceList from './AttendanceList';
import { isDateAvailable, formatDate } from './utils';

const AttendanceSystem = () => {
  const [school, setSchool] = useState(null);
  const [attendanceType, setAttendanceType] = useState('students');
  const [markingMethod, setMarkingMethod] = useState('manual');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [dateAvailable, setDateAvailable] = useState(false);

  useEffect(() => {
    fetchSchoolData();
  }, []);

  useEffect(() => {
    if (school) {
      const available = isDateAvailable(school, selectedDate);
      setDateAvailable(available);
      if (!available) {
        setAttendanceList([]);
      }
    }
  }, [school, selectedDate]);

  const fetchSchoolData = async () => {
    try {
      const response = await fetch('https://server-roan-three-33.vercel.app/schools');
      const data = await response.json();
      setSchool(data);
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    if (school && !isDateAvailable(school, newDate)) {
      setAttendanceList([]);
    }
  };

  const handleMarkAttendance = (id, status) => {
    if (!dateAvailable) {
      return;
    }
    setAttendanceList(prev => {
      const existingIndex = prev.findIndex(item => item.id === id);
      if (existingIndex !== -1) {
        return [
          ...prev.slice(0, existingIndex),
          { ...prev[existingIndex], status },
          ...prev.slice(existingIndex + 1)
        ];
      }
      return [...prev, { id, status }];
    });
  };

  const handleSelectAll = (status) => {
    if (!dateAvailable) {
      return;
    }
    const allIds = attendanceType === 'students'
      ? school.students.filter(s => s.class === selectedClass && s.stream === selectedStream).map(s => s.id)
      : school.teachers.map(t => t.id);
    
    setAttendanceList(allIds.map(id => ({ id, status })));
  };

  const handleSubmitAttendance = async () => {
    if (!dateAvailable) {
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const updatedSchool = { ...school };
    const attendanceKey = attendanceType === 'students' ? 'students' : 'teachers';

    const dateIndex = updatedSchool.attendances[attendanceKey].findIndex(a => a.date === selectedDate);
    if (dateIndex === -1) {
      updatedSchool.attendances[attendanceKey].push({
        date: selectedDate,
        records: []
      });
    }

    attendanceList.forEach(({ id, status }) => {
      const record = {
        [`${attendanceType === 'students' ? 'student' : 'teacher'}Id`]: id,
        status,
        time: timeString,
        method: markingMethod
      };

      const dateIndex = updatedSchool.attendances[attendanceKey].findIndex(a => a.date === selectedDate);
      const recordIndex = updatedSchool.attendances[attendanceKey][dateIndex].records.findIndex(r => r[`${attendanceType === 'students' ? 'student' : 'teacher'}Id`] === id);

      if (recordIndex === -1) {
        updatedSchool.attendances[attendanceKey][dateIndex].records.push(record);
      } else {
        updatedSchool.attendances[attendanceKey][dateIndex].records[recordIndex] = record;
      }
    });

    try {
      const response = await fetch('http://localhost:4000/schools/580e', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSchool),
      });

      if (!response.ok) {
        throw new Error('Failed to update attendance');
      }

      setAttendanceList([]);
      fetchSchoolData(); // Refresh school data
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (!school) {
    return <div className="as-loading">Loading...</div>;
  }

  const attendees = attendanceType === 'students'
    ? school.students.filter(s => s.class === selectedClass && s.stream === selectedStream)
    : school.teachers;

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
          onChange={handleDateChange}
        />
      </div>
      
      {dateAvailable ? (
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
          
          <div className="as-select-all-buttons">
            <button onClick={() => handleSelectAll('present')}>Mark All Present</button>
            <button onClick={() => handleSelectAll('absent')}>Mark All Absent</button>
            <button onClick={() => handleSelectAll('late')}>Mark All Late</button>
          </div>
          
          <AttendanceList
            attendees={attendees}
            handleMarkAttendance={handleMarkAttendance}
            attendanceList={attendanceList}
            attendeeType={attendanceType === 'students' ? 'student' : 'teacher'}
          />
          
          <button className="as-submit-button" onClick={handleSubmitAttendance}>Submit Attendance</button>
        </div>
      ) : (
        <div className="as-no-session-message">
          Attendance cannot be marked for the selected date as it's a holiday or non-working day.
        </div>
      )}
    </div>
  );
};

export default AttendanceSystem;