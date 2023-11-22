package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;

public interface JwtService {
    String createToken(User user);

    Claims resolveClaims(String token) throws JwtException;

    String extractToken(String bearerToken);

    boolean validateExpiration(Claims claims);

    String getEmail(Claims claims);

}
