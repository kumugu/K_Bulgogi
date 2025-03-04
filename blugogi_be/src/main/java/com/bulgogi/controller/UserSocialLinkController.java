package com.bulgogi.controller;

import com.bulgogi.dto.SocialLinkRequest;
import com.bulgogi.model.UserSocialLink;
import com.bulgogi.security.CustomUserDetails;
import com.bulgogi.service.UserSocialLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/socialLink")
public class UserSocialLinkController {

    private UserSocialLinkService userSocialLinkService;

    @Autowired
    public UserSocialLinkController(UserSocialLinkService userSocialLinkService) {
        this.userSocialLinkService = userSocialLinkService;
    }

    // 사용자 소셜 링크 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<UserSocialLink>> getSocialLinks(
            @PathVariable Long userId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        if (!customUserDetails.getUser().getId().equals(userId)) {
            throw new SecurityException("You can only access your own social links");
        }
        List<UserSocialLink> socialLinks = userSocialLinkService.getSocialLinksByUserId(userId);
        if (socialLinks.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(socialLinks, HttpStatus.OK);
    }

    // 사용자 소셜 링크 추가
    @PostMapping("/{userId}")
    public ResponseEntity<UserSocialLink> addSocialLink(
            @PathVariable Long userId,
            @RequestBody SocialLinkRequest request,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        // 인증된 사용자 ID와 비교
        if (!customUserDetails.getUser().equals(userId)) {
            throw new SecurityException("You can only social links to your own profile");
        }

        UserSocialLink newSocialLink = userSocialLinkService.addSocialLink(userId, request.getSocialPlatform(), request.getUrl());
        return new ResponseEntity<>(newSocialLink, HttpStatus.CREATED);
    }

    // 사용자 소셜 링크 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteSocialLink(
            @PathVariable Long userId,
            @RequestParam String socialPlatform,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        // 인증된 사용자 ID와 비교
        if (!customUserDetails.getUser().getId().equals(userId)) {
            throw new SecurityException("You can only social links to your own profile");
        }

        userSocialLinkService.deleteSocialLink(userId, socialPlatform);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
