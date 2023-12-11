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
public class UserSubcategoryInteraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long views;
    private Instant lastInteractedWith;
    private long interactedWithCounter;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    public UserSubcategoryInteraction(User user, SubCategory subCategory){
        this(0, 1, Instant.now(), 1, user, subCategory);
    }
}
