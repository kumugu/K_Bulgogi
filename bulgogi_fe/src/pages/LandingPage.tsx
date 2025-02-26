import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { isTokenValid } from "../services/authService"

export default function LandingPage() {
  const navigate = useNavigate()

  // 이미 로그인한 사용자는 로비 페이지로 리다이렉트
  useEffect(() => {
    if (isTokenValid()) {
      navigate("/lobby")
    }
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bulgogi-light">
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-7xl md:text-8xl font-extrabold text-bulgogi-primary mb-6">Bulgogi!</h1>
        <p className="text-2xl md:text-3xl mt-4 text-bulgogi-dark mb-8">
          맛있는 <span className="line-through text-gray-500">불고기</span> 블로그!
        </p>
        <p className="text-lg text-gray-600 mb-8">불고기에서 당신의 생각을 맛있게 구워보세요!</p>
        <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
          <button onClick={() => navigate("/login")} className="btn-primary">
            로그인
          </button>
          <button onClick={() => navigate("/signup")} className="btn-secondary">
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

