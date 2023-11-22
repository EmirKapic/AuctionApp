package com.atlantbh.internship.AuctionApp.services.Auth;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegisterServiceImpl implements RegisterService{
    private final UserRepository userRepository;

    @Override
    public boolean registerUser(User user) {
        try{
            userRepository.save(user);
            return true;
        }
        catch(DataIntegrityViolationException exception){
            System.out.println("email already exists");
            return false;
        }
    }
}
