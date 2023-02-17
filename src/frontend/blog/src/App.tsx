import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import MyAccount from './pages/MyAccount';
import { Grid } from '@mui/material';
import MainPage from './pages/MainPage';
import AddNews from './pages/AddNews';
import Users from './pages/Users'
import ArticlePage from './pages/ArticlePage';
import EventsPage from './pages/EventsPage';
import SciencePage from './pages/SciencePage';
import CulturePage from './pages/CulturePage';
import LifestylePage from './pages/LifestylePage';
import SportPage from './pages/SportPage';
import LoggedInDto from './dtos/LoggedInDto';
import Comments from './pages/Comments';
import Articles from './pages/Articles';
import MyArticles from './pages/MyArticles';
import MyComments from './pages/MyComments';
import DisplayAccount from './pages/DisplayAccount';
import UserArticles from './pages/UserArticles';
import UserComments from './pages/UserComments';
import EditNews from './pages/EditNews';

function App() {
  const [user, setUser] = useState<LoggedInDto|null>(null);
  return (
    <>
    <Navbar user={user} setUser={setUser} />
    <Grid sx={{width:"100%", height:"100vh"}} container justifyContent={"center"} alignContent="center">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category/news" element={<EventsPage />} />
        <Route path="/category/culture" element={<CulturePage />} />
        <Route path="/category/science" element={<SciencePage />} />
        <Route path="/category/lifestyle" element={<LifestylePage />} />
        <Route path="/category/sport" element={<SportPage />} />
        <Route path="/my-account" element={<MyAccount u={user}/>} />
        <Route path="/my-news" element={<MyArticles user={user}/>} />
        <Route path="/my-comments" element={<MyComments user={user}/>} />
        <Route path="/news/:id" element={<ArticlePage user={user}/>} />
        <Route path="/news/:id/edit" element={<EditNews user={user}/>} />
        <Route path="/news/" element={<Articles user={user}/>} />
        <Route path="/news/add" element={<AddNews user={user}/>} />
        <Route path="/users/" element={<Users user={user}/>} />
        <Route path="/user/:id" element={<DisplayAccount />} />
        <Route path="/users/:id/news" element={<UserArticles />} />
        <Route path="/users/:id/comments" element={<UserComments />} />
        <Route path="/comments/" element={<Comments user={user}/>} />
      </Routes>
    </Grid>
    </>
  );
}

export default App;
