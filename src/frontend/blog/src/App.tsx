import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import MyAccount from './pages/MyAccount';
import { Grid } from '@mui/material';
import MainPage from './pages/MainPage';
import AddNews from './pages/AddNews';
import Users from './pages/Users'
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <>
    <Navbar />
    <Grid sx={{width:"100%", height:"100vh"}} container justifyContent={"center"} alignContent="center">
      <Routes>
        <Route path="/" element={<ArticlePage />} />
        <Route path="/my-account" element={<MyAccount/>} />
      </Routes>
    </Grid>
    </>
  );
}

export default App;
