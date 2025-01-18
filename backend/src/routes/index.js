const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const optionsController = require('../controllers/optionsController');

// Student routes
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Options routes
router.get('/options', optionsController.getOptions);

module.exports = router;
