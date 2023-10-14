package com.atlantbh.internship.AuctionApp.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "AppUser") //not just "user" because it is reserved keyword
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;

    @ManyToMany
    @JoinTable(
            name = "Wishlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> wishlist = new ArrayList<>();

    @OneToMany(mappedBy = "seller")
    private List<Bid> bids = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Product> productsOnSale = new ArrayList<>();

    @Nullable
    private String phoneNumber;
    private String role;
}
