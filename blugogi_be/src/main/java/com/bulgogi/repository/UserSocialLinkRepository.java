package com.bulgogi.repository;

import com.bulgogi.model.UserSocialLink;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSocialLinkRepository extends JpaRepository<UserSocialLink, Long> {

    // 사용자에 대한 소셜 링크 리스트 조회
    @Query("SELECT u FROM UserSocialLink u WHERE u.userSettings.user.id = :userId")
    List<UserSocialLink> findByUserSettingsUserId(@Param("userId") Long userId);

    // 사용자에 대한 특정 소셜 링크 삭제
    @Modifying
    @Transactional
    @Query("DELETE FROM UserSocialLink u WHERE u.userSettings.user.id = :userId AND u.socialPlatform = :socialPlatform")
    void deleteSocialLink(@Param("userId") Long userId, @Param("socialPlatform") String socialPlatform);
}
