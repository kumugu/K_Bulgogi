import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // JWT에서 username 추출 (백엔드에서 `/api/v1/auth/me` 같은 API 필요)
      fetchProfile(token).then(user => {
        if (user) setUsername(user.username);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(""); // 상태 초기화
    navigate("/login", { replace: true }); // replace 추가
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Bulgogi</Link>
      <div style={styles.navLinks}>
        {!username ? (
          <>
            <Link to="/signup" style={styles.link}>회원가입</Link>
            <Link to="/login" style={styles.link}>로그인</Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={styles.link}>내 페이지 ({username})</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>로그아웃</button>
          </>
        )}
      </div>
    </nav>
  );
};

// 프로필 가져오는 함수
const fetchProfile = async (token) => {
  if (!token) return null;

  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("인증 실패");

    return await response.json(); // { username: "testUser" } 같은 응답 예상
  } catch (error) {
    console.error(error);
    return null;
  }
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  link: {
    fontSize: '16px',
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
  },
  logoutButton: {
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#f44336',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
  }
};

export default Navbar;
