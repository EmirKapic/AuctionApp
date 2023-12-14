package com.atlantbh.internship.AuctionApp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private double startBid;
    private Double highestBid;
    private int numberOfBids;
    private Instant dateStart;
    private Instant dateEnd;
    private Instant dateCreated;
    private String address;
    private String city;
    private String zipCode;
    private String country;
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User user;

    public Product(String name, String description, double startBid, Instant dateStart, Instant dateEnd,
            String address, String city, String zipCode, String country, String phoneNumber,
            SubCategory subCategory, User user) {
        this(0, name, description, startBid, null, 0, dateStart, dateEnd, Instant.now(), address,
                city, zipCode, country, phoneNumber, subCategory, null, user);
    }
}
