package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import com.atlantbh.internship.AuctionApp.services.User.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuctionUserDetailsService implements UserService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailEquals(email);
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }

    /*
     * this may seem almost the same as above however, the above method is required by spring itself
     * and it works with UserDetails instead of our User class
     * We could possibly extend UserDetails from out own user to stop this, but it would not work all too well
     */
    @Override
    public User getUser(String email) {
        return userRepository.findByEmailEquals(email);
    }
}
