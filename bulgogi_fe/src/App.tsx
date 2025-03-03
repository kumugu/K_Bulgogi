import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/Login"
import SignupPage from "./pages/Signup"
import AboutPage from "./pages/About"
import BlogHome from "./pages/BlogHome"
import WritePage from "./pages/Write"
import MyBlog from "./pages/MyBlog"
import SettingsPage from "./pages/Settings"
import Navigation from "./components/Navigation" 
import "./index.css" 

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
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  )
}

export default App
