package com.atlantbh.internship.AuctionApp.services.User;

import com.atlantbh.internship.AuctionApp.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User getUser(String email);
}
