package com.atlantbh.internship.AuctionApp.projections;

import com.atlantbh.internship.AuctionApp.models.Product;

public interface ProductBid {
    Product getProduct();
    Double getBid();
}
