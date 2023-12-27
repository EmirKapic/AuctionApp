package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;

public interface OAuth2FacebookService {
    LoginResponse authenticateWithEmail(String email);
}
