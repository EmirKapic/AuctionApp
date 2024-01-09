package com.atlantbh.internship.AuctionApp.services.User;

import com.atlantbh.internship.AuctionApp.dtos.user.UserUpdateRequest;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.projections.ProductBid;
import com.atlantbh.internship.AuctionApp.projections.ProductBidCount;
import com.atlantbh.internship.AuctionApp.repositories.BidRepository;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import com.atlantbh.internship.AuctionApp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
@Transactional
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
        List<ProductBidCount> productCountsBeforeRemove = bidRepository.findCountOfUserBidOnProducts(userId);

        for (ProductBidCount pbCount : productCountsBeforeRemove){
            pbCount.getProduct().setNumberOfBids((int)(pbCount.getProduct().getNumberOfBids() - pbCount.getCount()));
            if (pbCount.getProduct().getNumberOfBids() == 0){
                pbCount.getProduct().setHighestBid(null);
            }
        }

        List<Product> products =  productCountsBeforeRemove.stream()
                        .filter(pb -> pb.getProduct().getNumberOfBids() > 0)
                        .map(pb -> pb.getProduct())
                        .toList();
        bidRepository.deleteAllByBidder_Id(userId);

        List<Long> productIds = products.stream().map(p -> p.getId()).toList();

        List<ProductBid> highestBids = bidRepository.findHighestBidForProducts(productIds);

        for (Product p : products){
            Double highestBid = highestBids.stream()
                    .filter(pb -> pb.getProduct().getId() == p.getId())
                    .map(pb -> pb.getBid()).toList().get(0);

            p.setHighestBid(highestBid);
        }

        List<Product> allUserProducts = productCountsBeforeRemove.stream().map(pb -> pb.getProduct()).toList();
        productRepository.saveAll(allUserProducts);
        userRepository.deleteById(userId);
    }
}
