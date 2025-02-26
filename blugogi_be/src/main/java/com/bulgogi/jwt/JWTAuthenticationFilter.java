package com.bulgogi.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@WebFilter("/api/*")  // 필터가 적용될 경로를 설정
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTTokenUtil jwtTokenUtil;

    public JWTAuthenticationFilter(JWTTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // HTTP 헤더에서 "Authorization" 값 추출
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            // "Bearer " 이후의 JWT 토큰 추출
            String token = header.substring(7);
            String username = null;

            try {
                // 토큰에서 사용자 이름 추출
                username = jwtTokenUtil.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    if (jwtTokenUtil.validateToken(token, username)) {
                        // 유효한 토큰일 경우 인증을 처리
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, null);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            } catch (ExpiredJwtException e) {
                // 만료된 토큰 처리
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 만료되었습니다.");
                return;
            }
        }

        filterChain.doFilter(request, response);  // 다음 필터로 이동
    }

}
