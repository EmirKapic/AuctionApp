package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.projections.ProductBid;
import com.atlantbh.internship.AuctionApp.projections.ProductBidCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

        /*
         * Realistically we should only give the top bid the bidder has on a product(if
         * he has multiple),
         * others are irrelevant.
         * In case we need the history we can create a different endpoint (although I
         * doubt it).
         */
        @Query("""
                         select b from Bid b
                         where b.bid =
                             (select max(b1.bid)
                             from Bid b1
                             where (:bidderEmail is null or b1.bidder.email = :bidderEmail)
                             and (b1.product.id = b.product.id))
                        and(:productId is null or b.product.id = :productId)
                         """)
        Page<Bid> findAllBids(@Param("bidderEmail") String bidderEmail,
                        @Param("productId") Long productId,
                        Pageable pageable);

        Optional<Bid> findFirstByProduct_IdOrderByBidDesc(long productId);

        void deleteAllByBidder_Id(long bidderId);

        @Query("""
                select p as product, count(*) as count
                from Product p join Bid b on p.id=b.product.id
                where b.bidder.id = :userId
                  and p.dateEnd > current_timestamp
                group by p
                """)
        List<ProductBidCount> findCountOfUserBidOnProducts(@Param("userId") long userId);

        @Query("""
                select max(b.bid) as bid, p as product
                from Bid b join Product p on p.id = b.product.id
                where p.id in (:productIds)
                group by p
                """)
        List<ProductBid> findHighestBidForProducts(@Param("productIds") List<Long> productIds);
}
