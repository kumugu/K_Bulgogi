import axios, { AxiosError } from 'axios';
import { getAuthHeaders } from '../utils/auth';
const API_URL = `http://localhost:8080/api/v1/userSettings`; 

/**
 * 사용자 설정을 가져오는 함수
 * @param userId - 사용자 ID
 * @returns 사용자 설정 데이터
 */
export const getUserSettings = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('사용자 설정을 가져오는 중 오류 발생:', error);
        throw error; 
    }
};

/**
 * 사용자 설정을 가져오는 함수
 * @returns 사용자 설정 데이터
 */
export const fetchUserSettings = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        throw new Error('User ID is missing');
    }
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch user settings:', error.response?.data?.message || error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw error;
    }
};

/**
 * 사용자 설정을 업데이트하는 함수
 * @param userId - 사용자 ID
 * @param settingKey - 변경할 설정 키 (예: bio, theme, language)
 * @param value - 변경할 값
 * @returns 업데이트된 설정 데이터
 */
export const updateUserSetting = async (userId: string, settingKey: string, value: any) => {
    try {
        const response = await axios.patch(
            `${API_URL}/${userId}/${settingKey}`,  // URL 수정
            { [settingKey]: value }, 
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(`Failed to update ${settingKey}:`, error.response?.data?.message || error.message);
        } else {
            console.error(`Unexpected error updating ${settingKey}:`, error);
        }
        throw error;
    }
};