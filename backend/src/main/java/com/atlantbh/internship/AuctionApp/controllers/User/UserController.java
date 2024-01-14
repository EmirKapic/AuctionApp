package com.atlantbh.internship.AuctionApp.controllers.User;

import com.atlantbh.internship.AuctionApp.dtos.MessageResponse;
import com.atlantbh.internship.AuctionApp.dtos.user.UserUpdateRequest;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final AuctionUserDetailsService userService;

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public User updateUser(@RequestBody UserUpdateRequest request) {
        return userService.updateUser(request, userService.getCurrentUser());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable String id) {
        userService.deleteUser(Long.parseLong(id));
        return ResponseEntity.ok().body(new MessageResponse("Delete user with id: " + id));
    }
}
