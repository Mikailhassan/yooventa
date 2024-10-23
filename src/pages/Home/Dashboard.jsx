import React, { useState, useEffect } from 'react';
import { 
  Users, School, UserCheck, Calendar,
  GraduationCap, UserX, Clock, AlertTriangle 
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';
import './home.css'

const Dashboard = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
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

    fetchSchoolData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!schoolData) {
    return <div className="error">No school data available</div>;
  }

  // Calculate attendance statistics
  const calculateAttendance = (records, total) => {
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    
    return [
        { name: 'Present', value: Number(((present / total) * 100).toFixed(2)) },
        { name: 'Absent', value: Number(((absent / total) * 100).toFixed(2)) },
        { name: 'Late', value: Number(((late / total) * 100).toFixed(2)) }
    ];
  };

  const studentAttendanceData = calculateAttendance(
    schoolData.attendances.students.flatMap(day => day.records),
    schoolData.students.length * schoolData.attendances.students.length
  );

  const teacherAttendanceData = calculateAttendance(
    schoolData.attendances.teachers.flatMap(day => day.records),
    schoolData.teachers.length * schoolData.attendances.teachers.length
  );

  const COLORS = ['#4CAF50', '#f44336', '#FFC107'];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">
            {schoolData.schoolInfo.name} - Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">
            {schoolData.schoolInfo.address}, {schoolData.schoolInfo.county}
          </p>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <Users size={40} className="stat-icon" />
              <div className="stat-info">
                <p className="stat-label">Total Students</p>
                <h3 className="stat-value">{schoolData.students.length}</h3>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <GraduationCap size={40} className="stat-icon" />
              <div className="stat-info">
                <p className="stat-label">Total Teachers</p>
                <h3 className="stat-value">{schoolData.teachers.length}</h3>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <UserCheck size={40} className="stat-icon" />
              <div className="stat-info">
                <p className="stat-label">Today's Attendance</p>
                <h3 className="stat-value">
                  {Math.round((studentAttendanceData[0].value + studentAttendanceData[2].value))}%
                </h3>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <AlertTriangle size={40} className="stat-icon" />
              <div className="stat-info">
                <p className="stat-label">Absent Rate</p>
                <h3 className="stat-value">
                  {Math.round(studentAttendanceData[1].value)}%
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Student Attendance Overview</h2>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentAttendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {studentAttendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Teacher Attendance Overview</h2>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={teacherAttendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {teacherAttendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="trend-chart">
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Recent Attendance Trends</h2>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { name: 'Oct 15', present: 33.33, absent: 33.33, late: 33.33 },
                    { name: 'Dec 15', present: 66.67, absent: 33.33, late: 0 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="present" stroke="#4CAF50" />
                  <Line type="monotone" dataKey="absent" stroke="#f44336" />
                  <Line type="monotone" dataKey="late" stroke="#FFC107" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;