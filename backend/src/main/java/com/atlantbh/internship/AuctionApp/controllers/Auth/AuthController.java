package com.atlantbh.internship.AuctionApp.controllers.Auth;

import com.atlantbh.internship.AuctionApp.dtos.login.LoginRequest;
import com.atlantbh.internship.AuctionApp.dtos.login.LoginResponse;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.services.Auth.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        String email = authentication.getName();
        User user = new User();
        user.setEmail(email);
        user.setPassword("");
        String token = jwtService.createToken(user);

        return new LoginResponse(email, token);
    }
}
