package com.bulgogi.dto;


public class SocialLinkRequest {
    private String socialPlatform;
    private String url;

    public SocialLinkRequest() {}

    public String getSocialPlatform() {
        return socialPlatform;
    }

    public void setSocialPlatform(String socialPlatform) {
        this.socialPlatform = socialPlatform;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
