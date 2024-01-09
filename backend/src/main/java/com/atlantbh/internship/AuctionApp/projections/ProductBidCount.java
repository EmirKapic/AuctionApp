package com.atlantbh.internship.AuctionApp.projections;

import com.atlantbh.internship.AuctionApp.models.Product;

public interface ProductBidCount {
    Product getProduct();
    Long getCount();
}
