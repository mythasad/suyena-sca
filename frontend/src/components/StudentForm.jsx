import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchOptions } from '../api/studentApi';

const StudentForm = ({ initialData, onSubmit, submitLabel }) => {
  const [form, setForm] = useState(initialData);
  const [options, setOptions] = useState({
    classNameOptions: [],
    versionOptions: [],
    residencyOptions: [],
    genderOptions: [],
    batchOptions: [],
    transportOptions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedOptions = await fetchOptions();
        setOptions(fetchedOptions);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    getOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...form,
      mobileNumber: form.mobileNumber.replace(/\D/g, '').slice(0, 11)
    };
    onSubmit(formData);
  };

  if (loading) return <div>Loading options...</div>;
  if (error) return <div>Error loading options: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-group">
        <input
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          placeholder="Student Name"
          maxLength={100}
          required
        />
      </div>
      <input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father Name" />
      <input name="motherName" value={form.motherName} onChange={handleChange} placeholder="Mother Name" />
      <input name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" type="date" />
      <div className="form-group">
        <input
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number (11 digits)"
          pattern="\d{11}"
          title="Please enter 11 digits"
          required
        />
      </div>
      
      <select name="className" value={form.className} onChange={handleChange} required>
        <option value="">Select Class</option>
        {options.classNameOptions.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <select name="version" value={form.version} onChange={handleChange} required>
        <option value="">Select Version</option>
        {options.versionOptions.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <select name="residency" value={form.residency} onChange={handleChange} required>
        <option value="">Select Residency</option>
        {options.residencyOptions.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <select name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        {options.genderOptions.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <select name="batch" value={form.batch} onChange={handleChange} required>
        <option value="">Select Batch</option>
        {options.batchOptions.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <select name="transport" value={form.transport} onChange={handleChange}>
        <option value="">Select Transport</option>
        {options.transportOptions.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

StudentForm.propTypes = {
  initialData: PropTypes.shape({
    studentName: PropTypes.string.isRequired,
    fatherName: PropTypes.string,
    motherName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    mobileNumber: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    residency: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    batch: PropTypes.string.isRequired,
    transport: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};

export default StudentForm;
