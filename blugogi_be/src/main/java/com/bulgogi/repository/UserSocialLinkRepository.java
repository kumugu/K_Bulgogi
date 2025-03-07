package com.bulgogi.repository;

import com.bulgogi.model.UserSocialLink;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSocialLinkRepository extends JpaRepository<UserSocialLink, Long> {

    // 사용자에 대한 소셜 링크 리스트 조회
    @Query("SELECT u FROM UserSocialLink u WHERE u.user.id = :userId")
    List<UserSocialLink> findByUserId(@Param("userId") Long userId);

    // 사용자에 대한 특정 소셜 링크 삭제
    @Modifying
    @Transactional
    @Query("DELETE FROM UserSocialLink u WHERE u.user.id = :userId AND u.socialPlatform = :socialPlatform")
    void deleteByUserIdAndSocialPlatform(@Param("userId") Long userId, @Param("socialPlatform") String socialPlatform);

    // userId와 SocialPlatform을 동시에 검색하는 메서드
    Optional<UserSocialLink> findByUserIdAndSocialPlatform(Long userId, String socialPlatform);
}
