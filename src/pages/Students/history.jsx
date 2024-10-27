import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const StudentAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/schools/580e');
        const data = await response.json();
        
        // Find student
        const foundStudent = data.students.find(s => s.id === parseInt(id));
        setStudent(foundStudent);

        // Get attendance records for this student
        const studentAttendance = data.attendances.students
          .map(day => ({
            date: day.date,
            ...day.records.find(record => record.studentId === parseInt(id))
          }))
          .filter(record => record.status); // Only keep records where we found the student

        setAttendanceData(studentAttendance);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Calculate statistics
  const stats = attendanceData.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = [
    { name: 'Present', value: stats.present || 0, color: '#22c55e' },
    { name: 'Late', value: stats.late || 0, color: '#eab308' },
    { name: 'Absent', value: stats.absent || 0, color: '#ef4444' }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'late': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  if (!student) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Back to Profile
        </Button>
        <h1 className="text-2xl font-bold">{student.name}'s Attendance</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.present || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Days</CardTitle>
            <AlertCircle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.late || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <XCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.absent || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((record) => (
              <div
                key={record.date}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(record.status)}
                  <div>
                    <div className="font-medium">
                      {format(new Date(record.date), 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      Marked at {record.time}
                    </div>
                  </div>