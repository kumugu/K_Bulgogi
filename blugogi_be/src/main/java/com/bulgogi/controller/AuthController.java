package com.bulgogi.controller;

import com.bulgogi.dto.LoginRequest;
import com.bulgogi.dto.LoginResponse;
import com.bulgogi.dto.UserRequestDTO;
import com.bulgogi.jwt.JWTTokenUtil;
import com.bulgogi.service.AuthService;
import com.bulgogi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;
    private final JWTTokenUtil jwtTokenUtil;

    public AuthController(AuthService authService, JWTTokenUtil jwtTokenUtil, UserService userService) {
        this.authService = authService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }


    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRequestDTO userRequestDTO) {
        authService.register(userRequestDTO);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 로그인 (JWT 토큰 반환)
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // 사용자 인증 처리
        boolean isAuthenticated = userService.authenticate(username, password);

        if (!isAuthenticated) {
            return ResponseEntity.status(401).body(new LoginResponse("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다."));
        }

        // 인증 성공 시 JWT 토큰 생성
        String token = jwtTokenUtil.generateToken(username);

        // JWT 토큰을 응답으로 반환
        return ResponseEntity.ok(new LoginResponse(token));
    }
}
