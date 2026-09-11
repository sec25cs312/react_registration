import React, { useState } from 'react';
import './App.css';
import { registerStudent } from './api/studentApi';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    dob: '',
    studentId: '',
    email: '',
    fatherName: '',
    motherName: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Call backend API to register student in MongoDB
      const response = await registerStudent(formData);

      if (response.success) {
        setSubmittedData({
          ...response.data,
          registeredAt: new Date().toLocaleString()
        });
        setStatus({
          type: 'success',
          message: response.message || 'Registration Successfully Completed!'
        });

        // Reset inputs
        setFormData({
          name: '',
          phone: '',
          address: '',
          dob: '',
          studentId: '',
          email: '',
          fatherName: '',
          motherName: '',
          gender: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: response.message || 'Registration failed. Please try again.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Unable to connect to server. Make sure backend is running.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card-container">
        
        {/* Top Branding & Logo */}
        <div className="brand-header">
          <div className="logo-badge">
            <svg viewBox="0 0 100 100" className="vector-logo" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="50%" stopColor="#4facfe" />
                  <stop offset="100%" stopColor="#00ff87" />
                </linearGradient>
              </defs>
              <polygon points="50,12 88,32 88,72 50,92 12,72 12,32" stroke="url(#neonGlow)" strokeWidth="4" fill="rgba(10, 16, 26, 0.7)" />
              <path d="M50 28 L72 65 L28 65 Z" fill="url(#neonGlow)" opacity="0.9" />
              <circle cx="50" cy="48" r="5" fill="#ffffff" />
            </svg>
          </div>
          <h1 className="title-text">Student Enrollment</h1>
          <p className="subtitle-text">Fill out all fields below to activate your admission</p>
        </div>

        {/* Active Feedback Banner */}
        {status && (
          <div className={`notification-pill ${status.type}`}>
            <span className="pill-symbol">{status.type === 'success' ? '✓' : '!'}</span>
            <span>{status.message}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="entry-form">
          <div className="fields-grid">
            
            <div className="field-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Student ID *</label>
              <input
                type="text"
                name="studentId"
                required
                placeholder="e.g. REG-2026-90"
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Email ID *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="example@portal.edu"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{10}"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Gender *</label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="field-group">
              <label>Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                required
                placeholder="Father's complete name"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label>Mother's Name *</label>
              <input
                type="text"
                name="motherName"
                required
                placeholder="Mother's complete name"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>

            <div className="field-group full-width">
              <label>Address *</label>
              <textarea
                name="address"
                rows="3"
                required
                placeholder="Door No, Street Name, Area, City, Postal Code"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

          </div>

          <button type="submit" className="action-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Register Successfully →'}
          </button>
        </form>

        {/* Live Confirmation Preview Card */}
        {submittedData && (
          <div className="preview-receipt">
            <h3>Latest Registered Candidate</h3>
            <p><strong>ID:</strong> {submittedData.studentId} | <strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email} | <strong>Phone:</strong> {submittedData.phone}</p>
            <p><strong>Timestamp:</strong> {submittedData.registeredAt}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
