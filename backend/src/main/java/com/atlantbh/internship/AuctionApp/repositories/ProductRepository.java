package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM product ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Product findRandom();

    Page<Product> findAllByOrderByDateStartDesc(Pageable pageable);
}
