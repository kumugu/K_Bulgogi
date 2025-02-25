import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ username, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername(''); // 상태 초기화
    localStorage.removeItem('username'); // 로컬 스토리지에서 삭제
    navigate('/login'); // 로그인 페이지로 리다이렉트
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
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    fontSize: '16px',
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
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
