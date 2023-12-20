package com.atlantbh.internship.AuctionApp.services.User;

import com.atlantbh.internship.AuctionApp.dtos.user.UserUpdateRequest;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public User getCurrentUser() {
        return loadUserByUsername(getCurrentUserEmail());
    }

    public String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public boolean isAuthenticated() {
        return !getCurrentUserEmail().equals("anonymousUser");
    }

    public User updateUser(UserUpdateRequest request, User user){
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setAddress(request.address());
        user.setCity(request.city());
        user.setZipCode(request.zip());
        user.setCountry(request.country());
        user.setDateOfBirth(request.dateOfBirth());
        user.setCreditCard(request.creditCard());
        user.setPhoneNumber(request.phoneNumber());
        user.setPhotoUrl(request.photoUrl());
        return userRepository.save(user);
    }
}
