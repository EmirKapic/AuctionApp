package com.atlantbh.internship.AuctionApp.dtos.sell;

import lombok.NonNull;

import java.time.Instant;
import java.util.List;

public record NewProductRequest(@NonNull String title, long subcategoryId,
                @NonNull String description, @NonNull List<String> imageUrls,
                double startPrice, Instant startDate,
                Instant endDate, @NonNull String address,
                @NonNull String city, @NonNull String zipCode,
                @NonNull String country, @NonNull String phoneNumber) {
}
