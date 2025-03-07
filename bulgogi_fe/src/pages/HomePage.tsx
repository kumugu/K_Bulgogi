import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');  // 로그인 페이지로 이동
  };

  const handleRegisterClick = () => {
    navigate('/register');  // 회원가입 페이지로 이동
  };


  return (
    <div>
      <h1>Welcome to the Blog Platform</h1>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
};

export default HomePage;
