package com.bulgogi.controller;

import com.bulgogi.model.User;
import com.bulgogi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 프로필 조회 (현재 로그인된 유저)
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Principal principal) {
        User user = userService.getUserByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }

    // 비밀번호 변경
    @PutMapping("/password")
    public ResponseEntity<String> changePassword(@RequestParam String oldPassword, @RequestParam String newPassword, Principal principal) {
        userService.changePassword(principal.getName(), oldPassword, newPassword);
        return ResponseEntity.ok("비밀번호 변경 완료");
    }
}
