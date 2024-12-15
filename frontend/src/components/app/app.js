import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Parent from '../allEmployees/parent';
import NewEmployee from '../addEmployee/newEmployee';
import Home from '../Home/home'
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/employees" element={<Parent/>} />
          <Route path="/add-employee" element={<NewEmployee/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
