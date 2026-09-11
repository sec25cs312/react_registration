const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      match: [/^[0-9]{10,}$/, 'Please provide a valid phone number']
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
      trim: true,
      maxlength: [255, 'Address cannot exceed 255 characters']
    },
    dob: {
      type: Date,
      required: [true, 'Please provide date of birth']
    },
    studentId: {
      type: String,
      required: [true, 'Please provide a student ID'],
      unique: true,
      trim: true,
      uppercase: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email'
      ]
    },
    fatherName: {
      type: String,
      required: [true, 'Please provide father\'s name'],
      trim: true,
      maxlength: [100, 'Father name cannot exceed 100 characters']
    },
    motherName: {
      type: String,
      required: [true, 'Please provide mother\'s name'],
      trim: true,
      maxlength: [100, 'Mother name cannot exceed 100 characters']
    },
    gender: {
      type: String,
      required: [true, 'Please select a gender'],
      enum: ['Male', 'Female', 'Other']
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Create index for student ID to ensure uniqueness
studentSchema.index({ studentId: 1 }, { unique: true });
studentSchema.index({ email: 1 });

module.exports = mongoose.model('Student', studentSchema);
