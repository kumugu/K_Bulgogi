import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      await register(username, email, password);
      setMessage("회원가입이 완료되었습니다!");
      
      // 회원가입 성공 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      console.error("회원가입 오류:", err);
      setError(err.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-bulgogi-dark">회원가입</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="email" className="block text-gray-700 mb-1">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요? <Link to="/login" className="text-bulgogi-primary hover:underline">로그인하기</Link>
          </p>
        </div>
      </div>
    </div>
  );
}