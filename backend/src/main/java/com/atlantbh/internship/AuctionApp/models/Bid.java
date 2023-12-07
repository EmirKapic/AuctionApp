package com.atlantbh.internship.AuctionApp.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double bid;
    private Instant dateCreated;

    @ManyToOne
    @JoinColumn(name = "bidder_id")
    private User bidder;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Bid(double bid, User user, Product product){
        this(0, bid, Instant.now(), user , product);
    }
}
