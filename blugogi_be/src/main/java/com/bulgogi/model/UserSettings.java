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

    private String bio;
    private String theme;
    private String language;
    private boolean emailPost;
    private boolean emailComment;
    private boolean emailMarketing;

    public UserSettings(User user) {
        this.user = user;
        this.bio = "";
        this.theme = "light";
        this.language = "en";
        this.emailPost = false;
        this.emailComment = false;
        this.emailMarketing = false;
    }
}
