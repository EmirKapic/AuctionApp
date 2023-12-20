package com.atlantbh.internship.AuctionApp.dtos.user;

import java.time.Instant;

public record UserUpdateRequest(String firstName, String lastName, Instant dateOfBirth,
                                String creditCard, String address, String city,
                                String zip, String country, String phoneNumber,
                                String photoUrl) {
}
