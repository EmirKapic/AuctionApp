package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubcategoryRepository extends JpaRepository<SubCategory, Long> {
    Optional<SubCategory> findByNameEqualsIgnoreCase(String subcategoryName);
}
