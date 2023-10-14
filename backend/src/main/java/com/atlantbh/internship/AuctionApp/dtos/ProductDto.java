package com.atlantbh.internship.AuctionApp.dtos;

import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.models.ProductImage;
import com.atlantbh.internship.AuctionApp.models.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/*
    i didnt want to send all product info (like the user who is selling it) in some queries
    so in those this will be used instead for hiding that info
 */
@Data
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private Double startBid;
    private Double highestBid;
    private Integer numberOfBids;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;
    private LocalDateTime dateCreated;
    private SubCategory subCategory;
    private List<Bid> bids = new ArrayList<>();
    private List<ProductImage> productImage = new ArrayList<>();



}
