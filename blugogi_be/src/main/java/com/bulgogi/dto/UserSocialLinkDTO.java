package com.bulgogi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSocialLinkDTO {
    private Long id;
    private String socialPlatform;
    private String url;

    public UserSocialLinkDTO() {}

    public UserSocialLinkDTO(Long id) {
        this.id = id;
    }

    public UserSocialLinkDTO(Long id, String socialPlatform, String url) {
        this.id = id;
        this.socialPlatform = socialPlatform;
        this.url = url;
    }
}
