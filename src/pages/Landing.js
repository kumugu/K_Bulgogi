import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold">Bulgogi!</h1>
      <p className="text-2xl mt-4">
        세상에서 가장 맛있는 <span className="line-through">블고기</span> 블로그!
      </p>
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg shadow-md hover:bg-gray-700"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
