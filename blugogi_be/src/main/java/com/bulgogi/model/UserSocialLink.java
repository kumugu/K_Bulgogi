package com.bulgogi.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_social_link")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSocialLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String socialPlatform;

    @Column(nullable = false)
    private String url;
}
