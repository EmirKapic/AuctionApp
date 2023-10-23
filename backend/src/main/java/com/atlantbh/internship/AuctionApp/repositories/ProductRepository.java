package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "FROM Product where dateStart < current date and dateEnd > current date ORDER BY RANDOM() LIMIT 1")
    Product getRandom();

    /**
     * Both parameters should be set to Instant.now(). It must be done this way
     * because spring jpa wont allow passing Instant.now() directly
     */
    Page<Product> findAllByDateEndAfterAndDateStartBefore(Pageable pageable, Instant today1, Instant today2);
}
