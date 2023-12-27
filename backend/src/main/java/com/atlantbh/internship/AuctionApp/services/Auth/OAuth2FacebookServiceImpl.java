package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuth2FacebookServiceImpl implements OAuth2FacebookService{
    private final UserRepository userRepository;
    private final JwtService jwtService;
    @Override
    public LoginResponse authenticateWithEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmailEquals(email);
        User user = userOpt.orElseGet(() -> userRepository.save(new User(email, "ROLE_USER", "oauth")));
        String jwtToken = jwtService.createToken(user);
        return new LoginResponse(user, jwtToken);
    }
}
