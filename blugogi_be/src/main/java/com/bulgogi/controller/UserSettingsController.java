package com.bulgogi.controller;

import com.bulgogi.security.CustomUserDetails;
import com.bulgogi.service.UserSettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/userSettings")
public class UserSettingsController {

    private final UserSettingsService userSettingsService;

    private static final String UNAUTHORIZED_ACCESS_MESSAGE = "You can only update your own settings.";

    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    // 사용자 설정을 가져오는 메서드 추가
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserSettings(@PathVariable Long userId, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!isAuthorizedUser(userId, customUserDetails)) {
            return ResponseEntity.status(403).body(UNAUTHORIZED_ACCESS_MESSAGE);
        }

        // 사용자 설정을 가져오는 서비스 호출
        return ResponseEntity.ok(userSettingsService.getUserSettings(userId));
    }

    // 자기소개 업데이트
    @PatchMapping("/{userId}/bio")
    public ResponseEntity<?> updateBio(@PathVariable Long userId, @RequestBody String bio, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!isAuthorizedUser(userId, customUserDetails)) {
            return ResponseEntity.status(403).body(UNAUTHORIZED_ACCESS_MESSAGE);
        }
        userSettingsService.updateBio(userId, bio);
        return ResponseEntity.ok().build();
    }

    // 이메일 게시글 알림 설정 업데이트
    @PatchMapping("/{userId}/emailPost")
    public ResponseEntity<?> updateEmailPost(@PathVariable Long userId, @RequestBody boolean emailPost, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!isAuthorizedUser(userId, customUserDetails)) {
            return ResponseEntity.status(403).body(UNAUTHORIZED_ACCESS_MESSAGE);
        }
        userSettingsService.updateEmailPost(userId, emailPost);
        return ResponseEntity.ok().build();
    }

    // 이메일 댓글 알림 설정 업데이트
    @PatchMapping("/{userId}/emailComment")
    public ResponseEntity<?> updateEmailComment(@PathVariable Long userId, @RequestBody boolean emailComment, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!isAuthorizedUser(userId, customUserDetails)) {
            return ResponseEntity.status(403).body(UNAUTHORIZED_ACCESS_MESSAGE);
        }
        userSettingsService.updateEmailComment(userId, emailComment);
        return ResponseEntity.ok().build();
    }

    // 이메일 마케팅 알림 설정 업데이트
    @PatchMapping("/{userId}/emailMarketing")
    public ResponseEntity<?> updateEmailMarketing(@PathVariable Long userId, @RequestBody boolean emailMarketing, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!isAuthorizedUser(userId, customUserDetails)) {
            return ResponseEntity.status(403).body(UNAUTHORIZED_ACCESS_MESSAGE);
        }
        userSettingsService.updateEmailMarketing(userId, emailMarketing);
        return ResponseEntity.ok().build();
    }

    // 테마 설정 업데이트
    @PatchMapping("/{userId}/theme")
    public ResponseEntity<?> updateTheme(@PathVariable Long userId, @RequestBody String theme, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!isAuthorizedUser(userId, customUserDetails)) {
            return ResponseEntity.status(403).body(UNAUTHORIZED_ACCESS_MESSAGE);
        }
        userSettingsService.updateTheme(userId, theme);
        return ResponseEntity.ok().build();
    }

    // 언어 설정 업데이트
    @PatchMapping("/{userId}/language")
    public ResponseEntity<?> updateLanguage(@PathVariable Long userId, @RequestBody String language, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!isAuthorizedUser(userId, customUserDetails)) {
            return ResponseEntity.status(403).body(UNAUTHORIZED_ACCESS_MESSAGE);
        }
        userSettingsService.updateLanguage(userId, language);
        return ResponseEntity.ok().build();
    }

    // 인증된 사용자와 요청한 사용자가 일치하는지 확인
    private boolean isAuthorizedUser(Long userId, CustomUserDetails customUserDetails) {
        Long authenticatedUserId = customUserDetails.getUser().getId();
        return authenticatedUserId.equals(userId);
    }
}
