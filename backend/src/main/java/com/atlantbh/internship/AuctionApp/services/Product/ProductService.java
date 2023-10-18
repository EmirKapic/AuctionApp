package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Page<Product> getAll(Pageable pageable);
    Product getRandom();
    Page<Product> getRecent(Pageable pageable);

    Page<Product> getExpiring(Pageable pageable);
}
