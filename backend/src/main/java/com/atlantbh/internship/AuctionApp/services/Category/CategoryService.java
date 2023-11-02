package com.atlantbh.internship.AuctionApp.services.Category;

import com.atlantbh.internship.AuctionApp.dtos.CategoryDto;

public interface CategoryService {
    Iterable<CategoryDto> getAll();
}
