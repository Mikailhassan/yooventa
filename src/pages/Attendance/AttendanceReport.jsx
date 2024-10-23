import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';
import './attendance.css';

const AttendanceReport = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-12-31'
  });
  const [selectedEntity, setSelectedEntity] = useState('students');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        if (!response.ok) {
          throw new Error('Failed to fetch school data');
        }
        const data = await response.json();
        setSchoolData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allAttendances = useMemo(() => {
    if (!schoolData) return [];
    return schoolData.attendances?.[selectedEntity] || [];
  }, [schoolData, selectedEntity]);

  const stats = useMemo(() => {
    const records = allAttendances.filter(record => 
      record.date >= dateRange.start && record.date <= dateRange.end
    );

    const statsByPerson = {};

    records.forEach(dayRecord => {
      dayRecord.records.forEach(record => {
        const id = record.studentId || record.teacherId;
        if (!statsByPerson[id]) {
          statsByPerson[id] = { present: 0, absent: 0, late: 0, total: 0 };
        }
        statsByPerson[id][record.status]++;
        statsByPerson[id].total++;
      });
    });

    return statsByPerson;
  }, [allAttendances, dateRange]);

  const getPerson = (id) => {
    if (!schoolData) return {};
    const list = selectedEntity === 'students' 
      ? schoolData.students 
      : schoolData.teachers;
    return list.find(p => p.id === id) || {};
  };

  const calculatePercentage = (value, total) => {
    return total ? ((value / total) * 100).toFixed(1) : 0;
  };

  const chartData = Object.entries(stats).map(([id, data]) => ({
    name: getPerson(parseInt(id)).name,
    present: calculatePercentage(data.present, data.total),
    absent: calculatePercentage(data.absent, data.total),
    late: calculatePercentage(data.late, data.total)
  }));

  const exportToCsv = () => {
    const headers = ['Name', 'Present %', 'Absent %', 'Late %'];
    const csvData = chartData.map(row => 
      [row.name, row.present, row.absent, row.late].join(',')
    );
    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${dateRange.start}_${dateRange.end}.csv`;
    a.click();
  };

  if (loading) {
    return <div className="loading">Loading attendance data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="attendance-report">
      <div className="header">
        <h1>Attendance Report</h1>
        <div className="entity-toggle">
          <button
            onClick={() => setSelectedEntity('students')}
            className={selectedEntity === 'students' ? 'active' : ''}
          >
            Students
          </button>
          <button
            onClick={() => setSelectedEntity('teachers')}
            className={selectedEntity === 'teachers' ? 'active' : ''}
          >
            Teachers
          </button>
        </div>
      </div>

      <div className="controls">
        <div className="date-range">
          <Calendar className="icon" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <span>to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
        <button className="export-btn" onClick={exportToCsv}>
          <Download className="icon" />
          Export CSV
        </button>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h2>Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#4CAF50" name="Present %" />
              <Line type="monotone" dataKey="absent" stroke="#f44336" name="Absent %" />
              <Line type="monotone" dataKey="late" stroke="#FFC107" name="Late %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="stats-container">
          <h2>Individual Statistics</h2>
          <div className="stats-list">
            {Object.entries(stats).map(([id, data]) => {
              const person = getPerson(parseInt(id));
              const total = data.total;
              return (
                <div key={id} className="stat-card">
                  <h3>{person.name}</h3>
                  <div className="stat-grid">
                    <div className="present">
                      Present: {calculatePercentage(data.present, total)}%
                    </div>
                    <div className="absent">
                      Absent: {calculatePercentage(data.absent, total)}%
                    </div>
                    <div className="late">
                      Late: {calculatePercentage(data.late, total)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="detailed-report">
        <h2>Detailed Report</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Days</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Late</th>
              <th>Attendance Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats).map(([id, data]) => {
              const person = getPerson(parseInt(id));
              return (
                <tr key={id}>
                  <td>{person.name}</td>
                  <td>{data.total}</td>
                  <td className="present">{data.present}</td>
                  <td className="absent">{data.absent}</td>
                  <td className="late">{data.late}</td>
                  <td>
                    {calculatePercentage(data.present + data.late, data.total)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReport;