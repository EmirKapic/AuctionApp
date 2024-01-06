package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.projections.MaxMinPrice;
import com.atlantbh.internship.AuctionApp.projections.ProductBucket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
        @Query("""
                        from Product
                        where dateStart <= current_timestamp and dateEnd > current_timestamp
                                and user.email <> :userEmail
                                and purchased=false
                        order by RANDOM() LIMIT 1
                        """)
        Product getRandom(String userEmail);

        @Query("""
                        from Product where (:categoryId is null or :categoryId = subCategory.category.id )
                        and (:subcategories is null or subCategory.id in :subcategories)
                        and (:name is null or name ilike concat('%', :name, '%'))
                        and (:sellerId is null or user.id = :sellerId)
                        and (:excludedSeller is null or user.email <> :excludedSeller)
                        and (:minPrice is null or :minPrice <= greatest(highestBid, startBid))
                        and (:maxPrice is null or :maxPrice >= greatest(highestBid, startBid))
                        and
                            case
                                when :active = true then (dateStart <= current_timestamp and dateEnd > current_timestamp and purchased=false)
                                when :active = false then (dateEnd < current_timestamp)
                                else true
                            end
                        """)
        Page<Product> getAll(Pageable pageable,
                        @Param("categoryId") Long categoryId,
                        @Param("subcategories") List<Long> subcategories,
                        @Param("name") String name,
                        @Param("sellerId") Long sellerId,
                        @Param("active") Boolean active,
                        @Param("excludedSeller") String excludedSeller,
                        @Param("minPrice") Double minPrice,
                        @Param("maxPrice") Double maxPrice);

        @Query("""
                        from Product where (:categoryId is null or :categoryId = subCategory.category.id )
                        and (:subcategories is null or subCategory.id in :subcategories)
                        and (:name is null or levenshtein(upper(name),upper(:name)) <= 3)
                        and (dateStart<= current_timestamp and dateEnd > current_timestamp)
                        and purchased=false
                        order by levenshtein(upper(name), upper(:name))""")
        Page<Product> getAllActiveApproximate(Pageable pageable,
                        @Param("categoryId") Long categoryId,
                        @Param("subcategories") List<Long> subcategories,
                        @Param("name") String name);

        @Query(value = """
                        select * from
                                (select product.*
                                 from Product as product
                                 join user_subcategory_interaction as subInteraction on subInteraction.subcategory_id=product.subcategory_id
                                 join user_seller_interaction as sellerInteraction on sellerInteraction.seller_id = product.seller_id
                                 where subInteraction.user_id = :userId and sellerInteraction.user_id = :userId
                                         and product.purchased = false
                                         and product.date_start <= current_timestamp
                                         and product.date_end > current_timestamp
                                         and product.seller_id <> :userId
                                 order by ((subInteraction.views * case
                                                                         when subInteraction.last_interacted_with < current_date - interval '2 months' then 1
                                                                         else (abs(cast(subInteraction.last_interacted_with as date) -
                                                                                 cast(current_date as date))*(-1./30)) + 3
                                                                      end)
                                         + (sellerInteraction.views * case
                                                                         when sellerInteraction.last_interacted_with < current_date - interval '2 months' then 1
                                                                         else (abs(cast(sellerInteraction.last_interacted_with as date) -
                                                                                 cast(current_date as date))*(-1./30)) + 3
                                                                      end)) desc
                                 limit 15) as temp
                         order by RANDOM()
                         limit 3
                         """, nativeQuery = true)
        List<Product> getRecommendedProducts(@Param("userId") long userId);

        @Query("""
                        from Product
                        where dateStart < current_timestamp
                                and dateEnd > current_timestamp
                                and purchased=false
                                and :sellerEmail <> user.email
                        order by RANDOM()
                        limit 3""")
        List<Product> findTop3ByRandom(String sellerEmail);

        @Query("""
                 select max(startBid) as max, min(startBid) as min
                 from Product
                 where (:categoryId is null or :categoryId = subCategory.category.id )
                        and (:subcategories is null or subCategory.id in :subcategories)
                        and (:name is null or name ilike concat('%', :name, '%'))
                        and (:sellerId is null or user.id = :sellerId)
                        and (:excludedSeller is null or user.email <> :excludedSeller)
                        and (:minPrice is null or :minPrice <= greatest(highestBid, startBid))
                        and (:maxPrice is null or :maxPrice >= greatest(highestBid, startBid))
                        and
                            case
                                when :active = true then (dateStart <= current_timestamp and dateEnd > current_timestamp and purchased=false)
                                when :active = false then (dateEnd < current_timestamp)
                                else true
                            end
                 """)
        MaxMinPrice getMaxMinPrice(@Param("categoryId") Long categoryId,
                                   @Param("subcategories") List<Long> subcategories,
                                   @Param("name") String name,
                                   @Param("sellerId") Long sellerId,
                                   @Param("active") Boolean active,
                                   @Param("excludedSeller") String excludedSeller,
                                   @Param("minPrice") Double minPrice,
                                   @Param("maxPrice") Double maxPrice);

        @Query(value = """
                       select count(*), t.bucket_number as bucketNumber
                       from (select p.name, floor(((p.start_bid - :oldMin) * :numberOfBuckets) / :maxMinDiff) as bucket_number
                                from product p join sub_category as s on s.id=p.subcategory_id
                                                join app_user u on p.seller_id = u.id
                                               where (:categoryId is null or :categoryId = s.category_id )
                                               and (:subcategories is null or s.id in (:subcategories))
                                               and (:name is null or p.name ilike concat('%', :name, '%'))
                                               and (:sellerId is null or p.seller_id = :sellerId)
                                               and (:excludedSeller is null or u.email <> :excludedSeller)
                                               and (:minPrice is null or :minPrice <= greatest(p.start_bid, p.highest_bid))
                                               and (:maxPrice is null or :maxPrice >= greatest(p.start_bid, p.highest_bid))
                                               and
                                                   case
                                                       when :active = true then (p.date_start <= current_timestamp and p.date_end > current_timestamp and purchased=false)
                                                       when :active = false then (p.date_end < current_timestamp)
                                                       else true
                                                   end) as t
                       group by t.bucket_number
                       """, nativeQuery = true)
        List<ProductBucket> getProductBuckets(
                                                @Param("maxMinDiff")Double maxMinDiff,
                                                @Param("oldMin") Double oldMin,
                                                @Param("numberOfBuckets") Integer numberOfBuckets,
                                                @Param("categoryId") Long categoryId,
                                                @Param("subcategories") List<Long> subcategories,
                                                @Param("name") String name,
                                                @Param("sellerId") Long sellerId,
                                                @Param("active") Boolean active,
                                                @Param("excludedSeller") String excludedSeller,
                                                @Param("minPrice") Double minPrice,
                                                @Param("maxPrice") Double maxPrice
                                                );
}
