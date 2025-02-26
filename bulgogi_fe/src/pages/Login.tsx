import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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

      // 로비로 이동
      navigate("/lobby");
    } catch (error) {
      console.error("API 요청 실패:", error);
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="page-container">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-bulgogi-dark">로그인</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-1">
              아이디
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            계정이 없으신가요? <Link to="/signup" className="text-bulgogi-primary hover:underline">회원가입하기</Link>
          </p>
        </div>
      </div>
    </div>
  );
}