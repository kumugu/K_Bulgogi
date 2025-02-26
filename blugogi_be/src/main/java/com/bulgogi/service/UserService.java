package com.bulgogi.service;

import com.bulgogi.model.User;
import com.bulgogi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = getUserByUsername(username);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("기존 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // 사용자 이름으로 사용자 조회 후 비밀번호 검증
    public boolean authenticate(String username, String password) {
        // 사용자 이름으로 User 조회
        User user = userRepository.findByUsername(username).orElse(null);
        // 사용자가 없으면 인증 실패
        if (user == null) {
            return false;
        }
        // BCrypt로 비밀번호 비교
        return passwordEncoder.matches(password, user.getPassword());
    }
}
