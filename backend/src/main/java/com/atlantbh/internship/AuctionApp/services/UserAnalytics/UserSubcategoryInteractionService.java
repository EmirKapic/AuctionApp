package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.exceptions.EntityNotFoundException;
import com.atlantbh.internship.AuctionApp.models.UserSubcategoryInteraction;

public interface UserSubcategoryInteractionService {
    UserSubcategoryInteraction createOrAdd(long subcategoryId) throws EntityNotFoundException;
}
