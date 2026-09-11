// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

export const registerStudent = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch students');
    }

    return data;
  } catch (error) {
    console.error('Fetch students error:', error);
    throw error;
  }
};

export const getStudentById = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Student not found');
    }

    return data;
  } catch (error) {
    console.error('Fetch student error:', error);
    throw error;
  }
};

export const updateStudent = async (studentId, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Update failed');
    }

    return data;
  } catch (error) {
    console.error('Update student error:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Delete failed');
    }

    return data;
  } catch (error) {
    console.error('Delete student error:', error);
    throw error;
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await fetch('http://localhost:5000/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};
