import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import Paper from '@mui/material/Paper';

function App() {
  return (
    <>
    <Paper sx={{width: "100%", height: "100vh"}}>
    <Navbar />
    <Routes>
      <Route path="/" element={<div>XD</div>} />
      <Route path="/my-profile" element={<div>My profile</div>} />
    </Routes>
    </Paper>
    </>
  );
}

export default App;
