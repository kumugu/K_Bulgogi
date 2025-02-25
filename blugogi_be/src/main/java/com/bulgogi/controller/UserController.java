package com.bulgogi.controller;

import com.bulgogi.model.User;
import com.bulgogi.dto.UserRequestDTO;
import com.bulgogi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRequestDTO userRequestDTO) {
        User user = userService.registerUser(userRequestDTO.getUsername(), userRequestDTO.getEmail(), userRequestDTO.getPassword());
        return ResponseEntity.ok(user);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequestDTO userRequestDTO) {
        try {
            userService.loginUser(userRequestDTO.getUsername(), userRequestDTO.getPassword());
            return ResponseEntity.ok("로그인 성공");
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("로그인 실패: " + e.getMessage());
        }
    }
}
