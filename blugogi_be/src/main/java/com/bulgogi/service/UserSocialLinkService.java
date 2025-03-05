package com.bulgogi.service;

import com.bulgogi.dto.UserSocialLinkDTO;
import com.bulgogi.model.User;
import com.bulgogi.model.UserSocialLink;
import com.bulgogi.repository.UserRepository;
import com.bulgogi.repository.UserSocialLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserSocialLinkService {

    private final UserSocialLinkRepository userSocialLinkRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserSocialLinkService(UserSocialLinkRepository userSocialLinkRepository, UserRepository userRepository) {
        this.userSocialLinkRepository = userSocialLinkRepository;
        this.userRepository = userRepository;
    }

    // 사용자 소셜 링크 리스트 조회
    public List<UserSocialLinkDTO> getSocialLinksByUserId(Long userId) {
        List<UserSocialLink> socialLinks = userSocialLinkRepository.findByUserId(userId);
        List<UserSocialLinkDTO> dtos = new ArrayList<>();

        for (UserSocialLink link : socialLinks) {
            UserSocialLinkDTO dto = new UserSocialLinkDTO(
                    link.getId(),
                    link.getSocialPlatform(),
                    link.getUrl()
            );
            dtos.add(dto);
        }
        return dtos;
    }

    // 사용자 소셜 링크 삭제
    @Transactional
    public void deleteSocialLink(Long userId, String socialPlatform) {
        Optional<User> user = userRepository.findById(userId);
        userSocialLinkRepository.deleteByUserIdAndSocialPlatform(userId, socialPlatform);
    }

    // 사용자 소셜 링크 추가
    @Transactional
    public UserSocialLink addSocialLink(Long userId, String socialPlatform, String url) {
        // user.id 가져오기
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("UserSettings not found for userId: " + userId));

        System.out.println("Found User ID: " + user.getId());

        // UserSocialLink 생성 및 저장
        UserSocialLink userSocialLink = UserSocialLink.builder()
                .user(user)
                .socialPlatform(socialPlatform)
                .url(url)
                .build();

        return userSocialLinkRepository.save(userSocialLink);
    }


    // 사용자 소셜 링크 수정
    @Transactional
    public UserSocialLink updateSocialLink(Long userId, String socialPlatform, String newUrl) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("UserSettings not found for userId: " + userId));

        System.out.println("Found User ID: " + user.getId());

        UserSocialLink userSocialLink = userSocialLinkRepository.findByUserId(userId)
                .stream()
                .filter(link -> link.getSocialPlatform().equals(socialPlatform))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Social link not found"));

        userSocialLink.setUrl(newUrl);
        return userSocialLinkRepository.save(userSocialLink);
    }
}
