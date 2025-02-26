import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

// 로그인 함수
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
  }
};

// 회원가입 함수
export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
    });
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
  }
};

// 로그아웃 함수
export const logout = () => {
  localStorage.removeItem('token');
};

// 프로필 가져오기 함수
export const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('토큰이 없습니다. 로그인해주세요.');
  }

  try {
    const response = await axios.get(`${API_URL}/auth/my`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Fetch profile error:', error);
    throw new Error('프로필을 불러오는 데 실패했습니다.');
  }
};

// 토큰 유효성 검사 함수
export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    // JWT 만료 검사 로직 추가 (예시)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};
