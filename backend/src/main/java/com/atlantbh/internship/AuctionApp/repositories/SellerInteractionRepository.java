package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.UserSellerInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerInteractionRepository extends JpaRepository<UserSellerInteraction, Long> {
    List<UserSellerInteraction> findAllBySeller_IdAndUser_Id(long sellerId, long userId);
}
