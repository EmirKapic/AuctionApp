package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class RegisterServiceImpl implements RegisterService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean registerUser(User user) {
        if (!validateEmail(user.getEmail()))
            return false;
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try{
            userRepository.save(user);
            return true;
        }
        catch(DataIntegrityViolationException exception){
            System.out.println("email already exists");
            return false;
        }
    }


    private boolean validateEmail(String email){
        Pattern pattern = Pattern.compile("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");
        return pattern.matcher(email).matches();
    }
}
