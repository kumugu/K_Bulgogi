import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUsername }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        username,
        password,
      });

      // 로그인 성공 시, 사용자 이름을 상태로 설정하고 로컬 스토리지에 저장
      setUsername(username);
      localStorage.setItem('username', username); // 로컬 스토리지에 저장
      navigate('/profile', { state: { username } });
    } catch (error) {
      setError('로그인 실패: ' + (error.response?.data || '알 수 없는 오류'));
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
