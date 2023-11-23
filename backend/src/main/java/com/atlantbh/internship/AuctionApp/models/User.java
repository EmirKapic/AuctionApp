package com.atlantbh.internship.AuctionApp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private long id;

    private String firstName;
    private String lastName;


    @Column(unique = true, nullable = false)
    private String email;
    @JsonIgnore
    private String password;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "Wishlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> wishlist = new ArrayList<>();

    @Nullable
    private String phoneNumber;

    private String role;

    public User(String email){
        this.email = email;
    }
    public User(String email, String password, String firstName, String lastName){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
