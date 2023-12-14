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
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private Bid bid;
    private Instant dateCreated;
    private String sessionId;

    public Payment(Bid bid, String sessionId){
        this(0, bid, Instant.now(), sessionId);
    }
}
