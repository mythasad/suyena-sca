import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';
import { createStudent } from '../api/studentApi';

const CreateStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialForm = {
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    mobileNumber: '',
    className: '',
    version: '',
    residency: '',
    gender: '',
    batch: '',
    transport: ''
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await createStudent(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating student:', error);
      setError('Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      {loading ? (
        <div>Creating student...</div>
      ) : (
        <StudentForm 
          initialData={initialForm}
          onSubmit={handleSubmit}
          submitLabel="Create Student"
        />
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CreateStudent;
