import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import MyAccount from './pages/MyAccount';
import { Grid } from '@mui/material';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
    <Navbar />
    <Grid sx={{width:"100%", height:"100vh"}} container justifyContent={"center"} alignContent="center">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/my-account" element={<MyAccount/>} />
      </Routes>
    </Grid>
    </>
  );
}

export default App;
