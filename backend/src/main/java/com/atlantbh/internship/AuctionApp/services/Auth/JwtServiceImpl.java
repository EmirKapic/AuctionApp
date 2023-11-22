package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService{

    private final String SECRET_KEY = System.getenv("JWT_KEY");
    private final String TOKEN_PREFIX = "Bearer";
    private final long TOKEN_VALIDITY_TIME = 30*60*1000; //30minutes in ms
    @Override
    public String createToken(User user) {
        Claims claims = Jwts.claims().subject(user.getEmail()).build();
        return Jwts.builder()
                .claims(claims)
                .expiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY_TIME))
                .signWith(getSignInKey())
                .compact();
    }

    @Override
    public Claims resolveClaims(String token) throws JwtException {
        if (token != null){
            return Jwts.parser()
                    .verifyWith((SecretKey) getSignInKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        }
        return null;
    }

    @Override
    public String extractToken(String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX))
            return bearerToken.substring(TOKEN_PREFIX.length()).trim();
        return null;
    }

    @Override
    public boolean validateExpiration(Claims claims) {
        return claims.getExpiration().after(new Date());
    }

    @Override
    public String getEmail(Claims claims) {
        return claims.getSubject();
    }

    private Key getSignInKey(){
        byte[] keyBytes = this.SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
