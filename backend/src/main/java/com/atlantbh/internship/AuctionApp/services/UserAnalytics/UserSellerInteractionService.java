package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.models.UserSellerInteraction;

public interface UserSellerInteractionService {
    UserSellerInteraction createOrAdd(String sellerEmail);
}
