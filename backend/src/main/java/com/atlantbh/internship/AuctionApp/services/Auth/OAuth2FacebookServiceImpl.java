package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@Qualifier("facebook")
@RequiredArgsConstructor
public class OAuth2FacebookServiceImpl implements OAuth2Service{
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RestTemplate restTemplate;
    private final Gson gson;
    @Override
    public LoginResponse authenticate(String token) {
        String uri = "https://graph.facebook.com/me?access_token=" + token + "&fields=email";
        String resultJson = restTemplate.getForObject(uri, String.class);
        FacebookResponse response = gson.fromJson(resultJson, FacebookResponse.class);

        Optional<User> userOpt = userRepository.findByEmailEquals(response.email());
        User user = userOpt.orElseGet(() -> userRepository.save(new User(response.email(), "ROLE_USER", "oauth")));
        String jwtToken = jwtService.createToken(user);
        return new LoginResponse(user, jwtToken);
    }


    record FacebookResponse(String email, String id){}
}
