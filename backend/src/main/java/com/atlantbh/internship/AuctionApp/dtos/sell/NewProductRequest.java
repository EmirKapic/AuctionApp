package com.atlantbh.internship.AuctionApp.dtos.sell;

import lombok.NonNull;

import java.util.List;

public record NewProductRequest(@NonNull String title, long categoryId,
                                long subcategoryId, @NonNull String description,
                                @NonNull List<String> imageUrls, double startPrice,

                                @NonNull String startDate, @NonNull String endDate,
                                @NonNull String address, @NonNull String email,
                                @NonNull String city, @NonNull String zipCode,
                                @NonNull String country, @NonNull String phoneNumber) {
}
