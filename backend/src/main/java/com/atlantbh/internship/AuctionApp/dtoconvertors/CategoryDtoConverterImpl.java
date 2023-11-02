package com.atlantbh.internship.AuctionApp.dtoconvertors;

import com.atlantbh.internship.AuctionApp.dtos.CategoryDto;
import com.atlantbh.internship.AuctionApp.models.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryDtoConverterImpl implements CategoryDtoConverter{

    @Override
    public CategoryDto convertToDto(Category m) {
        return new CategoryDto(m.getId(), m.getName(), m.getSubCategories());
    }
}
