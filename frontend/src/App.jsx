import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchStudents, createStudent, deleteStudent } from './api/studentApi';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import CreateStudent from './components/CreateStudent';
import EditStudent from './components/EditStudent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Student Management System</h1>
        </nav>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
          <Route path="/students/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
