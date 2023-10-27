package com.atlantbh.internship.AuctionApp.services.Category;

import com.atlantbh.internship.AuctionApp.dtoconvertors.CategoryDtoConverter;
import com.atlantbh.internship.AuctionApp.dtos.CategoryDto;
import com.atlantbh.internship.AuctionApp.models.Category;
import com.atlantbh.internship.AuctionApp.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    private CategoryDtoConverter categoryDtoConverter;
    @Override
    public Iterable<CategoryDto> getAll() {
        List<Category> categories =  categoryRepository.findAll();
        return categories.stream().map(categoryDtoConverter::convertToDto).toList();
    }
}
