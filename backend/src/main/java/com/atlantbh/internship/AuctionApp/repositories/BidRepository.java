package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Bid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;

public interface BidRepository extends JpaRepository<Bid, Long> {
    Page<Bid> findAllByBidderId(long bidderId, Pageable pageable);
    /* these 2 below could be written as one query if i write it myself but this way hibernate does everything :)*/
    Page<Bid> findAllByProduct_UserIdAndProduct_DateEndAfter(long sellerId, Pageable pageable, Instant date);
    Page<Bid> findAllByProduct_UserIdAndProduct_DateEndBefore(long sellerId, Pageable pageable, Instant date);
}
