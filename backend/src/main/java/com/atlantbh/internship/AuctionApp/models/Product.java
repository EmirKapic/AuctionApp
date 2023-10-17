package com.atlantbh.internship.AuctionApp.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double startBid;
    private Double highestBid;
    private Integer numberOfBids;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;
    private LocalDateTime dateCreated;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Bid> bids = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<ProductImage> productImage = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User user;


}
