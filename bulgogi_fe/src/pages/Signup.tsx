import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
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

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      await register(username, email, password);
      setMessage("회원가입이 완료되었습니다!");

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-neutral-900">Bulgogi</h2>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">회원가입</h2>
          <p className="mt-2 text-sm text-neutral-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="font-medium text-neutral-900 hover:underline">
              로그인하기
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500 transition-all duration-300">{error}</div>
        )}

        {message && (
          <div className="rounded-lg bg-green-50 p-4 text-sm text-green-500 transition-all duration-300">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="username" className="sr-only">
                아이디
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
                placeholder="아이디"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
                placeholder="이메일"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
                placeholder="비밀번호"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
                placeholder="비밀번호 확인"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </div>
        </form>

        <p className="text-xs text-center text-neutral-500">
          계속 진행하면 Bulgogi의{" "}
          <Link to="/terms" className="text-neutral-900 hover:underline">
            서비스 약관
          </Link>
          과{" "}
          <Link to="/privacy" className="text-neutral-900 hover:underline">
            개인정보 처리방침
          </Link>
          에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}