package com.atlantbh.internship.AuctionApp.controllers.Auth;

import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.MessageResponse;
import com.atlantbh.internship.AuctionApp.dtos.login.LoginRequest;
import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;
import com.atlantbh.internship.AuctionApp.dtos.register.RegisterRequest;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.services.Auth.JwtService;
import com.atlantbh.internship.AuctionApp.services.Auth.RegisterService;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RegisterService registerService;
    private final AuctionUserDetailsService userDetailsService;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest request){
        try{
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
            User user = userDetailsService.loadUserByUsername(authentication.getName());
            String token = jwtService.createToken(user);
            return ResponseEntity.ok(new LoginResponse(user, token));
        }
        catch(AuthenticationException exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Could not log in"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest request){
        User user = new User(request.email(), request.password(), request.firstName(), request.lastName());
        Optional<User> newUser = registerService.registerUser(user);
        if (newUser.isPresent()){
            String token = jwtService.createToken(user);
            return ResponseEntity.ok(new LoginResponse(newUser.get(), token));
        }
        else{
            return ResponseEntity.badRequest().body(new ErrorResponse("Could not create new user account"));
        }
    }

    @GetMapping("/validate")
    ResponseEntity checkTokenValidity(@RequestParam(name = "token")String token){
        try {
            jwtService.resolveClaims(token);
            return ResponseEntity.ok().body(new MessageResponse("Token is valid."));
        }
        catch(ExpiredJwtException exception){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("Token expired or not valid."));
        }
    }

    @GetMapping("/login/oauth2/{provider}")
    ResponseEntity oAuth2Login(String googleToken) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(googleToken);
        if (idToken != null){
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            System.out.println("User email: " + email);
            //sad kad izvadimo mail provjerimo dal postoji ako ne dodamo i na kraju u svakom slucaju vratimo JWT i user je sad log-inan :D
            //dodati kolonu validation "credentials/oauth"
            //U slucaju da korisnik vec postoji i pokusava se prijaviti: dopustiti prijavu sa oauth SAMO AKO je ta kolona oauth2
            //pokusava se prijaviti sa login/password dopustiti prijavu samo ako je ta kolona credentials
            //Nakon svega dodati jos i facebook
        }

        return ResponseEntity.ok().build();
    }
}
