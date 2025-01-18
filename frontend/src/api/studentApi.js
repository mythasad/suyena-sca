const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json();
};

export const fetchStudents = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_URL}/students?${queryParams}`);
  return handleResponse(response);
};

export const fetchStudentById = async (id) => {
  const response = await fetch(`${API_URL}/students/${id}`);
  return handleResponse(response);
};

export const createStudent = async (data) => {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const updateStudent = async (id, data) => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const fetchOptions = async () => {
  const response = await fetch(`${API_URL}/options`);
  const data = await handleResponse(response);
  return {
    classNameOptions: ['Nursery', 'Play', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'SSC', '11', 'HSC'].map(name => ({ id: name, name })),
    versionOptions: ['Bangla', 'English'].map(name => ({ id: name, name })),
    residencyOptions: ['Resident', 'Non-Resident', 'Day Care', 'Night Care'].map(name => ({ id: name, name })),
    genderOptions: ['Male', 'Female'].map(name => ({ id: name, name })),
    batchOptions: ['School', 'Cadet'].map(name => ({ id: name, name })),
    transportOptions: ['Yes', 'No'].map(name => ({ id: name, name }))
  };
};
