package com.atlantbh.internship.AuctionApp.services.Bid;

import com.atlantbh.internship.AuctionApp.models.Bid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BidService {
    Page<Bid> getBidsByUser(long userId, Pageable pageable);

    Page<Bid> getSoldByUser(long userId, Pageable pageable);
}
