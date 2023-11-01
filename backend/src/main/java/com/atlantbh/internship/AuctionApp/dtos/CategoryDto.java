package com.atlantbh.internship.AuctionApp.dtos;

import com.atlantbh.internship.AuctionApp.models.SubCategory;

import java.util.List;

public record CategoryDto(Long id, String name, List<SubCategory> subCategories) {
}
