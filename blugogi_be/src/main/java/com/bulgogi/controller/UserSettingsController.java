package com.bulgogi.controller;

import com.bulgogi.security.CustomUserDetails;
import com.bulgogi.service.UserSettingsService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/userSettings")
public class UserSettingsController {

    private final UserSettingsService userSettingsService;

    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    // 자기소개 업데이트
    @PatchMapping("/{userId}/bio")
    public void updateBio(@PathVariable Long userId, @RequestBody String bio, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long authenticatedUserId = customUserDetails.getUser().getId();

        // 로그를 추가하여 인증된 사용자 ID 확인
        System.out.println("Authenticated User ID: " + authenticatedUserId);
        System.out.println("Requested User ID: " + userId);

        if (!customUserDetails.getUser().getId().equals(userId)) {
            throw new SecurityException("You can Only update your own bio.");
        }
        userSettingsService.updateBio(userId, bio);
    }

    // 이메일 마케팅 알림 설정 업데이트
    @PatchMapping("/{userId}/emailMarketing")
    public void updateEmailMarketing(@PathVariable Long userId, @RequestBody boolean emailMarketing, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long authenticatedUserId = customUserDetails.getUser().getId();

        if (!customUserDetails.getUser().getId().equals(userId)) {
            throw new SecurityException("You can only update your own email marketing settings.");
        }
        userSettingsService.updateEmailMarketing(userId, emailMarketing);
    }

    // 이메일 게시글 알림 설정 업데이트
    @PatchMapping("/{userId}/emailPostNotifications")
    public void updateEmailPostNotifications(@PathVariable Long userId, @RequestBody boolean emailPostNotifications, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long authenticatedUserId = customUserDetails.getUser().getId();

        if (!customUserDetails.getUser().getId().equals(userId)) {
            throw new SecurityException("You can only update your own email post notifications.");
        }
       userSettingsService.updateEmailPostNotifications(userId, emailPostNotifications);
    }

    // 이메일 댓글 알림 설정 업데이트
    @PatchMapping("/{userId}/emailCommentNotifications")
    public void updateEmailCommentNotifications(@PathVariable Long userId, @RequestBody boolean emailCommentNotifications, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long authenticatedUserId = customUserDetails.getUser().getId();

        if (!customUserDetails.getUser().getId().equals(userId)) {
            throw new SecurityException("You can only update your own email comment notifications.");
        }
        userSettingsService.updateEmailCommentNotifications(userId, emailCommentNotifications);
    }

    // 테마 설정 업데이트
    @PatchMapping("/{userId}/theme")
    public void updateTheme(@PathVariable Long userId, @RequestBody String theme) {
        userSettingsService.updateTheme(userId, theme);
    }

    // 언어 설정 업데이트
    @PatchMapping("/{userId}/language")
    public void updateLanguage(@PathVariable Long userId, @RequestBody String language) {
        userSettingsService.updateLanguage(userId, language);
    }
}

