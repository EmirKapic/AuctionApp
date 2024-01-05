package com.atlantbh.internship.AuctionApp.services.Product;

import java.util.List;

public record ProductParameters(Long categoryId, List<Long> subcategoryIds, String name, Long sellerId, Boolean active,
                                Boolean excludeUserOwned, Double minPrice, Double maxPrice) {

}
