const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// @route   POST /api/register
// @desc    Register a new student
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, phone, address, dob, studentId, email, fatherName, motherName, gender } = req.body;

    // Validate required fields
    if (!name || !phone || !address || !dob || !studentId || !email || !fatherName || !motherName || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ studentId: studentId.trim().toUpperCase() });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: `Student ID "${studentId}" is already registered!`
      });
    }

    // Check for duplicate email
    const existingEmail = await Student.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: `Email "${email}" is already registered!`
      });
    }

    // Create new student
    const student = new Student({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      dob: new Date(dob),
      studentId: studentId.trim().toUpperCase(),
      email: email.toLowerCase().trim(),
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      gender: gender,
      registeredAt: new Date()
    });

    // Save to database
    const result = await student.save();

    res.status(201).json({
      success: true,
      message: 'Registration Successfully Completed!',
      data: result
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to save registration. Please try again.',
      error: error.message
    });
  }
});

// @route   GET /api/students
// @desc    Get all registered students
// @access  Public
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ registeredAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Fetch students error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch students',
      error: error.message
    });
  }
});

// @route   GET /api/students/:studentId
// @desc    Get a specific student by ID
// @access  Public
router.get('/students/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId.toUpperCase() });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Fetch student error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to fetch student',
      error: error.message
    });
  }
});

// @route   PUT /api/students/:studentId
// @desc    Update a student's registration
// @access  Public
router.put('/students/:studentId', async (req, res) => {
  try {
    const { name, phone, address, dob, email, fatherName, motherName, gender } = req.body;
    
    // Find student by studentId
    let student = await Student.findOne({ studentId: req.params.studentId.toUpperCase() });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Update fields if provided
    if (name) student.name = name.trim();
    if (phone) student.phone = phone.trim();
    if (address) student.address = address.trim();
    if (dob) student.dob = new Date(dob);
    if (email) student.email = email.toLowerCase().trim();
    if (fatherName) student.fatherName = fatherName.trim();
    if (motherName) student.motherName = motherName.trim();
    if (gender) student.gender = gender;

    const result = await student.save();
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to update student',
      error: error.message
    });
  }
});

// @route   DELETE /api/students/:studentId
// @desc    Delete a student registration
// @access  Public
router.delete('/students/:studentId', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ studentId: req.params.studentId.toUpperCase() });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Student registration deleted successfully',
      data: student
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to delete student',
      error: error.message
    });
  }
});

module.exports = router;
