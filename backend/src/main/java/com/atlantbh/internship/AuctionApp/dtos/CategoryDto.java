package com.atlantbh.internship.AuctionApp.dtos;


import com.atlantbh.internship.AuctionApp.models.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * This dto is used because at some endpoints we need category with its subcategories,
 * and at some we need subcategory inside of which is its category (like with ones connected to product)
 * because of this we need to keep subCategories out of JSON response in some endpoints, hence the need for a specific dto
 * when we DO need them
 */
@AllArgsConstructor
@Data
public class CategoryDto {
    private long id;
    private String name;
    private List<SubCategory> subCategories = new ArrayList<>();
}
