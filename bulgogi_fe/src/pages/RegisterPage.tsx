import React, { useState } from 'react';
import { registerUser } from '../api/authAPI';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(username, password, email);
      console.log('Registration successful');
      alert('Registration successful');
      navigate('/login');  // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      setError('Registration failed');
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
