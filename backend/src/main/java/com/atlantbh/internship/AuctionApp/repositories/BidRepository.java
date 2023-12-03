package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Bid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("""
        from Bid where (:bidderId is null or bidder.id = :bidderId)
        and (:productId is null or product.id = :productId)
        """)
    Page<Bid> findAllBids(@Param("bidderId") Long bidderId,
                          @Param("productId") Long productId,
                          Pageable pageable);
}
