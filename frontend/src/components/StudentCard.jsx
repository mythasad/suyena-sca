import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="student-card">
      <div className="student-info">
        <h3>{student.studentName}</h3>
        <p>Class: {student.className}</p>
        <p>Batch: {student.batch}</p>
        <p>Mobile: {student.mobileNumber}</p>
        <p>Version: {student.version}</p>
        <p>Gender: {student.gender}</p>
        <p>Residency: {student.residency}</p>
      </div>
      <div className="card-actions">
        <Link to={`/students/${student._id}`} className="btn-view">View</Link>
        <Link to={`/edit/${student._id}`} className="btn-edit">Edit</Link>
        <button 
          onClick={() => onDelete(student._id)} 
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default StudentCard;
