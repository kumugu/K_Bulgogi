import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';  // Navbar 추가

const App = () => {
  return (
    <Router>
      <Navbar /> {/* 네비게이션 바 추가 */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {/* 필요에 따라 다른 페이지들도 추가 가능 */}
      </Routes>
    </Router>
  );
};

export default App;
