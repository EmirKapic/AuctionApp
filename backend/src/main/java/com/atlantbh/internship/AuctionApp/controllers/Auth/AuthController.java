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
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
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
    private final OAuth2Service oAuth2Service;



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
        catch(ExpiredJwtException exception){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("Token expired or not valid."));
        }
    }

    @GetMapping("/login/oauth2/{provider}")
    ResponseEntity oAuth2Login(String googleToken) {
        Optional<String> userEmail = oAuth2Service.extractEmail(googleToken);

        if (userEmail.isEmpty()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Bad token"));
        }

        User user = oAuth2Service.findUser(userEmail.get())
                .orElseGet(() -> oAuth2Service.createUser(userEmail.get()));

        String jwtToken = jwtService.createToken(user);
        return ResponseEntity.ok().body(new LoginResponse(user, jwtToken));
    }
}
