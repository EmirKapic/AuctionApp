package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;

import java.util.Optional;

public interface RegisterService {
    Optional<User> registerUser(User user);
}
