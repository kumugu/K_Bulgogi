import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      console.log("로그인 성공:", data);

      // 마이페이지로 이동
      navigate("/mypage");
    } catch (error) {
      console.error("API 요청 실패:", error);
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
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
