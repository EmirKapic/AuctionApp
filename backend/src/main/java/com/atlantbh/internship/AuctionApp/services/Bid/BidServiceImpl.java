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
        if (product.isEmpty() || !validBidAmount(bid, product.get().getHighestBid(), product.get().getStartBid())){
            return Optional.empty();
        }
        Product prod = product.get();

        prod.setHighestBid(bid);
        prod.setNumberOfBids(prod.getNumberOfBids() + 1);
        Product updatedProduct = productRepository.save(prod);

        return Optional.of(bidRepository.save(new Bid(0, bid, Instant.now(), user ,updatedProduct)));
    }

    private boolean validBidAmount(double bid, Double highestBid, double startBid){
        return highestBid != null ? bid > highestBid : bid > startBid;
    }
}
