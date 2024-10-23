import React, { useState, useEffect } from 'react';

const ScheduleManager = () => {
  const [school, setSchool] = useState(null);
  const [weekdays, setWeekdays] = useState([]);
  const [weekends, setWeekends] = useState([]);
  const [dailySessions, setDailySessions] = useState({});
  const [holidays, setHolidays] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const repeatTypes = ['none', 'weekly', 'monthly', 'yearly'];

  useEffect(() => {
    fetch('http://localhost:4000/schools/580e')
      .then(response => response.json())
      .then(data => {
        setSchool(data);
        setWeekdays(data.schedule.weekdays);
        setWeekends(data.schedule.weekends);
        setDailySessions(data.schedule.dailySessions);
        setHolidays(data.schedule.holidays.map(holiday => ({
          ...holiday,
          repeatType: holiday.repeatType || 'none'
        })));
      })
      .catch(error => console.error('Error fetching school data:', error));
  }, []);

  const handleWeekdayToggle = (day) => {
    if (weekdays.includes(day)) {
      setWeekdays(weekdays.filter(d => d !== day));
      setWeekends([...weekends, day]);
    } else {
      setWeekdays([...weekdays, day]);
      setWeekends(weekends.filter(d => d !== day));
    }
  };

  const handleAddSession = () => {
    setDailySessions({
      ...dailySessions,
      [selectedDay]: [...dailySessions[selectedDay], { name: '', startTime: '', endTime: '' }]
    });
  };

  const handleUpdateSession = (index, field, value) => {
    const updatedSessions = [...dailySessions[selectedDay]];
    updatedSessions[index][field] = value;
    setDailySessions({
      ...dailySessions,
      [selectedDay]: updatedSessions
    });
  };

  const handleRemoveSession = (index) => {
    setDailySessions({
      ...dailySessions,
      [selectedDay]: dailySessions[selectedDay].filter((_, i) => i !== index)
    });
  };

  const handleAddHoliday = () => {
    setHolidays([...holidays, { name: '', startDate: '', endDate: '', repeatType: 'none' }]);
  };

  const handleUpdateHoliday = (index, field, value) => {
    const updatedHolidays = [...holidays];
    updatedHolidays[index][field] = value;
    setHolidays(updatedHolidays);
  };

  const handleRemoveHoliday = (index) => {
    setHolidays(holidays.filter((_, i) => i !== index));
  };

  const handleSaveSchedule = () => {
    const updatedSchedule = {
      weekdays,
      weekends,
      dailySessions,
      holidays
    };

    fetch('http://localhost:4000/schools/580e', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ schedule: updatedSchedule }),
    })
      .then(response => response.json())
      .then(data => console.log('Schedule updated successfully', data))
      .catch(error => console.error('Error updating schedule:', error));
  };

  if (!school) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm-container">
      <h2 className="sm-title">Manage School Schedule</h2>
      
      <div className="sm-section">
        <h3 className="sm-section-title">Set Weekdays and Weekends</h3>
        <div className="sm-weekday-selector">
          {daysOfWeek.map(day => (
            <div key={day} className="sm-weekday-item">
              <label className="sm-weekday-label">{day}</label>
              <input 
                type="checkbox" 
                className="sm-checkbox"
                checked={weekdays.includes(day)} 
                onChange={() => handleWeekdayToggle(day)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sm-section">
        <h3 className="sm-section-title">Manage Sessions</h3>
        <select
          className="sm-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        {dailySessions[selectedDay] && dailySessions[selectedDay].map((session, index) => (
          <div key={index} className="sm-session-item">
            <input
              type="text"
              className="sm-input"
              value={session.name}
              onChange={(e) => handleUpdateSession(index, 'name', e.target.value)}
              placeholder="Session Name"
            />
            <input
              type="time"
              className="sm-input"
              value={session.startTime}
              onChange={(e) => handleUpdateSession(index, 'startTime', e.target.value)}
            />
            <input
              type="time"
              className="sm-input"
              value={session.endTime}
              onChange={(e) => handleUpdateSession(index, 'endTime', e.target.value)}
            />
            <button className="sm-button sm-remove-button" onClick={() => handleRemoveSession(index)}>Remove</button>
          </div>
        ))}
        <button className="sm-button" onClick={handleAddSession}>Add Session</button>
      </div>

      <div className="sm-section">
        <h3 className="sm-section-title">Manage Holidays and Breaks</h3>
        {holidays.map((holiday, index) => (
          <div key={index} className="sm-holiday-item">
            <input
              type="text"
              className="sm-input"
              value={holiday.name}
              onChange={(e) => handleUpdateHoliday(index, 'name', e.target.value)}
              placeholder="Holiday Name"
            />
            <input
              type="date"
              className="sm-input"
              value={holiday.startDate}
              onChange={(e) => handleUpdateHoliday(index, 'startDate', e.target.value)}
            />
            <input
              type="date"
              className="sm-input"
              value={holiday.endDate}
              onChange={(e) => handleUpdateHoliday(index, 'endDate', e.target.value)}
            />
            <select
              className="sm-input"
              value={holiday.repeatType}
              onChange={(e) => handleUpdateHoliday(index, 'repeatType', e.target.value)}
            >
              {repeatTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            <button className="sm-button sm-remove-button" onClick={() => handleRemoveHoliday(index)}>Remove</button>
          </div>
        ))}
        <button className="sm-button" onClick={handleAddHoliday}>Add Holiday</button>
      </div>

      <button className="sm-button sm-save-button" onClick={handleSaveSchedule}>Save Schedule</button>
    </div>
  );
};

export default ScheduleManager;