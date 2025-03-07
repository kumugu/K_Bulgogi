import axios from "axios";
import { getAuthHeaders, saveToken } from "../utils/auth";

const API_URL = "http://localhost:8080/api/v1/auth/";

// 로그인 
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}login`, 
            { username, password });
        if (response.data.token) {  // 로그인 성공 시 토큰을 localStorage에 저장
           saveToken(response.data.token);
        }

        console.log('userId saved:', response.data.userId); // 저장된 userId 확인
        return response.data;
    } catch (error) {
        console.error('login failed:', error);
        throw error;
    }
};

// 회원가입
export const registerUser = async (username: string, password: string, email: string) => {
    try {
        const response = await axios.post(`${API_URL}register`, {
            username,
            password,
            email
        });
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

// 로그아웃
export const logoutUser = async () => {
    try {
        await axios.post(`${API_URL}logout`, {}, { headers: getAuthHeaders() });
        // 로그아웃 시 localStorage에 저장된 토큰을 제거합니다.
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }   
};