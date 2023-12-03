package com.atlantbh.internship.AuctionApp.dtos.bidding;

import lombok.NonNull;

public record NewBidRequest(@NonNull Double bid, @NonNull Long productId) {
}
