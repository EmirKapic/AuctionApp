package com.atlantbh.internship.AuctionApp.controllers.Categories;


import com.atlantbh.internship.AuctionApp.models.Category;
import com.atlantbh.internship.AuctionApp.services.Category.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/categories")
@AllArgsConstructor
public class CategoryController {
    private CategoryService categoryService;

    @GetMapping
    public Iterable<Category> getAll(){
        return categoryService.getAll();
    }
}
