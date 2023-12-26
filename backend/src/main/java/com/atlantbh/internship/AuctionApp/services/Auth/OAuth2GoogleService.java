package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface OAuth2GoogleService {
    LoginResponse authenticateWithToken(String googleToken) throws GeneralSecurityException, IOException;
}
