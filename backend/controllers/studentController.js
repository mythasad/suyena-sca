import Student from '../models/studentSchema.model.js';

// Create a new student
export const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create multiple students
export const createStudents = async (req, res) => {
    try {
        const students = await Student.insertMany(req.body);
        res.status(201).json(students);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all students with optional filters and search
export const getAllStudents = async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const query = buildFilterQuery(filters);
        
        const [students, total] = await Promise.all([
            Student.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 }),
            Student.countDocuments(query)
        ]);

        res.json({
            students,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Helper function to build filter query
const buildFilterQuery = (filters) => {
    const query = {};
    const { className, version, residency, gender, batch, transport, search } = filters;

    if (className) query.className = className;
    if (version) query.version = version;
    if (residency) query.residency = residency;
    if (gender) query.gender = gender;
    if (batch) query.batch = batch;
    if (transport) query.transport = transport;
    if (search) {
        query.$or = [
            { studentName: new RegExp(search, 'i') },
            { fatherName: new RegExp(search, 'i') },
            { motherName: new RegExp(search, 'i') },
            { mobileNumber: new RegExp(search, 'i') }
        ];
    }

    return query;
};

// Add options endpoint
export const getOptions = async (req, res) => {
    try {
        const options = {
            classNameOptions: Student.schema.path('className').enumValues,
            versionOptions: Student.schema.path('version').enumValues,
            residencyOptions: Student.schema.path('residency').enumValues,
            genderOptions: Student.schema.path('gender').enumValues,
            batchOptions: Student.schema.path('batch').enumValues,
            transportOptions: Student.schema.path('transport').enumValues
        };
        res.json(options);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a student by ID
export const updateStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a student by ID
export const deleteStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
