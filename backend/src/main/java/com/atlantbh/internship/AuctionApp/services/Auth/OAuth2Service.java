package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;

import java.util.Optional;

public interface OAuth2Service {
    Optional<User> findUser(String email);
    User createUser(String email);
    Optional<String> extractEmail(String token);
}
