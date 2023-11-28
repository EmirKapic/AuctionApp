package com.atlantbh.internship.AuctionApp.services.User;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuctionUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmailEquals(email);
    }

}
