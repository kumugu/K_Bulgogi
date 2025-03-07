import { jwtDecode } from 'jwt-decode';

// JWT 토큰을 Authorization 헤더에 포함시키는 함수
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');  // JWT 토큰을 localStorage에서 가져옴
    const userId = localStorage.getItem('userId');  // userId 가져옴
    if (!token || !userId) {
        return {};  // 토큰이 없으면 빈 헤더 반환
    }
    return { Authorization: `Bearer ${token}`, userId };  // 토큰과 userId를 함께 반환환 
};

// JWT 토큰을 로컬 스토리지에 저장하고, userId도 함께 저장하는 함수
export const saveToken = (token: string) => {
    localStorage.setItem('token', token); 

    // JWT 토큰을 디코딩해서 userId 추출
    const decoded: any = jwtDecode(token);
    const userId = decoded.userId;

    // userId를 localStorage에 저장
    localStorage.setItem('userId', userId);
};

const token = localStorage.getItem('token');
if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
}