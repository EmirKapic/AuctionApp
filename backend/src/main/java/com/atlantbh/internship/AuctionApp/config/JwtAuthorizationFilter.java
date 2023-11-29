package com.atlantbh.internship.AuctionApp.config;

import com.atlantbh.internship.AuctionApp.services.Auth.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private static final String AUTH_HEADER = "Authorization";
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try{
            String bearerToken = request.getHeader(AUTH_HEADER);
            String token = jwtService.extractToken(bearerToken);
            if (token == null){
                filterChain.doFilter(request, response);
                return;
            }
            Claims claims = jwtService.resolveClaims(token);
            if (claims != null && jwtService.validateExpiration(claims)){
                String email = claims.getSubject();
                Authentication authentication =
                    new UsernamePasswordAuthenticationToken(email, "", new ArrayList<>(
                            List.of(new SimpleGrantedAuthority("ROLE_USER"))
                    ));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        catch (Exception exception){
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
        filterChain.doFilter(request, response);
    }
}
