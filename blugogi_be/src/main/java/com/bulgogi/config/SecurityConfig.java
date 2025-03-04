package com.bulgogi.config;

import com.bulgogi.jwt.JWTAuthenticationFilter;
import com.bulgogi.jwt.JWTTokenUtil;
import com.bulgogi.security.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter(JWTTokenUtil jwtTokenUtil, UserDetailsServiceImpl userDetailsService) {
        return new JWTAuthenticationFilter(jwtTokenUtil, userDetailsService);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 보호 비활성화
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // CORS 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/register", "/api/v1/auth/login").permitAll()  // 회원가입, 로그인은 누구나 접근 가능
                        .requestMatchers("/api/v1/socialLink/**").permitAll()
                        .requestMatchers("/api/v1/users/profile").authenticated()  // 프로필은 인증된 사용자만
                        .requestMatchers("/api/v1/userSettings/**").hasAuthority("USER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/posts/**").permitAll()  // 게시글 조회는 누구나 접근 가능
                        .anyRequest().authenticated()  // 나머지 요청은 인증 필요
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  // JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 추가

        return http.build();  // Spring Security 6.x에서 SecurityFilterChain 빌드 시 .build() 호출 필요
    }

    @Bean
    public UserDetailsService userDetailsService(UserDetailsServiceImpl userDetailsService) {
        return userDetailsService;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));  // React 앱에서 오는 요청 허용
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);  // 자격 증명 포함 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // 모든 경로에 CORS 설정 적용
        return source;
    }
}
