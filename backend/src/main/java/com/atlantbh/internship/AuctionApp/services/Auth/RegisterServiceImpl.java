package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import com.atlantbh.internship.AuctionApp.utilities.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RegisterServiceImpl implements RegisterService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> registerUser(User user) {
        if (!EmailValidator.validate(user.getEmail()) || userRepository.existsUserByEmail(user.getEmail()))
            return Optional.empty();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        userRepository.save(user);
        return Optional.of(user);
    }
}
