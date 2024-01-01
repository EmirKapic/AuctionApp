package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface OAuth2Service {
    LoginResponse authenticate(String token) throws GeneralSecurityException, IOException;
}
