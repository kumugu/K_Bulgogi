package com.bulgogi.security;

import com.bulgogi.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(() -> user.getRole());  // 사용자 권한 반환
    }

    @Override
    public String getPassword() {
        return user.getPassword();  // 비밀번호 반환
    }

    @Override
    public String getUsername() {
        return user.getUsername();  // 사용자명 반환
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // 계정이 만료되지 않음
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // 계정이 잠겨있지 않음
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // 비밀번호가 만료되지 않음
    }

    @Override
    public boolean isEnabled() {
        return true;  // 계정이 활성화됨
    }

    public User getUser() {
        return user;  // 실제 User 객체를 반환 (필요한 경우)
    }
}
