package com.atlantbh.internship.AuctionApp.services.Bid;

import com.atlantbh.internship.AuctionApp.models.Bid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BidService {
    Page<Bid> getBidsByUser(long userId, Pageable pageable);

    Optional<Bid> makeNewBid(double bid, long productId);
}
