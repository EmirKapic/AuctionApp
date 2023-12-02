package com.atlantbh.internship.AuctionApp.services.Bid;

import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.repositories.BidRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BidServiceImpl implements BidService{
    private final BidRepository bidRepository;
    @Override
    public Page<Bid> getBidsByUser(long userId, Pageable pageable) {
        return bidRepository.findAllByBidderId(userId, pageable);
    }
}
