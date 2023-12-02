package com.atlantbh.internship.AuctionApp.dtos.sell;

import lombok.NonNull;

import java.util.List;

public record NewProductRequest(@NonNull String title, @NonNull  Long categoryId,
                                @NonNull Long subcategoryId,
                                @NonNull String description, @NonNull List<String> imageUrls,
                                @NonNull Double startPrice,

                                @NonNull String startDate,
                                @NonNull String endDate,
                                @NonNull String address, @NonNull String email, @NonNull String city, @NonNull String zipCode,
                                @NonNull String country, @NonNull String phoneNumber) {
}
