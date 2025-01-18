const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
  try {
    const filters = {};
    const { search, className, version, residency, gender, batch, transport } = req.query;

    if (search) {
      filters.$or = [
        { studentName: new RegExp(search, 'i') },
        { fatherName: new RegExp(search, 'i') },
        { motherName: new RegExp(search, 'i') },
        { mobileNumber: new RegExp(search, 'i') }
      ];
    }

    if (className) filters.className = className;
    if (version) filters.version = version;
    if (residency) filters.residency = residency;
    if (gender) filters.gender = gender;
    if (batch) filters.batch = batch;
    if (transport) filters.transport = transport;

    const students = await Student.find(filters).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
