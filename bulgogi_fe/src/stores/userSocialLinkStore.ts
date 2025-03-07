import { create } from 'zustand';

interface UserSocialLinkStore { 
    socialLinks: { socialPlatform: string; url: string }[]; 
    setSocialLinks: (links: { socialPlatform: string; url: string }[]) => void;
    addSocialLink: (link: { socialPlatform: string; url: string }) => void;
    removeSocialLink: (socialPlatform: string) => void; 
}


export const useUserSocialLinkStore = create<UserSocialLinkStore>((set) => ({
    socialLinks: [],
    
    setSocialLinks: (links) => set({ socialLinks: links }),

    addSocialLink: (link) => set((state) => ({
        socialLinks: [...state.socialLinks, link], 
    })),

    removeSocialLink: (socialPlatform) => set((state) => ({
        socialLinks: state.socialLinks.filter((existingLink) => existingLink.socialPlatform !== socialPlatform),
    })),
}));
