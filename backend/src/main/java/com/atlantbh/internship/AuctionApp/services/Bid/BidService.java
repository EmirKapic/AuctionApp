package com.atlantbh.internship.AuctionApp.services.Bid;

import com.atlantbh.internship.AuctionApp.exceptions.AuthorizationException;
import com.atlantbh.internship.AuctionApp.exceptions.EntityNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Bid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BidService {
    Page<Bid> getBids(BidParameters params, Pageable pageable);

    Page<Bid> getProductBids(Pageable pageable, long productId) throws EntityNotFoundException, AuthorizationException;

    Optional<Bid> makeNewBid(double bid, long productId);
}
