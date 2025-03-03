import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, User, Settings, LogOut, ChevronDown } from 'lucide-react'

export default function Navigation() {
  const [username, setUsername] = useState<string>("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const profileRef = useRef<HTMLDivElement>(null)

  // 프로필 로드 함수 - 여러 곳에서 재사용
  const loadUserData = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const authService = await import("../services/authService")
        const profile = await authService.fetchProfile()
        if (profile) {
          setUsername(profile.username)
          console.log("프로필 로드 성공:", profile)
        }
      } catch (error) {
        console.error("Failed to load profile:", error)
      }
    } else {
      console.log("토큰이 없습니다")
    }
  }

  // 초기 로드 및 라우트 변경 시 프로필 로드
  useEffect(() => {
    loadUserData()
  }, [location]) // 라우트 변경 시 재실행

  // 로그인 이벤트 리스너
  useEffect(() => {
    const handleLoginEvent = () => {
      loadUserData()
    }

    window.addEventListener("login-success", handleLoginEvent)
    return () => window.removeEventListener("login-success", handleLoginEvent)
  }, [])

  // 프로필 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      const authService = await import("../services/authService")
      await authService.logout()
      localStorage.removeItem("token")
      setUsername("") // 로그아웃 시 username 초기화
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : ""
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center w-[120px]">
            <Link to="/" className="flex-shrink-0">
              <span className="font-serif text-3xl font-bold tracking-tight text-neutral-900">Bulgogi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/blogHome"
              className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              to="/write"
              className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200"
            >
              Write
            </Link>

            {username ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                    {getInitials(username)}
                  </div>
                  <span className="text-sm font-medium">{username}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium text-neutral-900">{username}</p>
                    </div>
                    <Link
                      to={`/myblog`}
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      My Blog
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsProfileOpen(false)
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-neutral-50"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-neutral-900 text-sm font-medium rounded-full text-neutral-900 bg-white hover:bg-neutral-50 transition-colors duration-200"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-900 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200 mt-2">
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blogHome"
              className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/write"
              className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Write
            </Link>

            {username ? (
              <>
                <Link
                  to={`/myblog`}
                  className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Blog
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-neutral-900 hover:text-neutral-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
      <style>{`
        body {
          padding-top: 72px;
        }
      `}</style>
    </nav>
  )
}