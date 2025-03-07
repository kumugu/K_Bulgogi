import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

const API_URL = "http://localhost:8080/api/v1/socialLink"

/**
 * 사용자의 소셜 링크를 가져오는 함수
 * @param userId - 조회할 사용자의 ID
 * @returns 사용자 소셜 링크 데이터
 */
export const fetchUserSocialLink = async (userId: number) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: getAuthHeaders()   // 헤더에 JWT 토큰 추가
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user social link:', error);
        throw error;
    }
};

/**
 * 사용자 소셜 링크를 업데이트하는 함수 (전체 설정)
 * @param userId - 사용자 ID
 * @param platform - 소셜 플랫폼 
 * @param socialLink - 변경할 설정 데이터 객체
 * @returns 업데이트된 소셜 링크 데이터
 */
export const updateSocialLink = async (userId: number, platform: string, socialLink: any) => {
    try {
        const response = await axios.patch(`${API_URL}/socialLink/${userId}/${platform}`, socialLink, {
            headers: getAuthHeaders()   // 헤더에 JWT 토큰 추가
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update user social link:', error);
        throw error;
    }
};



/**
 * 사용자 소셜 링크 데이터를 추가 함수
 * @param userId - 사용자 ID
*/
export const addUserSocialLink = async (userId: number, socialPlatform: string, url: string) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}`,
            { socialPlatform, url },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to create user social link:', error);
        throw error;
    }
};


/**
 * 사용자 소셜 링크 데이터를 조회하는 함수
 * @param userId - 사용자 ID
 * @returns 조회한 소셜 링크 데이터
 */
export const selectUserSocialLink = async (userId: number) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`,{
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Failed to select user social link:', error);
        throw error;
    }
};


/**
 * 사용자 소셜 링크 데이터를 업데이트하는 함수
 * @param userId - 사용자 ID
 * @param socialPlatform - 소셜 플랫폼
 * @param url - 소셜 링크 URL
 */
export const UpdateUserSocialLink = async (userId: number, socialPlatform: string, url: string) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, 
            { socialPlatform, url },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to update user social link:', error);
        throw error;
    }
};
/**
 * 사용자 소셜 링크 데이터를 삭제하는 함수
 * @param userId - 사용자 ID
 * @param socialPlatform - 소셜 플랫폼
 */
export const deleteUserSocialLink = async (userId: number, socialPlatform: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`, {
            headers: getAuthHeaders(),
            params: { socialPlatform: socialPlatform }  // 쿼리 파라미터로 소셜 플랫폼 전달
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete user social link:', error);
        throw error;
    }
};
