package com.bulgogi.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private boolean emailMarketing = true;  // 마케팅 이메일 수신
    @Column(nullable = false)
    private boolean emailPostNotifications = true;  // 게시글 알림 여부
    @Column(nullable = false)
    private boolean emailCommentNotifications = true;   // 댓글 알림 여부

    @Column(length = 255)
    private String bio; // 자기소개

    @OneToMany(mappedBy = "userSettings", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UserSocialLink> socialLinks = new HashSet<>();

    @Column(nullable = false)
    private String theme = "light";

    @Column(nullable = false)
    private String language = "en";
}
