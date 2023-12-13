package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.UserSubcategoryInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubcategoryInteractionRepository extends JpaRepository<UserSubcategoryInteraction, Long> {
    Optional<UserSubcategoryInteraction> findBySubCategory_IdAndUser_Id(long subcategoryId, long userId);
}
