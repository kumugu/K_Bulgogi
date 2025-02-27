import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/Login"
import SignupPage from "./pages/Signup"
import AboutPage from "./pages/About"
import BlogHome from "./pages/BlogHome"
import WritePage from "./pages/Write"
import Navigation from "./components/Navigation" // Navigation 컴포넌트 임포트
import "./index.css" // Tailwind CSS와 커스텀 스타일 임포트

function App() {
  return (
    <Router>
      <Navigation /> {/* 모든 페이지에서 네비게이션 바를 보이도록 추가 */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogHome" element={<BlogHome />} />
        <Route path="/write" element={<WritePage />} /> 
      </Routes>
    </Router>
  )
}

export default App
