package com.atlantbh.internship.AuctionApp.controllers.Auth;

import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.MessageResponse;
import com.atlantbh.internship.AuctionApp.dtos.login.LoginRequest;
import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;
import com.atlantbh.internship.AuctionApp.dtos.register.RegisterRequest;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.services.Auth.JwtService;
import com.atlantbh.internship.AuctionApp.services.Auth.OAuth2Service;
import com.atlantbh.internship.AuctionApp.services.Auth.RegisterService;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RegisterService registerService;
    private final AuctionUserDetailsService userDetailsService;
    @Autowired
    @Qualifier("google")
    private OAuth2Service oAuth2GoogleService;
    @Autowired
    @Qualifier("facebook")
    private  OAuth2Service oAuth2FacebookService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest request){
        try{
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
            User user = userDetailsService.loadUserByUsername(authentication.getName());
            if (!user.getAuthenticationMethod().equals("credentials"))
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("This account does not use password for login."));
            String token = jwtService.createToken(user);
            return ResponseEntity.ok(new LoginResponse(user, token));
        }
        catch(AuthenticationException exception){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Could not log in"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequest request){
        User user = new User(request.email(), request.password(), request.firstName(), request.lastName(), "credentials");
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
        catch(Exception exception){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("Token expired or not valid."));
        }
    }

    @GetMapping("/login/oauth2/google")
    ResponseEntity oAuth2GoogleLogin(String googleToken) {
        try {
            return ResponseEntity.ok().body(oAuth2GoogleService.authenticate(googleToken));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/login/oauth2/facebook")
    ResponseEntity oAuth2FacebookLogin(String facebookToken){
        try{
            return ResponseEntity.ok().body(oAuth2FacebookService.authenticate(facebookToken));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
