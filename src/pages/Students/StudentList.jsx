// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/schools/580e');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setStudents(data.students);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className='table-container'>
//       <h1>Student List</h1>
//       <table className='table'>
//         <thead>
//           <tr>
//             <th>Photo</th>
//             <th>ADM Number</th>
//             <th>Name</th>
//             <th>Gender</th>
//             <th>Class</th>
//             <th>Stream</th>
//             <th>Date of Join</th>
//             <th>Date of Birth</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.id}>
//               <td><img src={student.photo} alt={"H"} width="24px" /></td>
//               <td>{student.admNo}</td>
//               <td>{student.name}</td>
//               <td>{student.gender}</td>
//               <td>{student.class}</td>
//               <td>{student.stream}</td>
//               <td>{new Date(student.doj).toLocaleDateString()}</td>
//               <td>{new Date(student.dob).toLocaleDateString()}</td>
//               <td>{student.address}</td>
//               <td>
//                 <button className='table-btns'>
//                   <Link to={`/student-profile/${student.id}`}>
//                     View
//                   </Link>
//                 </button>
//                 <button className='table-btns'>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentList;







import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, SortAsc, SortDesc, Download, 
  ChevronLeft, ChevronRight, RefreshCw 
} from 'lucide-react';
import { format } from 'date-fns';
import './student.css'

  const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStream, setSelectedStream] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(20);
  
    // Computed values
    const [uniqueClasses, setUniqueClasses] = useState([]);
    const [uniqueStreams, setUniqueStreams] = useState([]);
  
    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const response = await fetch('http://localhost:4000/schools/580e');
          if (!response.ok) {
            throw new Error('Failed to fetch students data');
          }
          const data = await response.json();
          setStudents(data.students);
          
          // Extract unique classes and streams
          const classes = [...new Set(data.students.map(student => student.class))];
          const streams = [...new Set(data.students.map(student => student.stream))];
          setUniqueClasses(classes);
          setUniqueStreams(streams);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStudents();
    }, []);
  
    // Filter and sort functions
    const filterStudents = () => {
      let filtered = [...students];
  
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(student =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      // Apply class filter
      if (selectedClass) {
        filtered = filtered.filter(student => student.class === selectedClass);
      }
  
      // Apply stream filter
      if (selectedStream) {
        filtered = filtered.filter(student => student.stream === selectedStream);
      }
  
      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;
        if (a[sortField] < b[sortField]) comparison = -1;
        if (a[sortField] > b[sortField]) comparison = 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  
      return filtered;
    };
  
    // Pagination
    const filteredStudents = filterStudents();
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  
    const exportToCSV = () => {
      const headers = ['ID', 'Adm No', 'Name', 'Gender', 'Class', 'Stream', 'Date of Join', 'Date of Birth', 'Address'];
      const csvContent = [
        headers.join(','),
        ...filteredStudents.map(student => 
          [student.id, student.admNo, student.name, student.gender, student.class, student.stream, student.doj, student.dob, student.address].join(',')
        )
      ].join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    };
  
    if (loading) {
      return <div className="loading">Loading students data...</div>;
    }
  
    if (error) {
      return <div className="error">Error: {error}</div>;
    }

  return (
    <div className="students-container">
      <div className="logic-controls">
        <div className="student-list-search-box">
          <Search className="search-icon" size={20} color="#64748b" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-btns">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {uniqueClasses.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
          >
            <option value="">All Streams</option>
            {uniqueStreams.map(stream => (
              <option key={stream} value={stream}>{stream}</option>
            ))}
          </select>

          <button className="export-btn" onClick={exportToCSV}>
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="student-table-container">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th onClick={() => {
                if (sortField === 'admNo') {
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortField('admNo');
                  setSortDirection('asc');
                }
              }}>
                Adm No
                {sortField === 'admNo' && (
                  sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
                )}
              </th>
              <th onClick={() => {
                if (sortField === 'name') {
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortField('name');
                  setSortDirection('asc');
                }
              }}>
                Name
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
                )}
              </th>
              <th>Gender</th>
              <th onClick={() => {
                if (sortField === 'class') {
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortField('class');
                  setSortDirection('asc');
                }
              }}>
                Class
                {sortField === 'class' && (
                  sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
                )}
              </th>
              <th onClick={() => {
                if (sortField === 'stream') {
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortField('stream');
                  setSortDirection('asc');
                }
              }}>
                Stream
                {sortField === 'stream' && (
                  sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
                )}
              </th>
              <th>Date of Join</th>
              <th>Date of Birth</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <img 
                    src={student.photo || "/api/placeholder/40/40"}
                    className="student-photo"
                  />
                </td>
                <td>{student.admNo}</td>
                <td>{student.name}</td>
                <td>
                  <span className={`badge badge-${student.gender.toLowerCase()}`}>
                    {student.gender}
                  </span>
                </td>
                <td>{student.class}</td>
                <td>{student.stream}</td>
                <td>{format(new Date(student.doj), 'dd/MM/yyyy')}</td>
                <td>{format(new Date(student.dob), 'dd/MM/yyyy')}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="student-list-pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StudentList;