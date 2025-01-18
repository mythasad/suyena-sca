const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String },
  motherName: { type: String },
  dateOfBirth: { type: Date },
  mobileNumber: { type: String, required: true },
  className: { type: String, required: true },
  version: { type: String, required: true },
  residency: { type: String, required: true },
  gender: { type: String, required: true },
  batch: { type: String, required: true },
  transport: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

studentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Student', studentSchema);
