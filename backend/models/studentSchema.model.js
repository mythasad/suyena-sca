import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema({
    studentName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    fatherName: {
        type: String,
        trim: true,
        maxlength: 100
    },
    motherName: {
        type: String,
        trim: true,
        maxlength: 100
    },
    dateOfBirth: {
        type: Date
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{11}$/, '{VALUE} is not a valid mobile number!']
    },
    className: {
        type: String,
        enum: ['Nursery', 'Play', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'SSC', '11', 'HSC'],
        required: true
    },
    version: {
        type: String,
        enum: ['Bangla', 'English'],
        required: true
    },
    residency: {
        type: String,
        enum: ['Resident', 'Non-Resident', 'Day Care', 'Night Care'],
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    batch: {
        type: String,
        enum: ['School', 'Cadet'],
        required: true
    },
    transport: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    }
}, {
    timestamps: true
});

studentSchema.index({    
    studentName: 1,
    fatherName: 1,
    motherName: 1,
    mobileNumber: 1,
    className: 1,
    version: 1,
    residency: 1,
    gender: 1,
    batch: 1,
    transport: 1,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;