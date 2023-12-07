package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Bid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("""
            select b from Bid b
            where b.bid =
                (select max(b1.bid)
                from Bid b1
                where b1.product.id = b.product.id)
           and(:bidderEmail is null or :bidderEmail = b.bidder.email)
           and(:productId is null or b.product.id = :productId)
            """)
    Page<Bid> findAllBids(@Param("bidderEmail") String bidderEmail,
            @Param("productId") Long productId,
            Pageable pageable);
}
