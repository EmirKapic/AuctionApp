package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuth2ServiceImpl implements OAuth2Service{
    private final AuctionUserDetailsService userDetailsService;
    private final UserRepository userRepository;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    @Override
    public Optional<User> findUser(String email) {
        try{
            User user = userDetailsService.loadUserByUsername(email);
            return Optional.of(user);
        }catch (Exception e){
            return Optional.empty();
        }
    }

    @Override
    public User createUser(String email) {
        User user = new User(email, "ROLE_USER", "oauth");
        return userRepository.save(user);
    }

    @Override
    public Optional<String> extractEmail(String token) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null){
                GoogleIdToken.Payload payload = idToken.getPayload();
                return Optional.of(payload.getEmail());
            }
            else return Optional.empty();
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
