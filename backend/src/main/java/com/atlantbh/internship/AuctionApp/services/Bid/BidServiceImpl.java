package com.atlantbh.internship.AuctionApp.services.Bid;

import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.BidRepository;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BidServiceImpl implements BidService{
    private final BidRepository bidRepository;
    private final AuctionUserDetailsService userDetailsService;
    private final ProductRepository productRepository;
    @Override
    public Page<Bid> getBidsByUser(long userId, Pageable pageable) {
        return bidRepository.findAllByBidderId(userId, pageable);
    }

    @Override
    public Optional<Bid> makeNewBid(double bid, long productId) {
        User user = userDetailsService.getCurrentUser();
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()){
            return Optional.empty();
        }
        Bid newBid = new Bid(0, bid, Instant.now(), user, product.get());
        return Optional.of(bidRepository.save(newBid));
    }
}
