import express from 'express';
import {
    createStudent,
    createStudents,
    getStudentById,
    getAllStudents,
    updateStudentById,
    deleteStudentById
} from '../controllers/studentController.js';

const router = express.Router();

router.post('/', createStudent);
router.post('/bulk', createStudents);
router.get('/:id', getStudentById);
router.get('/', getAllStudents);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);

export default router;
