package com.bulgogi.service;

import com.bulgogi.model.UserSettings;
import com.bulgogi.repository.UserSettingsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // 자기소개 업데이트
    @Transactional
    public void updateBio(Long userId, String bio) {
        userSettingsRepository.updateBio(userId, bio);
        userSettingsRepository.flush();
    }

    // 이메일 마케팅 설정 업데이트
    public void updateEmailMarketing(Long userId, boolean emailMarketing) {
        userSettingsRepository.updateEmailMarketing(userId, emailMarketing);
    }

    // 이메일 게시글 알림 설정 업데이트
    public void updateEmailPostNotifications(Long userId, boolean emailPostNotifications) {
        userSettingsRepository.updateEmailPostNotifications(userId, emailPostNotifications);
    }

    // 이메일 댓글 알림 설정 업데이트
    public void updateEmailCommentNotifications(Long userId, boolean emailCommentNotifications) {
        userSettingsRepository.updateEmailCommentNotifications(userId, emailCommentNotifications);
    }

    // 테마 업데이트
    public void updateTheme(Long userId, String theme) {
        userSettingsRepository.updateTheme(userId, theme);
    }

    // 언어 설정 업데이트
    public void updateLanguage(Long userId, String language) {
        userSettingsRepository.updateLanguage(userId, language);
    }
}


