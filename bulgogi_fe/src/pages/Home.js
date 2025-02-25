import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.homeContainer}>
        <h1 style={styles.heading}>Welcome to MyBlog</h1>
        <p style={styles.subheading}>A platform to share your thoughts with the world</p>
        <div style={styles.buttons}>
          <button style={styles.button}>회원가입</button>
          <button style={styles.button}>로그인</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  homeContainer: {
    marginTop: '80px', // 네비게이션 바를 고려한 margin
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#333',
  },
  subheading: {
    fontSize: '24px',
    color: '#555',
    marginBottom: '40px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    fontSize: '18px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Home;
