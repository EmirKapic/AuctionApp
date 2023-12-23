package com.atlantbh.internship.AuctionApp.services.Bid;

import com.atlantbh.internship.AuctionApp.exceptions.AuthorizationException;
import com.atlantbh.internship.AuctionApp.exceptions.EntityNotFoundException;
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

import java.util.Optional;

@Service
@AllArgsConstructor
public class BidServiceImpl implements BidService {
    private final BidRepository bidRepository;
    private final AuctionUserDetailsService userDetailsService;
    private final ProductRepository productRepository;

    @Override
    public Page<Bid> getBids(BidParameters params, Pageable pageable) {
        return bidRepository.findAllBids(userDetailsService.getCurrentUserEmail(), params.productId(), pageable);
    }

    @Override
    public Page<Bid> getProductBids(Pageable pageable, long productId) throws EntityNotFoundException, AuthorizationException {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()){
            throw new EntityNotFoundException("No product with id : " + productId + " found.");
        }
        if (!product.get().getUser().getEmail().equals(userDetailsService.getCurrentUserEmail())){
            throw new AuthorizationException("Only the product owner can view its bids.");
        }
        return bidRepository.findAllByProduct_User_EmailAndProduct_Id(
                userDetailsService.getCurrentUserEmail(), productId, pageable);
    }


    @Override
    public Optional<Bid> makeNewBid(double bid, long productId) {
        User user = userDetailsService.getCurrentUser();
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty() || !validBidAmount(bid, product.get().getHighestBid(), product.get().getStartBid())) {
            return Optional.empty();
        }
        Product prod = product.get();

        prod.setHighestBid(bid);
        prod.setNumberOfBids(prod.getNumberOfBids() + 1);
        Product updatedProduct = productRepository.save(prod);

        return Optional.of(bidRepository.save(new Bid(bid, user, updatedProduct)));
    }

    private boolean validBidAmount(double bid, Double highestBid, double startBid) {
        return highestBid != null ? bid > highestBid : bid > startBid;
    }
}
