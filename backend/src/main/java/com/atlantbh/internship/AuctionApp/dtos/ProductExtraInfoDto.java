package com.atlantbh.internship.AuctionApp.dtos;

import com.atlantbh.internship.AuctionApp.projections.ProductBucket;

import java.util.List;

public record ProductExtraInfoDto(List<ProductBucket> buckets, Double maxPrice, Double minPrice) {
}
