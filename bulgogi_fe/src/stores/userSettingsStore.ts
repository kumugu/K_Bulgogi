import { create } from 'zustand';

interface UserSettingsStore {
  bio: string;
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
  emailNotifications: {
    post: boolean;
    comment: boolean;
    marketing: boolean;
  };
  setBio: (bio: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'ko' | 'en') => void;
  setEmailNotifications: (notifications: {
    post: boolean;
    comment: boolean;
    marketing: boolean;
  }) => void;
}

export const useUserSettingsStore = create<UserSettingsStore>((set) => ({
  bio: '',
  theme: 'light',
  language: 'ko',
  emailNotifications: {
    post: false,
    comment: false,
    marketing: false,
  },
  setBio: (bio: string) => set({ bio }),
  setTheme: (theme: 'light' | 'dark') => set({ theme }),
  setLanguage: (language: 'ko' | 'en') => set({ language }),
  setEmailNotifications: (notifications: {
    post: boolean;
    comment: boolean;
    marketing: boolean;
  }) => set({ emailNotifications: notifications }),
}));
