package com.atlantbh.internship.AuctionApp.services.Category;

import com.atlantbh.internship.AuctionApp.dtos.CategoryDto;
import com.atlantbh.internship.AuctionApp.models.Category;

import java.util.List;

public interface CategoryService {
    Iterable<CategoryDto> getAll();
}
