package com.atlantbh.internship.AuctionApp.services.Product;

public record ProductParameters(Long categoryId, Long subcategoryId, String name, Long sellerId, Boolean active,
        Boolean excludeUserOwned) {

}
