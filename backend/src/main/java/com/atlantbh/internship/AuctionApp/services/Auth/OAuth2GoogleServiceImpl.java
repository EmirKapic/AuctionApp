package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

@Service()
@Qualifier("google")
@RequiredArgsConstructor
public class OAuth2GoogleServiceImpl implements OAuth2Service {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    private String extractEmail(String token) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
        GoogleIdToken idToken = verifier.verify(token);
        GoogleIdToken.Payload payload = idToken.getPayload();
        return payload.getEmail();
    }

    @Override
    public LoginResponse authenticate(String googleToken) throws GeneralSecurityException, IOException {
        String userEmail = extractEmail(googleToken);
        Optional<User> userOpt = userRepository.findByEmailEquals(userEmail);
        User user = userOpt.orElseGet(() -> userRepository.save(new User(userEmail, "ROLE_USER", "oauth")));
        String jwtToken = jwtService.createToken(user);
        return new LoginResponse(user, jwtToken);
    }
}
