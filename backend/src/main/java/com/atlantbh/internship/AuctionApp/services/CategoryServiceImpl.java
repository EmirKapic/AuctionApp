package com.atlantbh.internship.AuctionApp.services;

import com.atlantbh.internship.AuctionApp.controllers.Categories.CategoryService;
import com.atlantbh.internship.AuctionApp.models.Category;
import com.atlantbh.internship.AuctionApp.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    @Override
    public Iterable<Category> getAll() {
        return categoryRepository.findAll();
    }
}
