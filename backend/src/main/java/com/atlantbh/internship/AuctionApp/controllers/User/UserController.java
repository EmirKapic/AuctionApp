package com.atlantbh.internship.AuctionApp.controllers.User;

import com.atlantbh.internship.AuctionApp.dtos.user.UserUpdateRequest;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final AuctionUserDetailsService userService;
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public User updateUser(@RequestBody UserUpdateRequest request){
        return userService.updateUser(request, userService.getCurrentUser());
    }
}
