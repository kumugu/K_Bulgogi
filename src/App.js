import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // 로컬 스토리지에서 username 가져오기

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username); // 로컬 스토리지에 username 저장
    } else {
      localStorage.removeItem('username'); // 로그아웃 시 로컬 스토리지에서 username 제거
    }
  }, [username]);

  return (
    <Router>
      <Navbar username={username} setUsername={setUsername} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile username={username} />} />
      </Routes>
    </Router>
  );
};

export default App;
