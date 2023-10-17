package com.atlantbh.internship.AuctionApp.controllers.Products;

import com.atlantbh.internship.AuctionApp.dtos.ProductDto;
import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;

public interface ProductService {
    Page<ProductDto> getAll(Integer page, Integer size);
    ProductDto getRandomProduct();
}
