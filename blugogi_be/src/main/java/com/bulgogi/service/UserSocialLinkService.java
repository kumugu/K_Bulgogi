package com.bulgogi.service;

import com.bulgogi.model.UserSettings;
import com.bulgogi.model.UserSocialLink;
import com.bulgogi.repository.UserSettingsRepository;
import com.bulgogi.repository.UserSocialLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserSocialLinkService {

    private final UserSocialLinkRepository userSocialLinkRepository;
    private final UserSettingsRepository userSettingsRepository;

    @Autowired
    public UserSocialLinkService(UserSocialLinkRepository userSocialLinkRepository, UserSettingsRepository userSettingsRepository) {
        this.userSocialLinkRepository = userSocialLinkRepository;
        this.userSettingsRepository = userSettingsRepository;
    }

    // 사용자 소셜 링크 리스트 조회
    public List<UserSocialLink> getSocialLinksByUserId(Long userId) {
        return userSocialLinkRepository.findByUserSettingsUserId(userId);
    }

    // 사용자 소셜 링크 삭제
    @Transactional
    public void deleteSocialLink(Long userId, String socialPlatform) {
        userSocialLinkRepository.deleteSocialLink(userId, socialPlatform);
    }

    // 사용자 소셜 링크 추가
    @Transactional
    public UserSocialLink addSocialLink(Long userId, String socialPlatform, String url) {
        // 올바른 userSettings.id 가져오기
        UserSettings userSettings = userSettingsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("UserSettings not found for userId: " + userId));

        System.out.println("Found UserSettings ID: " + userSettings.getId()); // 디버깅용 로그 추가

        // UserSocialLink 생성 및 저장
        UserSocialLink userSocialLink = UserSocialLink.builder()
                .userSettings(userSettings) //userId가 아니라 userSettings 객체 사용
                .socialPlatform(socialPlatform)
                .url(url)
                .build();

        return userSocialLinkRepository.save(userSocialLink);
    }


    // 사용자 소셜 링크 수정
    @Transactional
    public UserSocialLink updateSocialLink(Long userId, String socialPlatform, String newUrl) {
        UserSocialLink userSocialLink = userSocialLinkRepository.findByUserSettingsUserId(userId)
                .stream()
                .filter(link -> link.getSocialPlatform().equals(socialPlatform))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Social link not found"));

        userSocialLink.setUrl(newUrl);
        return userSocialLinkRepository.save(userSocialLink);
    }
}
