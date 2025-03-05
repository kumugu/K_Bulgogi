package com.bulgogi.service;

import com.bulgogi.dto.UserRequestDTO;
import com.bulgogi.model.User;
import com.bulgogi.model.UserSettings;
import com.bulgogi.repository.UserRepository;
import com.bulgogi.repository.UserSettingsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void register(UserRequestDTO userRequestDTO) { // static 제거
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new RuntimeException("이미 존재하는 사용자명입니다.");
        }

        // 1. users 테이블에 저장
        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));

        User savedUser = userRepository.save(user); // 정상 호출 가능

        // 2. user_settings 테이블에 기본 설정 저장
        UserSettings userSettings = UserSettings.builder()
                .user(savedUser)  // 외래키 연결
                .bio("")  // 기본값 설정 (빈 문자열)
                .theme("light")  // 기본 테마
                .language("en")  // 기본 언어 설정
                .emailMarketing(true)  // 마케팅 이메일 수신 (기본값: true)
                .emailPostNotifications(true)  // 게시글 알림 여부 (기본값: true)
                .emailCommentNotifications(true)  // 댓글 알림 여부 (기본값: true)
                .build();

        userSettingsRepository.save(userSettings); // 정상 호출 가능
    }

    public String login(UserRequestDTO userRequestDTO) {
        User user = userRepository.findByUsername(userRequestDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(userRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        // JWT 발급 (추후 추가)
        return "로그인 성공 (JWT 토큰 발급 예정)";
    }
}
