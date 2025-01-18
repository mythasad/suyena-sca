import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, fetchOptions, deleteStudent } from '../api/studentApi';
import StudentCard from './StudentCard';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    className: '',
    version: '',
    residency: '',
    gender: '',
    batch: '',
    transport: ''
  });
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsData, optionsData] = await Promise.all([
          fetchStudents(filters),
          fetchOptions()
        ]);
        setStudents(studentsData);
        setOptions(optionsData);
        setError(null);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      className: '',
      version: '',
      residency: '',
      gender: '',
      batch: '',
      transport: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container">
      <div className="list-header">
        <h2>Students List</h2>
        <Link to="/create" className="btn-create">Add New Student</Link>
      </div>

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search students..."
          value={filters.search}
          onChange={handleFilterChange}
        />
        
        {Object.entries(options).map(([key, values]) => (
          <select
            key={key}
            name={key}
            value={filters[key]}
            onChange={handleFilterChange}
          >
            <option value="">Select {key}</option>
            {values.map(opt => (
              <option key={opt.id} value={opt.name}>{opt.name}</option>
            ))}
          </select>
        ))}
        
        <button onClick={clearFilters} className="clear-filters">
          Clear Filters
        </button>
      </div>

      <div className="students-grid">
        {students.length === 0 ? (
          <div className="no-results">No students found</div>
        ) : (
          students.map(student => (
            <StudentCard
              key={student._id}
              student={student}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StudentList;
