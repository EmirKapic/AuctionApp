package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.UserSubcategoryInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryInteractionRepository extends JpaRepository<UserSubcategoryInteraction, Long> {
    List<UserSubcategoryInteraction> findAllBySubCategory_IdAndUser_Id(long subcategoryId, long userId);
}
