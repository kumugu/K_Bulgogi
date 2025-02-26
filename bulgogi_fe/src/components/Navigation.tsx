import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout, fetchProfile } from "../services/authService";

export default function Navigation() {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const profile = await fetchProfile(token);
        if (profile) {
          setUsername(profile.username);
        }
      }
    };
    
    loadUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-bulgogi-dark shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/lobby" className="flex-shrink-0 flex items-center">
              <span className="text-white text-xl font-bold">Bulgogi!</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link 
                to="/lobby" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                로비
              </Link>
              <Link 
                to="/blog-home" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                블로그 홈
              </Link>
              <Link 
                to="/mypage" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                마이페이지
              </Link>
            </div>
            
            <div className="ml-3 relative flex items-center space-x-4">
              <span className="text-gray-300 text-sm">{username ? `안녕하세요, ${username}님!` : ""}</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                로그아웃
              </button>
            </div>
            
            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden ml-4">
              <button className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 모바일 메뉴 - 실제 구현은 상태와 토글 로직이 필요합니다 */}
    </nav>
  );
}