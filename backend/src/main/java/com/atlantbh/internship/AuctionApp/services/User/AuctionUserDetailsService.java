package com.atlantbh.internship.AuctionApp.services.User;

import com.atlantbh.internship.AuctionApp.dtos.user.UserUpdateRequest;
import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.BidRepository;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AuctionUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final BidRepository bidRepository;
    private final ProductRepository productRepository;

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

    public void deleteUser(long userId){
        userRepository.deleteById(userId);
        removeUserBids(userId);
    }

    private void removeUserBids(long userId){
        List<Bid> userBids = bidRepository.findAllByBidder_Id(userId);
        for (Bid b : userBids){
            if (Double.compare(b.getProduct().getHighestBid(),b.getBid()) == 0){
                removeHighestBid(b.getProduct().getId(), b.getId());
            }
        }
        bidRepository.deleteAllByBidder_Id(userId);
    }

    private void removeHighestBid(long productId, long highestBidId){
        Product product = productRepository.findById(productId).get();
        bidRepository.deleteById(highestBidId);
        Optional<Bid> secondHighest = bidRepository.findFirstByProduct_IdOrderByBidDesc(productId);
        if (secondHighest.isPresent()){
            product.setHighestBid(secondHighest.get().getBid());
        }
        else{
            product.setHighestBid(null);
        }
        product.setNumberOfBids(product.getNumberOfBids() - 1);
        productRepository.save(product);
    }
}
