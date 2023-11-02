package com.atlantbh.internship.AuctionApp.dtos;

import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;

public record ProductDidYouMean(Page<Product> products, boolean approximation) {
}
