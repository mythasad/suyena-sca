import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudentById, deleteStudent } from '../api/studentApi';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await fetchStudentById(id);
        setStudent(data);
        setError(null);
      } catch (error) {
        console.error('Error loading student:', error);
        setError('Failed to load student details');
      } finally {
        setLoading(false);
      }
    };
    loadStudent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!student) return <div>Student not found</div>;

  return (
    <div className="student-details">
      <h2>{student.studentName}</h2>
      <div className="details-grid">
        <div className="detail-item">
          <label>Father's Name:</label>
          <span>{student.fatherName}</span>
        </div>
        <div className="detail-item">
          <label>Mother's Name:</label>
          <span>{student.motherName}</span>
        </div>
        <div className="detail-item">
          <label>Date of Birth:</label>
          <span>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not provided'}</span>
        </div>
        <div className="detail-item">
          <label>Mobile Number:</label>
          <span>{student.mobileNumber}</span>
        </div>
        <div className="detail-item">
          <label>Class:</label>
          <span>{student.className}</span>
        </div>
        <div className="detail-item">
          <label>Version:</label>
          <span>{student.version}</span>
        </div>
        <div className="detail-item">
          <label>Residency:</label>
          <span>{student.residency}</span>
        </div>
        <div className="detail-item">
          <label>Gender:</label>
          <span>{student.gender}</span>
        </div>
        <div className="detail-item">
          <label>Batch:</label>
          <span>{student.batch}</span>
        </div>
        <div className="detail-item">
          <label>Transport:</label>
          <span>{student.transport}</span>
        </div>
      </div>
      
      <div className="actions">
        <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate('/')}>Back to List</button>
      </div>
    </div>
  );
};

export default StudentDetails;
