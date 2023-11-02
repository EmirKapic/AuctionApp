package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.dtos.ProductsApproximate;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Page<Product> getAllActive(Pageable pageable, ProductParameters params);

    ProductsApproximate getAllActiveApproximate(Pageable pageable, ProductParameters params);

    Product getRandom();

    Product getById(Long id) throws ProductNotFoundException;
}
