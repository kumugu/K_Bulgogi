import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyBlog</div>
      <div style={styles.navLinks}>
        <Link to="/signup" style={styles.link}>회원가입</Link>
        <Link to="/login" style={styles.link}>로그인</Link>
        <Link to="/profile" style={styles.link}>내 페이지</Link>
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
  }
};

export default Navbar;
