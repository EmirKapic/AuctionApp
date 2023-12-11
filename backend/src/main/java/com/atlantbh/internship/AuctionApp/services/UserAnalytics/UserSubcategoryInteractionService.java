package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.exceptions.SubcategoryNotFoundException;
import com.atlantbh.internship.AuctionApp.models.UserSubcategoryInteraction;

public interface UserSubcategoryInteractionService {
    UserSubcategoryInteraction createOrAdd(long subcategoryId) throws SubcategoryNotFoundException;
}
