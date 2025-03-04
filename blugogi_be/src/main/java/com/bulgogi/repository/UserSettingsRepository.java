package com.bulgogi.repository;

import com.bulgogi.model.UserSettings;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    // 사용자 설정
    Optional<UserSettings> findByUserId(Long userId);

    void deleteByUserId(Long userId);

    // 자기소개 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE UserSettings u SET u.bio = :bio WHERE u.user.id = :userId")
    void updateBio(@Param("userId") Long userId, @Param("bio") String bio);

    // 이메일 마케팅 알림 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE UserSettings u SET u.emailMarketing = :emailMarketing WHERE u.user.id = :userId")
    void updateEmailMarketing(@Param("userId") Long userId, @Param("emailMarketing") boolean emailMarketing);

    // 이메일 게시글 알림 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE UserSettings u SET u.emailPostNotifications = :emailPostNotifications WHERE u.user.id = :userId")
    void updateEmailPostNotifications(@Param("userId") Long userId, @Param("emailPostNotifications") boolean emailPostNotifications);

    // 이메일 댓글 알림 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE UserSettings u SET u.emailCommentNotifications = :emailCommentNotifications WHERE u.user.id = :userId")
    void updateEmailCommentNotifications(@Param("userId") Long userID, @Param("emailCommentNotifications") boolean emailCommentNotifications);

    // 테마 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE UserSettings u SET u.theme = :theme WHERE u.user.id = :userId")
    void updateTheme(@Param("userId") Long userId, @Param("theme") String theme);

    // 언어 설정 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE UserSettings u SET  u.language = :language WHERE u.user.id = :userId")
    void updateLanguage(@Param("userId") Long userId, @Param("language") String language);
}
