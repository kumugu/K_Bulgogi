package com.bulgogi.service;

import com.bulgogi.dto.UserRequestDTO;
import com.bulgogi.model.User;
import com.bulgogi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new RuntimeException("이미 존재하는 사용자명입니다.");
        }

        User user = new User();
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));

        userRepository.save(user);
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
