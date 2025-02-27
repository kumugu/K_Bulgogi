package com.bulgogi.jwt;

import com.bulgogi.security.CustomUserDetails;
import com.bulgogi.security.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;

    // 생성자 주입
    public JWTAuthenticationFilter(JWTTokenUtil jwtTokenUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                String username = jwtTokenUtil.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // userDetailsService를 통해 사용자 정보를 로드
                    CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
                    // 사용자 인증 객체 생성
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    // 인증 정보를 SecurityContext에 설정
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (ExpiredJwtException e) {
                // 토큰 만료 처리
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 만료되었습니다.");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

}
