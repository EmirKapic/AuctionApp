package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.dtos.AllProductsDto;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    AllProductsDto getAllActive(Pageable pageable, ProductParameters params);

    Product getRandom();

    Product getById(Long id) throws ProductNotFoundException;
}
