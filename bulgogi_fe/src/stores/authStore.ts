import { create } from 'zustand';

// 인증 상태 타입 정의
interface AuthState {
    token: string | null;
    user: { userId: string; username: string; email: string } | null;
    login: (token: string, user: { userId: string; username: string; email: string }) => void;
    logout: () => void;
}

// Zustand store 설정
export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    login: (token, user) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
}));
