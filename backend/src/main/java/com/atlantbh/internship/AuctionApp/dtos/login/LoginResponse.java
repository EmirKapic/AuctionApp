package com.atlantbh.internship.AuctionApp.dtos.login;

import com.atlantbh.internship.AuctionApp.models.User;

public record LoginResponse(User user, String token) {
}
