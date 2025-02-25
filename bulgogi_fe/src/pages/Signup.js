import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 회원가입 요청 보내기
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        setMessage('회원가입이 완료되었습니다!');
        // 회원가입이 성공하면 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/login'); // 로그인 페이지로 리다이렉트
        }, 1000); // 1초 후 리다이렉트 (UX 고려)
      }
    } catch (error) {
      setMessage('회원가입에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '가입 중...' : '회원가입'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
