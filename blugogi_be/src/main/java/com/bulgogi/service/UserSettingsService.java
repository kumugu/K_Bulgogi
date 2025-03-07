package com.bulgogi.service;

import com.bulgogi.model.UserSettings;
import com.bulgogi.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
public class UserSettingsService {

    private final UserSettingsRepository userSettingsRepository;

    @Autowired
    public UserSettingsService(UserSettingsRepository userSettingsRepository) {
        this.userSettingsRepository = userSettingsRepository;
    }

    // 특정 사용자 설정 조회
    public UserSettings getUserSettings(Long userId) {
        return userSettingsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("UserSettings not found for userId: " + userId));
    }

    // 사용자 설정 저장
    public UserSettings saveUserSettings(UserSettings userSettings) {
        return userSettingsRepository.save(userSettings);
    }

    // 사용자 설정 삭제
    public void deleteUserSettings(Long userId) {
        userSettingsRepository.deleteByUserId(userId);
    }

    // 공통 업데이트 메서드
    private void updateUserSetting(Long userId, String field, Object value) {
        switch (field) {
            case "bio":
                userSettingsRepository.updateBio(userId, (String) value);
                break;
            case "emailPost":
                userSettingsRepository.updateEmailPost(userId, (Boolean) value);
                break;
            case "emailComment":
                userSettingsRepository.updateEmailComment(userId, (Boolean) value);
                break;
            case "emailMarketing":
                userSettingsRepository.updateEmailMarketing(userId, (Boolean) value);
                break;
            case "theme":
                userSettingsRepository.updateTheme(userId, (String) value);
                break;
            case "language":
                userSettingsRepository.updateLanguage(userId, (String) value);
                break;
            default:
                throw new IllegalArgumentException("Invalid field: " + field);
        }
    }

    // 자기소개 업데이트
    @Transactional
    public void updateBio(Long userId, String bio) {
        updateUserSetting(userId, "bio", bio);
    }

    // 이메일 게시글 알림 설정 업데이트
    @Transactional
    public void updateEmailPost(Long userId, boolean emailPost) {
        updateUserSetting(userId, "emailPost", emailPost);
    }

    // 이메일 댓글 알림 설정 업데이트
    @Transactional
    public void updateEmailComment(Long userId, boolean emailComment) {
        updateUserSetting(userId, "emailComment", emailComment);
    }

    // 이메일 마케팅 설정 업데이트
    @Transactional
    public void updateEmailMarketing(Long userId, boolean emailMarketing) {
        updateUserSetting(userId, "emailMarketing", emailMarketing);
    }

    // 테마 업데이트
    @Transactional
    public void updateTheme(Long userId, String theme) {
        updateUserSetting(userId, "theme", theme);
    }

    // 언어 설정 업데이트
    @Transactional
    public void updateLanguage(Long userId, String language) {
        updateUserSetting(userId, "language", language);
    }
}
