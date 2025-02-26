import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/Login"
import SignupPage from "./pages/Signup"
import LobbyPage from "./pages/Lobby"
import "./index.css" // Tailwind CSS와 커스텀 스타일 임포트

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
      </Routes>
    </Router>
  )
}

export default App

